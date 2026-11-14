import SwiftUI

/// Top bar on the homepage and the main feed. Opens the Season 1 page.
struct RMCSeasonBar: View {
    var body: some View {
        NavigationLink {
            SeasonOneView()
        } label: {
            Text("RMC13Season1")
                .font(.system(size: 12, weight: .semibold))
                .tracking(1.3)
                .foregroundStyle(RMCTheme.gold)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 6)
                .background(Color.black)
                .overlay(alignment: .bottom) {
                    Rectangle()
                        .fill(RMCTheme.gold)
                        .frame(height: 1)
                }
        }
        .buttonStyle(.plain)
        .accessibilityLabel("RMC13 Season 1")
    }
}

/// Season 1: full Glory poster ad, then the video player, then five battle-artist cards.
struct SeasonOneView: View {
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 0) {
                gloryPoster
                videoTrailerSection
                    .padding(.horizontal, 16)
                    .padding(.top, 20)
                GloryBattleArtists()
                    .padding(.horizontal, 16)
                    .padding(.top, 24)
                    .padding(.bottom, 32)
            }
        }
        .navigationTitle("Season 1")
        .navigationBarTitleDisplayMode(.inline)
        .rmcScreen()
    }

    /// Entire Glory poster ad, edge to edge, at the image's own aspect. No crop.
    private var gloryPoster: some View {
        Image("Glory_Poster_ad")
            .resizable()
            .scaledToFit()
            .frame(maxWidth: .infinity)
            .background(Color.black)
            .overlay(alignment: .bottom) {
                Rectangle()
                    .fill(RMCTheme.gold)
                    .frame(height: 1.5)
            }
            .accessibilityLabel("Glory poster ad")
    }

    private var videoTrailerSection: some View {
        VStack(alignment: .leading, spacing: 10) {
            PosterTitle(text: "VIDEO TRAILER", size: 18, color: RMCTheme.gold)
            RMCVideoPlayer(clip: .seasonTrailer)
            PosterTitle(text: "Legends of Glory", size: 32)
            Text("Season 1 trailer for the Legends of Glory card.")
                .font(.subheadline)
                .foregroundStyle(RMCTheme.muted)
                .fixedSize(horizontal: false, vertical: true)
        }
    }
}

/// Five Glory artist cards. These asset names are the only photos in this carousel.
struct GloryBattleArtists: View {
    private let artists: [(name: String, image: String)] = [
        ("Bizzybaggz", "Bizzybaggz_Glory_Artist"),
        ("Tunez", "Tunez_Glory_Artist"),
        ("Nef", "Nef_Glory_Artist"),
        ("Gotti", "Gotti_Glory_Artist"),
        ("KD", "KD_Glory_Artist")
    ]

    var body: some View {
        FlashyCarouselView(
            title: "BATTLE ARTISTS",
            items: artists.map { CarouselItem(title: $0.name, imageName: $0.image) },
            cardWidth: 210,
            cardHeight: 280,
            horizontalPadding: 0
        )
        .accessibilityElement(children: .contain)
        .accessibilityLabel("Battle artists, 5 cards")
    }
}

#Preview {
    NavigationStack {
        SeasonOneView()
    }
}
