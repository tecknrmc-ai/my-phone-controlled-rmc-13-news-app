import AVFoundation
import SwiftUI

struct RMCClip: Identifiable, Codable, Equatable {
    var id: String
    var title: String
    var thumbnail: String
    var resourceName: String

    static let seasonTrailer = RMCClip(
        id: "glory-season1-trailer",
        title: "Legends of Glory",
        thumbnail: "Glory_Poster_ad",
        resourceName: "Glory_Season1_Trailer"
    )

    static let catalog: [RMCClip] = [seasonTrailer]

    static func named(_ id: String) -> RMCClip? {
        catalog.first { $0.id == id }
    }
}

enum FeedLane: String, Codable, CaseIterable, Identifiable {
    case mainFeed
    case post
    case articles
    case rmc13
    case community
    case movies
    case battlezone
    case legends
    case mvp

    var id: String { rawValue }

    var title: String {
        switch self {
        case .mainFeed: return "Main feed"
        case .post: return "Post"
        case .articles: return "Articles"
        case .rmc13: return "RMC13"
        case .community: return "Community"
        case .movies: return "Movies"
        case .battlezone: return "Battlezone"
        case .legends: return "Legends"
        case .mvp: return "MVP"
        }
    }
}

enum ProfileClass {
    case guest
    case member
    case mvp
    case admin

    var lanes: [FeedLane] {
        switch self {
        case .guest:
            return []
        case .member:
            return [.mainFeed, .post]
        case .mvp:
            return [.mainFeed, .post, .community, .mvp]
        case .admin:
            return FeedLane.allCases
        }
    }
}

extension UserSession {
    var profileClass: ProfileClass {
        if !hasAppProfile { return .guest }
        if isAdmin { return .admin }
        if isMVPApproved { return .mvp }
        return .member
    }
}

final class VideoLibrary: ObservableObject {
    static let shared = VideoLibrary()

    @Published private(set) var saved: [SavedVideo] = []
    @Published private(set) var shares: [SharedVideo] = []

    private let storageKey = "rmc13.videos.v1"

    private init() {
        load()
    }

    func isSaved(_ clipID: String, email: String) -> Bool {
        let key = email.lowercased()
        return saved.contains { $0.email == key && $0.clipID == clipID }
    }

    func save(_ clip: RMCClip, email: String) {
        let key = email.lowercased()
        guard !key.isEmpty, !isSaved(clip.id, email: key) else { return }
        saved.append(SavedVideo(email: key, clipID: clip.id))
        persist()
    }

    func savedClips(email: String) -> [RMCClip] {
        let key = email.lowercased()
        return saved.compactMap { item in
            item.email == key ? RMCClip.named(item.clipID) : nil
        }
    }

    func share(_ clip: RMCClip, lane: FeedLane, email: String) {
        let key = email.lowercased()
        guard !key.isEmpty else { return }
        let already = shares.contains { $0.clipID == clip.id && $0.lane == lane.rawValue && $0.authorEmail == key }
        guard !already else { return }
        shares.append(SharedVideo(id: UUID().uuidString, clipID: clip.id, lane: lane.rawValue, authorEmail: key))
        persist()
    }

    func clips(in lane: FeedLane, authorEmail: String? = nil) -> [RMCClip] {
        var seen = Set<String>()
        var clips: [RMCClip] = []
        for share in shares where share.lane == lane.rawValue {
            if let authorEmail, share.authorEmail != authorEmail.lowercased() { continue }
            guard seen.insert(share.clipID).inserted, let clip = RMCClip.named(share.clipID) else { continue }
            clips.append(clip)
        }
        return clips
    }

    private struct Archive: Codable {
        var saved: [SavedVideo]
        var shares: [SharedVideo]
    }

    private func load() {
        guard let data = UserDefaults.standard.data(forKey: storageKey),
              let archive = try? JSONDecoder().decode(Archive.self, from: data) else { return }
        saved = archive.saved
        shares = archive.shares
    }

    private func persist() {
        let archive = Archive(saved: saved, shares: shares)
        if let data = try? JSONEncoder().encode(archive) {
            UserDefaults.standard.set(data, forKey: storageKey)
        }
    }
}

struct SavedVideo: Codable, Equatable {
    var email: String
    var clipID: String
}

struct SharedVideo: Codable, Identifiable, Equatable {
    var id: String
    var clipID: String
    var lane: String
    var authorEmail: String
}

final class PlaybackModel: ObservableObject {
    let player = AVPlayer()
    @Published var isPlaying = false
    @Published var isMuted = false
    @Published var hasMedia = false
    private var endObserver: NSObjectProtocol?

    func prepare(resourceName: String) {
        guard player.currentItem == nil else { return }
        let url = Bundle.main.url(forResource: resourceName, withExtension: "mp4")
            ?? Bundle.main.url(forResource: resourceName, withExtension: "mov")
        guard let url else { return }
        let item = AVPlayerItem(url: url)
        player.replaceCurrentItem(with: item)
        player.isMuted = isMuted
        hasMedia = true
        endObserver = NotificationCenter.default.addObserver(
            forName: .AVPlayerItemDidPlayToEndTime,
            object: item,
            queue: .main
        ) { [weak self] _ in
            self?.finish()
        }
    }

    func play() {
        guard hasMedia else { return }
        player.play()
        isPlaying = true
    }

    func pause() {
        player.pause()
        isPlaying = false
    }

    func mute() {
        isMuted = true
        player.isMuted = true
    }

    func unmute() {
        isMuted = false
        player.isMuted = false
    }

    func rewind() {
        skip(by: -10)
    }

    func fastForward() {
        skip(by: 10)
    }

    private func skip(by seconds: Double) {
        guard hasMedia else { return }
        let current = player.currentTime().seconds
        let safe = current.isFinite ? current : 0
        var target = max(0, safe + seconds)
        let duration = player.currentItem?.duration.seconds ?? 0
        if duration.isFinite, duration > 0 {
            target = min(target, max(0, duration - 0.05))
        }
        player.seek(to: CMTime(seconds: target, preferredTimescale: 600))
    }

    private func finish() {
        player.pause()
        player.seek(to: .zero)
        isPlaying = false
    }

    deinit {
        if let endObserver {
            NotificationCenter.default.removeObserver(endObserver)
        }
    }
}

struct PlayerLayerView: UIViewRepresentable {
    let player: AVPlayer

    func makeUIView(context: Context) -> PlayerHostView {
        let view = PlayerHostView()
        view.playerLayer.player = player
        view.playerLayer.videoGravity = .resizeAspect
        view.backgroundColor = .black
        return view
    }

    func updateUIView(_ uiView: PlayerHostView, context: Context) {
        uiView.playerLayer.player = player
    }
}

final class PlayerHostView: UIView {
    override class var layerClass: AnyClass { AVPlayerLayer.self }
    var playerLayer: AVPlayerLayer { layer as! AVPlayerLayer }
}

/// Full player. The poster thumbnail stays up until playback starts, and returns when playback stops.
struct RMCVideoPlayer: View {
    let clip: RMCClip

    @StateObject private var playback = PlaybackModel()
    @ObservedObject private var session = UserSession.shared
    @ObservedObject private var videos = VideoLibrary.shared
    @State private var showShare = false
    @State private var notice = ""

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            ZStack {
                Color.black
                if playback.isPlaying {
                    PlayerLayerView(player: playback.player)
                } else {
                    Image(clip.thumbnail)
                        .resizable()
                        .scaledToFill()
                }
            }
            .aspectRatio(16 / 9, contentMode: .fit)
            .clipped()
            .goldTrim()
            .accessibilityLabel(playback.isPlaying ? "\(clip.title) playing" : "\(clip.title) thumbnail")

            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 8) {
                    transport("Play", system: "play.fill", selected: playback.isPlaying) { playback.play() }
                    transport("Pause", system: "pause.fill", selected: !playback.isPlaying) { playback.pause() }
                    transport("Mute", system: "speaker.slash.fill", selected: playback.isMuted) { playback.mute() }
                    transport("Unmute", system: "speaker.wave.2.fill", selected: !playback.isMuted) { playback.unmute() }
                    transport("Rewind", system: "gobackward.10", selected: false) { playback.rewind() }
                    transport("Fast Forward", system: "goforward.10", selected: false) { playback.fastForward() }
                }
            }

            HStack(spacing: 10) {
                Button(videos.isSaved(clip.id, email: session.email) ? "Saved" : "Save") {
                    saveClip()
                }
                .buttonStyle(.plain)
                .accessibilityLabel("Save video")

                Button("Share") {
                    showShare = true
                }
                .buttonStyle(.plain)
                .accessibilityLabel("Share video")
            }
            .font(.custom("DINCondensed-Bold", size: 16))
            .foregroundStyle(RMCTheme.ivory)
            .padding(.horizontal, 12)
            .padding(.vertical, 8)
            .background(Capsule().fill(Color.black.opacity(0.72)))
            .overlay(Capsule().stroke(RMCTheme.gold.opacity(0.85), lineWidth: 1))

            if !notice.isEmpty {
                Text(notice)
                    .font(.caption)
                    .foregroundStyle(RMCTheme.muted)
            }
        }
        .onAppear { playback.prepare(resourceName: clip.resourceName) }
        .onDisappear { playback.pause() }
        .sheet(isPresented: $showShare) {
            ShareVideoSheet(clip: clip)
        }
    }

    private func saveClip() {
        guard session.hasAppProfile else {
            notice = "Sign in to save this video on your profile."
            return
        }
        videos.save(clip, email: session.email)
        notice = "Saved under your profile photos."
    }

    private func transport(_ title: String, system: String, selected: Bool, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            Label(title, systemImage: system)
                .font(.custom("DINCondensed-Bold", size: 14))
                .foregroundStyle(selected ? Color.black : RMCTheme.ivory)
                .padding(.horizontal, 10)
                .padding(.vertical, 6)
                .background(Capsule().fill(selected ? RMCTheme.gold : Color.black.opacity(0.72)))
                .overlay(Capsule().stroke(RMCTheme.gold.opacity(0.8), lineWidth: 1))
        }
        .buttonStyle(.plain)
        .accessibilityLabel(title)
    }
}

/// Preview card. It never autoplays. The thumbnail is the card.
struct VideoPreviewCard: View {
    let clip: RMCClip

    var body: some View {
        NavigationLink {
            ScrollView {
                RMCVideoPlayer(clip: clip)
                    .padding()
            }
            .navigationTitle(clip.title)
            .navigationBarTitleDisplayMode(.inline)
            .rmcScreen()
        } label: {
            Color.black
                .aspectRatio(16 / 9, contentMode: .fit)
                .overlay {
                    Image(clip.thumbnail)
                        .resizable()
                        .scaledToFill()
                }
                .clipped()
                .overlay {
                    Circle()
                        .fill(Color.black.opacity(0.62))
                        .frame(width: 54, height: 54)
                        .overlay {
                            Image(systemName: "play.fill")
                                .font(.system(size: 20, weight: .bold))
                                .foregroundStyle(RMCTheme.gold)
                                .offset(x: 2)
                        }
                }
                .overlay(alignment: .bottomLeading) {
                    Text(clip.title)
                        .font(.custom("DINCondensed-Bold", size: 20))
                        .lineLimit(1)
                        .minimumScaleFactor(0.6)
                        .foregroundStyle(RMCTheme.ivory)
                        .padding(.horizontal, 10)
                        .padding(.vertical, 4)
                        .background(Color.black.opacity(0.55), in: Capsule())
                        .padding(10)
                }
                .goldTrim()
        }
        .buttonStyle(.plain)
        .accessibilityLabel("\(clip.title) video preview")
    }
}

struct SharedVideoLaneView: View {
    var lane: FeedLane
    var authorEmail: String? = nil

    @ObservedObject private var videos = VideoLibrary.shared

    var body: some View {
        let clips = videos.clips(in: lane, authorEmail: authorEmail)
        if !clips.isEmpty {
            VStack(alignment: .leading, spacing: 12) {
                ForEach(clips) { clip in
                    VideoPreviewCard(clip: clip)
                }
            }
        }
    }
}

struct ProfileMediaSections: View {
    @ObservedObject private var session = UserSession.shared
    @ObservedObject private var videos = VideoLibrary.shared

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            PosterTitle(text: "PHOTOS", size: 18, color: RMCTheme.gold)
            Text("No photos yet.")
                .font(.subheadline)
                .foregroundStyle(RMCTheme.muted)

            PosterTitle(text: "SAVED VIDEOS", size: 18, color: RMCTheme.gold)
            let saved = videos.savedClips(email: session.email)
            if saved.isEmpty {
                Text("Videos you save show up here.")
                    .font(.subheadline)
                    .foregroundStyle(RMCTheme.muted)
            } else {
                ForEach(saved) { clip in
                    VideoPreviewCard(clip: clip)
                }
            }

            let posts = videos.clips(in: .post, authorEmail: session.email)
            if !posts.isEmpty {
                PosterTitle(text: "POSTS", size: 18, color: RMCTheme.gold)
                ForEach(posts) { clip in
                    VideoPreviewCard(clip: clip)
                }
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }
}

private struct ShareVideoSheet: View {
    let clip: RMCClip
    @ObservedObject private var session = UserSession.shared
    @ObservedObject private var videos = VideoLibrary.shared
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            List {
                if session.profileClass.lanes.isEmpty {
                    Text("Sign in to share this video to a feed.")
                        .foregroundStyle(RMCTheme.ivory)
                } else {
                    ForEach(session.profileClass.lanes) { lane in
                        Button(lane.title) {
                            videos.share(clip, lane: lane, email: session.email)
                            dismiss()
                        }
                        .foregroundStyle(RMCTheme.gold)
                    }
                }
            }
            .scrollContentBackground(.hidden)
            .background(RMCTheme.obsidian)
            .navigationTitle("Share video")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Close") { dismiss() }
                }
            }
        }
        .presentationDetents([.medium])
    }
}
