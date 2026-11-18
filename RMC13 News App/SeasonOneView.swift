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
                SeasonMiniMenu()
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

private struct SeasonMenuGroup: Identifiable {
    let title: String
    let pages: [String]
    var id: String { title }
}

/// Compact dropdown page list across the top of the Season 1 page.
private struct SeasonMiniMenu: View {
    @State private var openTitle: String?

    private let groups: [SeasonMenuGroup] = [
        SeasonMenuGroup(title: "Brands", pages: [
            "RMC13",
            "RMCVFX",
            "CNTAUDIO",
            "T.A.M. ENT.",
            "T.Y.L.Films",
            "IAMNICOLEKNOX",
            "MBRACEMODELING",
            "AND MORE"
        ]),
        SeasonMenuGroup(title: "Producers", pages: [
            "Teckn",
            "Nee'Cole",
            "CashChamp",
            "IAMNICOLEKNOX",
            "Nef"
        ]),
        SeasonMenuGroup(title: "Artist", pages: [
            "Bizzybaggz",
            "Hottunez",
            "Nef",
            "KxngD.O.P.E.",
            "Gotti"
        ]),
        SeasonMenuGroup(title: "Production", pages: [
            "RMC13PRoductions",
            "RMCVFX"
        ]),
        SeasonMenuGroup(title: "Locations", pages: [
            "San Bernardino",
            "Los Angeles",
            "Hollywood"
        ]),
        SeasonMenuGroup(title: "Grand Prize", pages: [
            "50k App marketing campaign",
            "5k Prize",
            "# piece clothing merch set",
            "Season 1 winner documentary"
        ])
    ]

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 8) {
                    ForEach(groups) { group in
                        let isOpen = openTitle == group.title
                        Button {
                            withAnimation(.easeInOut(duration: 0.2)) {
                                openTitle = isOpen ? nil : group.title
                            }
                        } label: {
                            HStack(spacing: 4) {
                                Text(group.title)
                                    .lineLimit(1)
                                Image(systemName: isOpen ? "chevron.up" : "chevron.down")
                                    .font(.system(size: 9, weight: .bold))
                            }
                            .font(.custom("DINCondensed-Bold", size: 15))
                            .foregroundStyle(isOpen ? Color.black : RMCTheme.gold)
                            .padding(.horizontal, 10)
                            .padding(.vertical, 7)
                            .background(Capsule().fill(isOpen ? RMCTheme.gold : Color.black))
                            .overlay(Capsule().stroke(RMCTheme.gold, lineWidth: 1))
                        }
                        .buttonStyle(.plain)
                        .accessibilityLabel("\(group.title) menu")
                    }
                }
                .padding(.horizontal, 12)
                .padding(.vertical, 8)
            }
            .background(Color.black)

            if let group = groups.first(where: { $0.title == openTitle }) {
                VStack(alignment: .leading, spacing: 0) {
                    ForEach(group.pages, id: \.self) { page in
                        NavigationLink {
                            SeasonMenuPage(section: group.title, name: page)
                        } label: {
                            HStack(spacing: 8) {
                                Text(page)
                                    .font(.custom("DINCondensed-Bold", size: 18))
                                    .foregroundStyle(RMCTheme.ivory)
                                    .lineLimit(2)
                                    .minimumScaleFactor(0.7)
                                    .frame(maxWidth: .infinity, alignment: .leading)
                                Image(systemName: "chevron.right")
                                    .font(.system(size: 12, weight: .bold))
                                    .foregroundStyle(RMCTheme.gold)
                            }
                            .padding(.horizontal, 16)
                            .padding(.vertical, 12)
                            .contentShape(Rectangle())
                        }
                        .buttonStyle(.plain)
                        .accessibilityLabel("\(group.title), \(page)")
                        Rectangle()
                            .fill(RMCTheme.gold.opacity(0.28))
                            .frame(height: 0.5)
                    }
                }
                .background(RMCTheme.obsidianSoft)
            }
        }
        .overlay(alignment: .bottom) {
            Rectangle()
                .fill(RMCTheme.gold)
                .frame(height: 1)
        }
    }
}

private struct SeasonMenuPage: View {
    let section: String
    let name: String

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 14) {
                PosterTitle(text: section, size: 16, color: RMCTheme.gold)
                PosterTitle(text: name, size: 36)
                Text("Season 1 \(section) page.")
                    .font(.body)
                    .foregroundStyle(RMCTheme.muted)
            }
            .padding()
            .frame(maxWidth: .infinity, alignment: .leading)
        }
        .navigationTitle(name)
        .navigationBarTitleDisplayMode(.inline)
        .rmcScreen()
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
