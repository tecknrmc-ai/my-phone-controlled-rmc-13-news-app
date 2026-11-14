import SwiftUI

enum PhotoFitMode: String, Codable, CaseIterable, Identifiable {
    case tall
    case wide
    case crop
    case full

    var id: String { rawValue }

    var label: String {
        switch self {
        case .tall: return "Tall"
        case .wide: return "Wide"
        case .crop: return "Crop"
        case .full: return "Full"
        }
    }

    /// Width divided by height. Used when the photo sizes itself to the screen width.
    var widthOverHeight: CGFloat {
        switch self {
        case .tall: return 0.78
        case .wide: return 1.7
        case .crop: return 1
        case .full: return 1.05
        }
    }

    var contentMode: ContentMode {
        self == .full ? .fit : .fill
    }

    /// Extra framing so Tall, Wide, and Crop look different before the pinch.
    var baseScale: CGFloat {
        switch self {
        case .tall: return 1.12
        case .wide: return 1
        case .crop: return 1.38
        case .full: return 1
        }
    }

    func height(for width: CGFloat) -> CGFloat {
        width / widthOverHeight
    }
}

struct FeedPost: Identifiable, Codable, Equatable {
    var id: String
    var title: String
    var subtitle: String
    var body: String
    var imageName: String
    var isSystemImage: Bool
    var fit: PhotoFitMode
    var zoom: Double

    var shareText: String {
        [title, subtitle, body]
            .map { $0.trimmingCharacters(in: .whitespacesAndNewlines) }
            .filter { !$0.isEmpty }
            .joined(separator: "\n")
    }
}

final class FeedLibrary: ObservableObject {
    static let shared = FeedLibrary()

    @Published private(set) var posts: [String: FeedPost] = [:]
    private var removedIDs = Set<String>()
    private let storageKey = "rmc13.feed.posts.v1"

    private init() {
        load()
    }

    func post(_ id: String) -> FeedPost? {
        posts[id]
    }

    func ordered(_ ids: [String]) -> [FeedPost] {
        ids.compactMap { posts[$0] }
    }

    func setFit(_ id: String, _ fit: PhotoFitMode) {
        guard var post = posts[id] else { return }
        post.fit = fit
        posts[id] = post
        save()
    }

    func setZoom(_ id: String, _ zoom: Double) {
        guard var post = posts[id] else { return }
        post.zoom = min(4, max(1, zoom))
        posts[id] = post
        save()
    }

    func save(_ post: FeedPost) {
        guard posts[post.id] != nil else { return }
        posts[post.id] = post
        save()
    }

    func delete(_ id: String) {
        posts.removeValue(forKey: id)
        removedIDs.insert(id)
        save()
    }

    private struct Archive: Codable {
        var posts: [FeedPost]
        var removed: [String]
    }

    private func load() {
        var saved: [String: FeedPost] = [:]
        if let data = UserDefaults.standard.data(forKey: storageKey),
           let archive = try? JSONDecoder().decode(Archive.self, from: data) {
            removedIDs = Set(archive.removed)
            for post in archive.posts where !removedIDs.contains(post.id) {
                saved[post.id] = post
            }
        }
        var next: [String: FeedPost] = [:]
        for post in Self.defaults where !removedIDs.contains(post.id) {
            next[post.id] = saved[post.id] ?? post
        }
        posts = next
    }

    private func save() {
        let archive = Archive(posts: Array(posts.values), removed: Array(removedIDs))
        if let data = try? JSONEncoder().encode(archive) {
            UserDefaults.standard.set(data, forKey: storageKey)
        }
    }

    static let storyIDs = ["story-eric", "story-main"]
    static let headlinerIDs = [
        "feed-film", "feed-battlezone", "feed-hyper", "feed-unreal", "feed-mvp", "feed-legends"
    ]
    static let headlineIDs = ["headline-unreal", "headline-hyper"]
    static let articleIDs = ["article-node", "article-roadmap", "article-maintenance"]
    static let movieIDs = ["movie-neecole", "movie-moe", "movie-glory"]

    private static let defaults: [FeedPost] = [
        FeedPost(id: "story-eric", title: "Eric MVP", subtitle: "Story", body: "Eric MVP story card.", imageName: "Eric_MVP", isSystemImage: false, fit: .tall, zoom: 1),
        FeedPost(id: "story-main", title: "RMC13 Story", subtitle: "Story", body: "RMC13 main story card.", imageName: "Mvp_STORY_MAIN", isSystemImage: false, fit: .tall, zoom: 1),
        FeedPost(id: "feed-film", title: "LA Film Mode", subtitle: "Headliner", body: "Film, lookbooks, and Los Angeles production notes.", imageName: "generated-image-1-41", isSystemImage: false, fit: .wide, zoom: 1),
        FeedPost(id: "feed-battlezone", title: "136A Battlezone", subtitle: "Headliner", body: "Tactical map layer for 136Zone operations.", imageName: "RMC136AZone_Banner", isSystemImage: false, fit: .wide, zoom: 1),
        FeedPost(id: "feed-hyper", title: "Hyper 3D AI", subtitle: "Headliner", body: "Hyper 3D AI highlight.", imageName: "HomeCarousel_Hyper3DAI", isSystemImage: false, fit: .wide, zoom: 1),
        FeedPost(id: "feed-unreal", title: "Unreal Community", subtitle: "Headliner", body: "Unreal community highlight.", imageName: "HomeCarousel_UnrealCommunity", isSystemImage: false, fit: .wide, zoom: 1),
        FeedPost(id: "feed-mvp", title: "MVP 2012", subtitle: "Headliner", body: "Arroyo Valley player, coach, fan, and gamer hub.", imageName: "MVP_Main", isSystemImage: false, fit: .wide, zoom: 1),
        FeedPost(id: "feed-legends", title: "Legends of Glory", subtitle: "Headliner", body: "Glory battle artists join RMC13 for a huge battle.", imageName: "Legends_Glory", isSystemImage: false, fit: .wide, zoom: 1),
        FeedPost(id: "feed-breaking", title: "BREAKING: RMC13 Major Update Launched", subtitle: "Main feed", body: "The latest edition brings completely redesigned UI layouts, faster compilation, and seamless Xcode cross-compatibility.", imageName: "RMC13_MAin", isSystemImage: false, fit: .wide, zoom: 1),
        FeedPost(id: "headline-unreal", title: "Unreal Community", subtitle: "Headline", body: "Unreal community headline photo.", imageName: "HomeCarousel_UnrealCommunity", isSystemImage: false, fit: .wide, zoom: 1),
        FeedPost(id: "headline-hyper", title: "Hyper 3D AI", subtitle: "Headline", body: "Hyper 3D AI headline photo.", imageName: "HomeCarousel_Hyper3DAI", isSystemImage: false, fit: .wide, zoom: 1),
        FeedPost(id: "article-featured", title: "FEATURED: Global Node Infrastructure Upgrade", subtitle: "rmcglobal", body: "Deep dive into the architecture optimizations powering the next generation sandbox servers.", imageName: "RMC13_MAin", isSystemImage: false, fit: .wide, zoom: 1),
        FeedPost(id: "article-legends", title: "rmc13 prepares full scale legends of glory drop", subtitle: "rmcglobal", body: "Glory battle artist join rmc13 for a huge battle. Experience the expansion mechanics and unique rewards dropping in this rotation.", imageName: "Legends_Glory", isSystemImage: false, fit: .wide, zoom: 1),
        FeedPost(id: "article-node", title: "Global Node Optimizations", subtitle: "RMC Engine Dev", body: "Full-scale optimizations inside core system algorithms have dropped interface latency down significantly.", imageName: "cpu", isSystemImage: true, fit: .wide, zoom: 1),
        FeedPost(id: "article-roadmap", title: "Community Roadmap Revealed", subtitle: "RMC Comms", body: "The dynamic sandbox framework expansion paths will unveil fully localized customization hubs next sprint.", imageName: "map", isSystemImage: true, fit: .wide, zoom: 1),
        FeedPost(id: "article-maintenance", title: "Server Maintenance Schedule", subtitle: "RMC SysOps", body: "Scheduled clustering migrations will happen during off-peak weekend hours to ensure operational safety parameters.", imageName: "clock", isSystemImage: true, fit: .wide, zoom: 1),
        FeedPost(id: "section-music", title: "RMC13 Musicnews and tips", subtitle: "Studio Desk", body: "Coverage of RMC13 records, session notes, mix tips, and playlist placements.", imageName: "RMC13_MAin", isSystemImage: false, fit: .wide, zoom: 1),
        FeedPost(id: "section-battle", title: "RMC136Abattlezone", subtitle: "Tactical Sandbox", body: "Track sector shifts, specimen catalogs, and live event windows.", imageName: "RMC136AZone_Banner", isSystemImage: false, fit: .wide, zoom: 1),
        FeedPost(id: "section-legends", title: "Legends of Glory", subtitle: "Expansion Drop", body: "Glory artists, ranked ladders, and limited cosmetics.", imageName: "Legends_Glory", isSystemImage: false, fit: .wide, zoom: 1),
        FeedPost(id: "section-mvp", title: "Mvp2012", subtitle: "Arroyo Valley", body: "Claim a character package, follow standings, and send your profile in for review.", imageName: "MVP_Main", isSystemImage: false, fit: .wide, zoom: 1),
        FeedPost(id: "section-zone", title: "Inside the 136Zone Experience", subtitle: "136Zone", body: "Explore structural tactical shifts and localized zones.", imageName: "136Zone_Game", isSystemImage: false, fit: .wide, zoom: 1),
        FeedPost(id: "section-productions", title: "Rmc13 reels in millions of viewers with music and entertainment projects", subtitle: "RMC13 Productions", body: "Original music, film, game, and live entertainment drops.", imageName: "RMC13_MAin", isSystemImage: false, fit: .wide, zoom: 1),
        FeedPost(id: "section-zone-card", title: "Inside the 136Zone Experience", subtitle: "Home", body: "Explore tactical shifts, zones, and custom alien catalog metrics.", imageName: "136Zone_Game", isSystemImage: false, fit: .wide, zoom: 1),
        FeedPost(id: "movie-neecole", title: "Neecole", subtitle: "Movies", body: "Neecole movie shot.", imageName: "Neecole_Main_shot", isSystemImage: false, fit: .wide, zoom: 1),
        FeedPost(id: "movie-moe", title: "Moe", subtitle: "Movies", body: "Moe GM movie shot.", imageName: "Moe_GM_Shot", isSystemImage: false, fit: .wide, zoom: 1),
        FeedPost(id: "movie-glory", title: "Glory", subtitle: "Movies", body: "Glory movie shot.", imageName: "Glory_movie_shot", isSystemImage: false, fit: .wide, zoom: 1)
    ]
}

struct FeedPostMenu: View {
    let postKey: String
    @ObservedObject private var library = FeedLibrary.shared
    @State private var isEditing = false

    var body: some View {
        if let post = library.post(postKey) {
            Menu {
                Button("Edit", systemImage: "pencil") {
                    isEditing = true
                }
                ShareLink(item: post.shareText) {
                    Label("Share", systemImage: "square.and.arrow.up")
                }
                Button("Delete", systemImage: "trash", role: .destructive) {
                    library.delete(postKey)
                }
            } label: {
                Image(systemName: "ellipsis")
                    .font(.system(size: 15, weight: .bold))
                    .foregroundStyle(RMCTheme.gold)
                    .frame(width: 34, height: 34)
                    .background(Circle().fill(Color.black.opacity(0.78)))
                    .overlay(Circle().stroke(RMCTheme.gold.opacity(0.9), lineWidth: 1))
            }
            .buttonStyle(.plain)
            .accessibilityLabel("Post options")
            .sheet(isPresented: $isEditing) {
                EditFeedPostSheet(postKey: postKey)
            }
        }
    }
}

struct FitChoiceBar: View {
    let postKey: String
    @ObservedObject private var library = FeedLibrary.shared

    var body: some View {
        if let post = library.post(postKey), !post.isSystemImage {
            HStack(spacing: 6) {
                ForEach(PhotoFitMode.allCases) { mode in
                    Button {
                        library.setFit(postKey, mode)
                    } label: {
                        Text(mode.label)
                            .font(.custom("DINCondensed-Bold", size: 13))
                            .lineLimit(1)
                            .minimumScaleFactor(0.7)
                            .foregroundStyle(post.fit == mode ? Color.black : RMCTheme.ivory)
                            .padding(.horizontal, 8)
                            .padding(.vertical, 4)
                            .background(
                                Capsule().fill(post.fit == mode ? RMCTheme.gold : Color.black.opacity(0.62))
                            )
                    }
                    .buttonStyle(.plain)
                    .accessibilityLabel("\(mode.label) photo")
                }
            }
        }
    }
}

struct FeedImage: View {
    let postKey: String
    var showsFitBar: Bool = true
    var locksAspect: Bool = true

    @ObservedObject private var library = FeedLibrary.shared
    @State private var liveZoom: CGFloat = 1
    @State private var pinchStart: CGFloat = 1

    var body: some View {
        if let post = library.post(postKey) {
            pictureStack(post)
                .onAppear { syncZoom(from: post) }
                .onChange(of: post.zoom) { _, newValue in
                    liveZoom = CGFloat(newValue)
                    pinchStart = CGFloat(newValue)
                }
        }
    }

    private func pictureStack(_ post: FeedPost) -> some View {
        let photo = Color.black
            .overlay { picture(post) }
            .clipped()
            .highPriorityGesture(pinch)
        let framed = photo.overlay(alignment: .bottomLeading) {
            if showsFitBar {
                FitChoiceBar(postKey: postKey)
                    .padding(8)
            }
        }

        return Group {
            if locksAspect {
                framed.aspectRatio(post.fit.widthOverHeight, contentMode: .fit)
            } else {
                framed
            }
        }
    }

    @ViewBuilder
    private func picture(_ post: FeedPost) -> some View {
        if post.isSystemImage {
            Image(systemName: post.imageName)
                .font(.system(size: 42))
                .foregroundStyle(RMCTheme.gold)
                .frame(maxWidth: .infinity, maxHeight: .infinity)
        } else {
            Image(post.imageName)
                .resizable()
                .aspectRatio(contentMode: post.fit.contentMode)
                .scaleEffect(post.fit.baseScale * liveZoom)
                .frame(maxWidth: .infinity, maxHeight: .infinity)
        }
    }

    private var pinch: some Gesture {
        MagnifyGesture()
            .onChanged { value in
                guard library.post(postKey)?.isSystemImage == false else { return }
                liveZoom = min(4, max(1, pinchStart * value.magnification))
            }
            .onEnded { _ in
                pinchStart = liveZoom
                library.setZoom(postKey, Double(liveZoom))
            }
    }

    private func syncZoom(from post: FeedPost) {
        liveZoom = CGFloat(post.zoom)
        pinchStart = CGFloat(post.zoom)
    }
}

struct FeedPhotoFrame: View {
    let postKey: String
    var showsTitle: Bool = true

    @ObservedObject private var library = FeedLibrary.shared

    var body: some View {
        if let post = library.post(postKey) {
            VStack(alignment: .leading, spacing: 8) {
                ZStack(alignment: .topTrailing) {
                    FeedImage(postKey: postKey)
                        .goldTrim()
                    FeedPostMenu(postKey: postKey)
                        .padding(8)
                }
                if showsTitle {
                    PosterTitle(text: post.title, size: 30)
                    if !post.subtitle.isEmpty {
                        Text(post.body)
                            .font(.subheadline)
                            .foregroundStyle(RMCTheme.muted)
                            .fixedSize(horizontal: false, vertical: true)
                    }
                }
            }
        }
    }
}

private struct EditFeedPostSheet: View {
    let postKey: String
    @ObservedObject private var library = FeedLibrary.shared
    @Environment(\.dismiss) private var dismiss
    @State private var title = ""
    @State private var subtitle = ""
    @State private var bodyText = ""

    var body: some View {
        NavigationStack {
            Form {
                TextField("Title", text: $title)
                TextField("Subtitle", text: $subtitle)
                TextField("Details", text: $bodyText, axis: .vertical)
                    .lineLimit(4...8)
            }
            .navigationTitle("Edit post")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Save") { save() }
                        .disabled(title.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
                }
            }
        }
        .onAppear(perform: load)
        .presentationDetents([.medium, .large])
    }

    private func load() {
        guard let post = library.post(postKey) else { return }
        title = post.title
        subtitle = post.subtitle
        bodyText = post.body
    }

    private func save() {
        guard var post = library.post(postKey) else {
            dismiss()
            return
        }
        post.title = title.trimmingCharacters(in: .whitespacesAndNewlines)
        post.subtitle = subtitle.trimmingCharacters(in: .whitespacesAndNewlines)
        post.body = bodyText.trimmingCharacters(in: .whitespacesAndNewlines)
        library.save(post)
        dismiss()
    }
}
