import Foundation

enum MockCatalog {
    private static func pacific(_ day: Int, _ hour: Int) -> Date {
        var parts = DateComponents()
        parts.calendar = Calendar(identifier: .gregorian)
        parts.timeZone = TimeZone(identifier: "America/Los_Angeles")
        parts.year = 2026
        parts.month = 11
        parts.day = day
        parts.hour = hour
        return parts.date ?? Date()
    }

    private static let artwork = [
        "MidnightVoltage", "SilkHour", "BlockPrayer", "GoldRoom",
        "LagosAfterDark", "VelvetStatic", "RoofSermon", "ChromeHalo"
    ]

    static let beats: [Beat] = desktopTracks.enumerated().map { index, track in
        Beat(
            id: track.id,
            title: track.title,
            producer: "RMC13",
            genre: track.genre,
            bpm: track.bpm,
            musicalKey: track.key,
            price: track.price,
            tags: track.tags,
            artworkName: artwork[index % artwork.count],
            audioName: track.audioName,
            summary: track.summary,
            isFeatured: track.featured
        )
    }

    private struct DesktopTrack {
        let id: String
        let title: String
        let audioName: String
        let genre: Genre
        let bpm: Int
        let key: String
        let price: Decimal
        let tags: [String]
        let summary: String
        let featured: Bool
    }

    private static let desktopTracks: [DesktopTrack] = [
        DesktopTrack(id: "breakneck-halo-2", title: "Breakneck Halo 2", audioName: "Breakneck Halo 2", genre: .trap, bpm: 148, key: "F minor", price: Decimal(string: "29.99") ?? 29.99, tags: ["trap", "halo", "fast"], summary: "The Breakneck Halo 2 file from the desktop beats folder.", featured: true),
        DesktopTrack(id: "breakneck-halo-3", title: "Breakneck Halo 3", audioName: "Breakneck Halo 3", genre: .trap, bpm: 150, key: "F# minor", price: Decimal(string: "29.99") ?? 29.99, tags: ["trap", "halo"], summary: "The Breakneck Halo 3 file from the desktop beats folder.", featured: true),
        DesktopTrack(id: "clock-hands-2", title: "Clock Hands to the Floor 2", audioName: "Clock Hands to the Floor 2", genre: .hipHop, bpm: 132, key: "A minor", price: Decimal(string: "29.99") ?? 29.99, tags: ["hip-hop", "clock"], summary: "The Clock Hands to the Floor 2 file from the desktop beats folder.", featured: true),
        DesktopTrack(id: "clock-hands", title: "Clock Hands to the Floor", audioName: "Clock Hands to the Floor", genre: .hipHop, bpm: 128, key: "A minor", price: Decimal(string: "29.99") ?? 29.99, tags: ["hip-hop", "clock"], summary: "The Clock Hands to the Floor file from the desktop beats folder.", featured: true),
        DesktopTrack(id: "cold-night-2", title: "Cold Night Come-Up 2", audioName: "Cold Night Come-Up 2", genre: .trap, bpm: 140, key: "C# minor", price: Decimal(string: "29.99") ?? 29.99, tags: ["night", "trap"], summary: "The Cold Night Come-Up 2 file from the desktop beats folder.", featured: true),
        DesktopTrack(id: "cold-night", title: "Cold Night Come-Up", audioName: "Cold Night Come-Up", genre: .trap, bpm: 138, key: "C minor", price: Decimal(string: "29.99") ?? 29.99, tags: ["night", "trap"], summary: "The Cold Night Come-Up file from the desktop beats folder.", featured: false),
        DesktopTrack(id: "desert-freeway-bhangra", title: "Desert Freeway Bhangra", audioName: "Desert%20Freeway%20Bhangra", genre: .afrobeats, bpm: 112, key: "G major", price: Decimal(string: "39.99") ?? 39.99, tags: ["bhangra", "freeway"], summary: "The Desert Freeway Bhangra file saved in the desktop project.", featured: true),
        DesktopTrack(id: "high-class-highlight", title: "High Class Highlight", audioName: "High Class Highlight", genre: .rnb, bpm: 96, key: "D major", price: Decimal(string: "49.99") ?? 49.99, tags: ["r&b", "highlight"], summary: "The High Class Highlight file from the desktop beats folder.", featured: true),
        DesktopTrack(id: "high-rise-flex", title: "High-Rise Flex", audioName: "High-Rise Flex", genre: .hipHop, bpm: 136, key: "B minor", price: Decimal(string: "29.99") ?? 29.99, tags: ["flex", "hip-hop"], summary: "The High-Rise Flex file from the desktop beats folder.", featured: false),
        DesktopTrack(id: "midnight-cypher-chase-2", title: "Midnight Cypher Chase 2", audioName: "Midnight Cypher Chase 2", genre: .trap, bpm: 142, key: "F minor", price: Decimal(string: "29.99") ?? 29.99, tags: ["cypher", "night"], summary: "The Midnight Cypher Chase 2 file from the desktop beats folder.", featured: false),
        DesktopTrack(id: "midnight-cypher-chase", title: "Midnight Cypher Chase", audioName: "Midnight Cypher Chase", genre: .trap, bpm: 140, key: "F minor", price: Decimal(string: "29.99") ?? 29.99, tags: ["cypher", "night"], summary: "The Midnight Cypher Chase file from the desktop beats folder.", featured: true),
        DesktopTrack(id: "midnight-sprint-2", title: "Midnight Sprint 2", audioName: "Midnight Sprint 2", genre: .trap, bpm: 146, key: "G minor", price: Decimal(string: "29.99") ?? 29.99, tags: ["sprint", "night"], summary: "The Midnight Sprint 2 file from the desktop beats folder.", featured: false),
        DesktopTrack(id: "midnight-sprint", title: "Midnight Sprint", audioName: "Midnight Sprint", genre: .trap, bpm: 144, key: "G minor", price: Decimal(string: "29.99") ?? 29.99, tags: ["sprint", "night"], summary: "The Midnight Sprint file from the desktop beats folder.", featured: false),
        DesktopTrack(id: "run-it-like-money", title: "Run It Like Money", audioName: "Run It Like Money", genre: .hipHop, bpm: 134, key: "A minor", price: Decimal(string: "49.99") ?? 49.99, tags: ["money", "hip-hop"], summary: "The Run It Like Money file from the desktop beats folder.", featured: true),
        DesktopTrack(id: "run-it-up-again-3", title: "Run It Up Again 3", audioName: "Run It Up Again 3", genre: .trap, bpm: 145, key: "C minor", price: Decimal(string: "29.99") ?? 29.99, tags: ["trap"], summary: "The Run It Up Again 3 file saved in the desktop project.", featured: false),
        DesktopTrack(id: "stadium-stampede-3", title: "Stadium Stampede 3", audioName: "Stadium Stampede 3", genre: .trap, bpm: 150, key: "D minor", price: Decimal(string: "39.99") ?? 39.99, tags: ["stadium"], summary: "The Stadium Stampede 3 file saved in the desktop project.", featured: false),
        DesktopTrack(id: "trap-cypher-banger", title: "Trap Cypher Banger", audioName: "Trap Cypher Banger", genre: .trap, bpm: 140, key: "F# minor", price: Decimal(string: "29.99") ?? 29.99, tags: ["trap", "cypher"], summary: "The Trap Cypher Banger file saved in the desktop project.", featured: false),
        DesktopTrack(id: "trap-cypher-banger-2", title: "Trap Cypher Banger 2", audioName: "Trap Cypher Banger 2", genre: .trap, bpm: 142, key: "F# minor", price: Decimal(string: "29.99") ?? 29.99, tags: ["trap", "cypher"], summary: "The Trap Cypher Banger 2 file saved in the desktop project.", featured: false),
        DesktopTrack(id: "throne-in-the-chaos", title: "Throne In The Chaos", audioName: "Throne In The Chaos", genre: .hipHop, bpm: 90, key: "E minor", price: Decimal(string: "49.99") ?? 49.99, tags: ["throne"], summary: "The Throne In The Chaos file saved in the desktop project.", featured: false),
        DesktopTrack(id: "back-door-cipher", title: "Back Door Cipher", audioName: "Back Door Cipher", genre: .drill, bpm: 144, key: "C# minor", price: 0, tags: ["free", "drill"], summary: "The Back Door Cipher file saved in the desktop project.", featured: true),
        DesktopTrack(id: "night-count", title: "Night Count", audioName: "Night Count", genre: .rnb, bpm: 86, key: "D minor", price: 0, tags: ["free", "night"], summary: "The Night Count file saved in the desktop project.", featured: true),
        DesktopTrack(id: "high-level-trap-run", title: "High Level Trap Run", audioName: "High Level Trap Run", genre: .trap, bpm: 148, key: "B minor", price: Decimal(string: "29.99") ?? 29.99, tags: ["trap"], summary: "The High Level Trap Run file saved in the desktop project.", featured: false),
        DesktopTrack(id: "next-level-voltage", title: "Next Level Voltage", audioName: "Next%20Level%20Voltage", genre: .trap, bpm: 140, key: "F minor", price: Decimal(string: "29.99") ?? 29.99, tags: ["voltage"], summary: "The Next Level Voltage file saved in the desktop project.", featured: false),
        DesktopTrack(id: "block-ring-cypher-2", title: "Block Ring Cypher 2", audioName: "Block Ring Cypher 2", genre: .drill, bpm: 144, key: "C# minor", price: Decimal(string: "29.99") ?? 29.99, tags: ["drill", "cypher"], summary: "The Block Ring Cypher 2 file saved in the desktop project.", featured: false),
        DesktopTrack(id: "late-night-cypher", title: "Late Night Cypher", audioName: "Late Night Cypher", genre: .hipHop, bpm: 96, key: "A minor", price: Decimal(string: "29.99") ?? 29.99, tags: ["cypher", "night"], summary: "The Late Night Cypher file saved in the desktop project.", featured: false)
    ]

    static let starterOwned: [OwnedBeat] = [
        OwnedBeat(
            id: UUID(uuidString: "A1000000-0000-0000-0000-000000000001")!,
            beatID: "night-count",
            license: .mp3Lease,
            acquiredAt: pacific(21, 18),
            wasFree: true
        ),
        OwnedBeat(
            id: UUID(uuidString: "A1000000-0000-0000-0000-000000000002")!,
            beatID: "high-class-highlight",
            license: .wavLease,
            acquiredAt: pacific(23, 11),
            wasFree: false
        )
    ]

    static let news: [NewsPost] = [
        NewsPost(
            id: "press-desk",
            title: "Press Desk tiers are live inside RMC13 Tools",
            category: .toolUpdates,
            excerpt: "Artists can now file a release, pick a distribution tier, and track it from the profile vault.",
            body: "RMC13 Tools opened the press desk for working artists. The Bottom Tier covers a polished write-up and partner blogs. The Middle Tier adds an RMC13 News feature and a social spotlight. The Top Tier is the syndication blast with a campaign report. Drafts stay on device until you submit, and every submission lands in Profile with an In Review status.",
            minutes: 3,
            publishedAt: pacific(24, 9),
            artworkName: "GoldRoom",
            badge: "NEW TOOL"
        ),
        NewsPost(
            id: "voltage-drop",
            title: "Breakneck Halo 2 is first on the home row",
            category: .beatDrops,
            excerpt: "The desktop beats folder is loaded on Home, starting with Breakneck Halo 2.",
            body: "Home now scrolls every file saved in the desktop RMC13 Tools project, starting with Breakneck Halo 2, Breakneck Halo 3, and Clock Hands to the Floor. Preview any card to open the player. MP3 and WAV files in Rmc news beats are the audio those cards play.",
            minutes: 2,
            publishedAt: pacific(24, 7),
            artworkName: "MidnightVoltage",
            badge: "FEATURED"
        ),
        NewsPost(
            id: "hometown-brief",
            title: "Marketing tip: lead the bio with the hometown",
            category: .marketingTips,
            excerpt: "Editors pick up a release faster when the city, school, and one hard number show up in the first screen.",
            body: "When you brief the press desk, put the hometown and one milestone above the extra links. A stream count, a placement, or a room you sold out gives the writer a lede. Save social handles and older press for the notes field so the story stays readable in the live preview.",
            minutes: 4,
            publishedAt: pacific(22, 16),
            artworkName: "LagosAfterDark",
            badge: nil
        ),
        NewsPost(
            id: "free-drill",
            title: "Free download: Night Count is unlocked",
            category: .beatDrops,
            excerpt: "Night Count is priced at FREE so you can test the vault download flow today.",
            body: "Night Count is already in the demo vault as a free download, next to a purchased copy of High Class Highlight. Open Profile, tap either row, and export the audio, cover, or license. The same path is what a new purchase uses after checkout.",
            minutes: 2,
            publishedAt: pacific(20, 12),
            artworkName: "BlockPrayer",
            badge: "FREE"
        ),
        NewsPost(
            id: "vault-files",
            title: "Vault exports now hand off to the Files app",
            category: .toolUpdates,
            excerpt: "Owned beats keep their license type and can be shared or saved one file at a time.",
            body: "The download drawer simulates a short transfer, then opens the system exporter. Audio follows the license you picked, cover art saves as JPEG, and the license agreement is a PDF you can drop into a press folder. Nothing here calls a store kit charge. Checkout is on-device so the studio flow can be reviewed end to end.",
            minutes: 3,
            publishedAt: pacific(18, 15),
            artworkName: "ChromeHalo",
            badge: nil
        )
    ]

    static let heroes: [HeroSlide] = [
        HeroSlide(
            id: "hero-voltage",
            badge: "FEATURED",
            title: "Breakneck Halo 2",
            subtitle: "Desktop beat · 148 BPM · F minor",
            artworkName: "MidnightVoltage",
            cta: "Play Drop",
            action: .playBeat("breakneck-halo-2")
        ),
        HeroSlide(
            id: "hero-press",
            badge: "NEW TOOL",
            title: "File a press release",
            subtitle: "Three desks. Partner blogs through a full syndication blast.",
            artworkName: "GoldRoom",
            cta: "Create a Press Release",
            action: .openPress
        ),
        HeroSlide(
            id: "hero-free",
            badge: "FREE DROP",
            title: "Night Count",
            subtitle: "Free desktop beat unlocked for the vault.",
            artworkName: "BlockPrayer",
            cta: "Browse Free Beats",
            action: .openFreeBeats
        ),
        HeroSlide(
            id: "hero-silk",
            badge: "FEATURED",
            title: "High Class Highlight",
            subtitle: "R&B lease · 96 BPM · already in the demo vault.",
            artworkName: "SilkHour",
            cta: "Play Preview",
            action: .playBeat("high-class-highlight")
        )
    ]
}
