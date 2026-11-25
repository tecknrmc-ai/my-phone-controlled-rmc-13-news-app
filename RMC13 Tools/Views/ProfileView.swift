import PhotosUI
import SwiftUI
import UIKit

struct ProfileView: View {
    @Environment(StudioSession.self) private var session
    @State private var filter: VaultFilter = .all
    @State private var photoItem: PhotosPickerItem?
    @State private var download: OwnedBeat?

    private var visibleOwned: [OwnedBeat] {
        StudioLogic.filteredOwned(session.owned, filter: filter)
    }

    var body: some View {
        NavigationStack {
            StudioScreen {
                ScrollView {
                    VStack(alignment: .leading, spacing: 20) {
                        header
                        stats
                        vault
                        pressHistory
                    }
                    .padding(16)
                }
            }
            .navigationTitle("Profile")
            .toolbar {
                NavigationLink {
                    SettingsView()
                } label: {
                    Image(systemName: "gearshape.fill")
                }
                .accessibilityLabel("Account Settings")
            }
            .sheet(item: $download) { owned in
                if let beat = session.beat(owned.beatID) {
                    AssetDownloadSheet(beat: beat, owned: owned)
                        .environment(session)
                }
            }
        }
    }

    private var header: some View {
        HStack(spacing: 16) {
            PhotosPicker(selection: $photoItem, matching: .images) {
                avatar
            }
            .buttonStyle(.plain)
            .onChange(of: photoItem) { _, item in
                guard let item else { return }
                Task { @MainActor in
                    if let data = try? await item.loadTransferable(type: Data.self) {
                        session.updatePhoto(data)
                    }
                }
            }
            VStack(alignment: .leading, spacing: 4) {
                Text(session.profile.displayName)
                    .font(.title2.bold())
                Text(session.profile.handle)
                    .foregroundStyle(StudioTheme.cyan)
                Text(session.profile.email)
                    .font(.caption)
                    .foregroundStyle(StudioTheme.muted)
            }
            Spacer()
        }
    }

    private var avatar: some View {
        ZStack {
            Circle().fill(StudioTheme.card)
            if let data = session.profile.photoData, let image = UIImage(data: data) {
                Image(uiImage: image)
                    .resizable()
                    .scaledToFill()
            } else {
                Image(systemName: "person.crop.circle.fill")
                    .font(.system(size: 42))
                    .foregroundStyle(StudioTheme.purple)
            }
        }
        .frame(width: 76, height: 76)
        .clipShape(Circle())
        .overlay(Circle().stroke(StudioTheme.accentGradient, lineWidth: 2))
    }

    private var stats: some View {
        HStack(spacing: 12) {
            stat("Beats Owned", value: session.owned.count)
            stat("Press Releases", value: session.campaigns.count)
        }
    }

    private func stat(_ title: String, value: Int) -> some View {
        VStack(alignment: .leading, spacing: 4) {
            Text("\(value)")
                .font(.title.bold())
            Text(title)
                .font(.caption)
                .foregroundStyle(StudioTheme.muted)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(14)
        .background(StudioTheme.card, in: RoundedRectangle(cornerRadius: 16, style: .continuous))
    }

    private var vault: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Vault")
                .font(.title3.bold())
            Picker("Vault", selection: $filter) {
                ForEach(VaultFilter.allCases) { item in
                    Text(item.rawValue).tag(item)
                }
            }
            .pickerStyle(.segmented)
            if visibleOwned.isEmpty {
                Text("Nothing in this filter yet.")
                    .foregroundStyle(StudioTheme.muted)
            } else {
                LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
                    ForEach(visibleOwned) { owned in
                        if let beat = session.beat(owned.beatID) {
                            Button {
                                download = owned
                            } label: {
                                VStack(alignment: .leading, spacing: 8) {
                                    BeatArtwork(name: beat.artworkName)
                                        .frame(height: 120)
                                        .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                                    Text(beat.title)
                                        .font(.subheadline.weight(.semibold))
                                        .foregroundStyle(.white)
                                        .lineLimit(1)
                                    Text(owned.license.rawValue)
                                        .font(.caption2)
                                        .foregroundStyle(StudioTheme.cyan)
                                    Text(owned.acquiredAt.formatted(date: .abbreviated, time: .omitted))
                                        .font(.caption2)
                                        .foregroundStyle(StudioTheme.muted)
                                }
                                .padding(10)
                                .background(StudioTheme.card, in: RoundedRectangle(cornerRadius: 16, style: .continuous))
                            }
                            .buttonStyle(.plain)
                        }
                    }
                }
            }
        }
    }

    private var pressHistory: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Submitted Press Releases")
                .font(.title3.bold())
            if session.campaigns.isEmpty {
                Text("File a release from the Press tab and it will show up here.")
                    .font(.subheadline)
                    .foregroundStyle(StudioTheme.muted)
            } else {
                ForEach(session.campaigns) { campaign in
                    VStack(alignment: .leading, spacing: 6) {
                        HStack {
                            Text(campaign.projectTitle)
                                .font(.headline)
                            Spacer()
                            Text(campaign.status.rawValue)
                                .font(.caption.weight(.bold))
                                .padding(.horizontal, 8)
                                .padding(.vertical, 4)
                                .background(campaign.status == .published ? StudioTheme.cyan : StudioTheme.purple, in: Capsule())
                                .foregroundStyle(campaign.status == .published ? Color.black : Color.white)
                        }
                        Text("\(campaign.artistName) · \(campaign.releaseType.rawValue) · \(campaign.tier.name)")
                            .font(.caption)
                            .foregroundStyle(StudioTheme.muted)
                        Text(campaign.submittedAt.formatted(date: .abbreviated, time: .shortened))
                            .font(.caption2)
                            .foregroundStyle(StudioTheme.muted)
                    }
                    .padding(14)
                    .background(StudioTheme.card, in: RoundedRectangle(cornerRadius: 16, style: .continuous))
                }
            }
        }
    }
}

#Preview {
    ProfileView()
        .environment(StudioSession.preview)
}
