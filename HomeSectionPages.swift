import SwiftUI

enum HomeSection: String, CaseIterable, Identifiable {
    case musicNews
    case battlezone
    case legends
    case mvp2012
    case campaign4knm
    case laFilmMode
    case community

    var id: String { rawValue }

    var title: String {
        switch self {
        case .musicNews: return "RMC13 Musicnews and tips"
        case .battlezone: return "RMC136Abattlezone"
        case .legends: return "Legends of Glory"
        case .mvp2012: return "Mvp2012"
        case .campaign4knm: return "4knm Campaign"
        case .laFilmMode: return "Lafilmmode"
        case .community: return "RMC13 Community"
        }
    }

    var symbol: String {
        switch self {
        case .musicNews: return "music.note.list"
        case .battlezone: return "scope"
        case .legends: return "crown.fill"
        case .mvp2012: return "sportscourt.fill"
        case .campaign4knm: return "flag.checkered"
        case .laFilmMode: return "film.fill"
        case .community: return "person.3.fill"
        }
    }

    @ViewBuilder
    var destination: some View {
        switch self {
        case .musicNews: MusicNewsTipsView()
        case .battlezone: BattlezonePageView()
        case .legends: LegendsOfGloryPageView()
        case .mvp2012: MVP2012PageView()
        case .campaign4knm: FourKNMCampaignView()
        case .laFilmMode: LAFilmModeView()
        case .community: RMC13CommunityView()
        }
    }
}

private struct SectionPageChrome<Content: View>: View {
    let title: String
    let kicker: String
    let imageName: String?
    let systemImage: String
    var imageFillsFrame: Bool = true
    @ViewBuilder var content: Content

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 18) {
                if let imageName {
                    Image(imageName)
                        .resizable()
                        .aspectRatio(contentMode: imageFillsFrame ? .fill : .fit)
                        .frame(maxWidth: .infinity)
                        .frame(height: imageFillsFrame ? 200 : nil)
                        .clipped()
                        .goldTrim()
                } else {
                    Image(systemName: systemImage)
                        .font(.system(size: 52))
                        .foregroundColor(RMCTheme.gold)
                        .frame(maxWidth: .infinity, alignment: .leading)
                }

                Text(kicker)
                    .font(.subheadline)
                    .bold()
                    .tracking(2)
                    .foregroundColor(RMCTheme.gold)

                Text(title)
                    .font(.largeTitle)
                    .fontWeight(.light)
                    .foregroundColor(RMCTheme.ivory)

                content
            }
            .padding()
        }
        .navigationTitle(title)
        .navigationBarTitleDisplayMode(.inline)
        .rmcScreen()
    }
}

struct MusicNewsTipsView: View {
    var body: some View {
        SectionPageChrome(title: "RMC13 Musicnews and tips", kicker: "Studio Desk", imageName: "RMC13_MAin", systemImage: "music.note.list") {
            Text("Coverage of RMC13 records, session notes, mix tips, and playlist placements. Use this desk for weekly music news and practical production advice.")
                .font(.body)
                .foregroundColor(RMCTheme.muted)

            topicBlock(title: "This week", items: [
                "New reel drops from RMC13 Productions",
                "Vocal chain tips for mobile recording",
                "Community playlist submissions open Friday"
            ])

            topicBlock(title: "Producer tips", items: [
                "Leave 1 dB of headroom on bounce files",
                "Label stems with song_key_bpm",
                "Keep a dry vocal and a printed vocal"
            ])
        }
    }
}

struct BattlezonePageView: View {
    var body: some View {
        SectionPageChrome(title: "RMC136Abattlezone", kicker: "Tactical Sandbox", imageName: "RMC136AZone_Banner", systemImage: "scope", imageFillsFrame: false) {
            Text("RMC136Abattlezone is the competitive map layer for 136Zone operations. Track sector shifts, specimen catalogs, and live event windows from this page.")
                .font(.body)
                .foregroundColor(RMCTheme.muted)

            FlashyCarouselView(
                title: "Battle Zone Gallery",
                items: CarouselItem.battleZonePhotos,
                cardWidth: 280,
                cardHeight: 340,
                horizontalPadding: 0
            )

            topicBlock(title: "Active sectors", items: [
                "North ridge patrol routes",
                "Alien catalog rotations",
                "Night cycle visibility rules"
            ])

            NavigationLink(destination: RMC136AZoneDetailView()) {
                labelButton("Open 136Zone spec")
            }
        }
    }
}

struct LegendsOfGloryPageView: View {
    var body: some View {
        SectionPageChrome(title: "Legends of Glory", kicker: "Expansion Drop", imageName: "Legends_Glory", systemImage: "crown.fill") {
            Text("Legends of Glory is the large-scale battle expansion. Glory artists, ranked ladders, and limited cosmetics land through this rotation.")
                .font(.body)
                .foregroundColor(RMCTheme.muted)

            topicBlock(title: "Expansion beat", items: [
                "Glory battle artist join RMC13 for a huge battle",
                "Unique rewards dropping this rotation",
                "Spectator reels from RMC13 Productions"
            ])

            NavigationLink(destination: ArticleDetailView(
                title: "Legends of glory",
                source: "rmcglobal",
                imageName: "Legends_Glory",
                isSystemImage: false,
                content: "Glory battle artist join rmc13 for a huge battle. Experience the expansion mechanics and unique rewards dropping in this rotation."
            )) {
                labelButton("Read the full report")
            }
        }
    }
}

struct MVP2012PageView: View {
    var body: some View {
        SectionPageChrome(title: "Mvp2012", kicker: "Arroyo Valley", imageName: "MVP_Main", systemImage: "sportscourt.fill") {
            Text("MVP 2012 is the Arroyo Valley player, coach, fan, and gamer hub. Claim a character package, follow standings, and send your profile in for review.")
                .font(.body)
                .foregroundColor(RMCTheme.muted)

            topicBlock(title: "Hub actions", items: [
                "Build a player or coach profile",
                "Submit photos and highlight notes",
                "Wait for admin approval by email"
            ])

            NavigationLink(destination: MVPView()) {
                labelButton("Open MVP Hub")
            }
        }
    }
}

struct FourKNMCampaignView: View {
    var body: some View {
        SectionPageChrome(title: "4knm Campaign", kicker: "Campaign Ops", imageName: nil, systemImage: "flag.checkered") {
            Text("The 4knm Campaign is the long-form RMC13 mission track. Follow checkpoint briefs, field capture goals, and community scoring from this board.")
                .font(.body)
                .foregroundColor(RMCTheme.muted)

            topicBlock(title: "Campaign board", items: [
                "Checkpoint 1: recruit your local node",
                "Checkpoint 2: log a 4k capture sample",
                "Checkpoint 3: file a campaign recap reel"
            ])

            topicBlock(title: "How to join", items: [
                "Create an RMC13 profile",
                "Tag submissions with 4knm",
                "Watch this page for weekly briefs"
            ])
        }
    }
}

struct LAFilmModeView: View {
    var body: some View {
        SectionPageChrome(title: "Lafilmmode", kicker: "Picture Desk", imageName: "generated-image-1-41", systemImage: "film.fill") {
            Text("Lafilmmode covers RMC13 film sets, lookbooks, and Los Angeles production notes. Use it for camera setups, location lists, and premiere timing.")
                .font(.body)
                .foregroundColor(RMCTheme.muted)

            topicBlock(title: "On set", items: [
                "Night exterior lighting package",
                "Interview framing for reel cuts",
                "Color notes for RMC13PRoductions"
            ])

            topicBlock(title: "Now shooting", items: [
                "Music video companion for current singles",
                "Documentary shorts around community events",
                "Casting calls posted in RMC13 Community"
            ])
        }
    }
}

struct RMC13CommunityView: View {
    var body: some View {
        SectionPageChrome(title: "RMC13 Community", kicker: "Members", imageName: "MVP_Game_Central", systemImage: "person.3.fill") {
            Text("The RMC13 Community page is the meeting point for fans, players, filmmakers, and music crews. Share updates, find collaborators, and follow house rules.")
                .font(.body)
                .foregroundColor(RMCTheme.muted)

            topicBlock(title: "Community lanes", items: [
                "Players and coaches from MVP 2012",
                "Music and film contributors",
                "Battlezone and campaign squads"
            ])

            topicBlock(title: "House notes", items: [
                "Keep posts tied to RMC13 projects",
                "Credit artists on every reel",
                "Profile requests are reviewed by admin"
            ])
        }
    }
}

@ViewBuilder
private func topicBlock(title: String, items: [String]) -> some View {
    VStack(alignment: .leading, spacing: 10) {
        Text(title)
            .font(.headline)
            .foregroundColor(RMCTheme.gold)
        ForEach(items, id: \.self) { item in
            HStack(alignment: .top, spacing: 8) {
                Image(systemName: "circle.fill")
                    .font(.system(size: 6))
                    .padding(.top, 7)
                    .foregroundColor(RMCTheme.gold)
                Text(item)
                    .font(.body)
                    .foregroundColor(RMCTheme.ivory)
            }
        }
    }
    .padding()
    .frame(maxWidth: .infinity, alignment: .leading)
    .goldCard()
}

private func labelButton(_ title: String) -> some View {
    GoldCTAButton(title: title)
}
