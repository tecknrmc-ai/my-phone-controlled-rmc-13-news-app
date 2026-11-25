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

    static let beats: [Beat] = [
        Beat(
            id: "midnight-voltage",
            title: "Midnight Voltage",
            producer: "RMC13",
            genre: .trap,
            bpm: 140,
            musicalKey: "F# minor",
            price: Decimal(string: "29.99") ?? 29.99,
            tags: ["dark", "808", "night", "exclusive"],
            artworkName: "MidnightVoltage",
            audioName: "MidnightVoltage",
            summary: "A late-night trap drop with glassy leads and a rolling 808 pocket.",
            isFeatured: true
        ),
        Beat(
            id: "silk-hour",
            title: "Silk Hour",
            producer: "RMC13",
            genre: .rnb,
            bpm: 92,
            musicalKey: "D major",
            price: Decimal(string: "49.99") ?? 49.99,
            tags: ["smooth", "keys", "vocals", "night"],
            artworkName: "SilkHour",
            audioName: "SilkHour",
            summary: "Warm Rhodes, soft drums, and space left for a lead vocal.",
            isFeatured: true
        ),
        Beat(
            id: "block-prayer",
            title: "Block Prayer",
            producer: "RMC13",
            genre: .drill,
            bpm: 144,
            musicalKey: "C# minor",
            price: 0,
            tags: ["free", "slide", "street", "drill"],
            artworkName: "BlockPrayer",
            audioName: "BlockPrayer",
            summary: "A free drill starter with sliding bass and a tight hat pattern.",
            isFeatured: true
        ),
        Beat(
            id: "gold-room",
            title: "Gold Room",
            producer: "RMC13",
            genre: .hipHop,
            bpm: 128,
            musicalKey: "A minor",
            price: Decimal(string: "29.99") ?? 29.99,
            tags: ["boom bap", "sample", "gold"],
            artworkName: "GoldRoom",
            audioName: "GoldRoom",
            summary: "Dusty chops over a head-nod pocket built for verses.",
            isFeatured: false
        ),
        Beat(
            id: "lagos-after-dark",
            title: "Lagos After Dark",
            producer: "RMC13",
            genre: .afrobeats,
            bpm: 108,
            musicalKey: "G major",
            price: Decimal(string: "39.99") ?? 39.99,
            tags: ["log drum", "dance", "sunset"],
            artworkName: "LagosAfterDark",
            audioName: "LagosAfterDark",
            summary: "Percussion-forward afrobeats with a chorus that lifts on the two.",
            isFeatured: true
        ),
        Beat(
            id: "velvet-static",
            title: "Velvet Static",
            producer: "RMC13",
            genre: .rnb,
            bpm: 86,
            musicalKey: "E minor",
            price: 0,
            tags: ["free", "alt", "texture"],
            artworkName: "VelvetStatic",
            audioName: "VelvetStatic",
            summary: "A free alt-R&B sketch with airy pads and a slow kick.",
            isFeatured: false
        ),
        Beat(
            id: "roof-sermon",
            title: "Roof Sermon",
            producer: "RMC13",
            genre: .trap,
            bpm: 150,
            musicalKey: "B minor",
            price: Decimal(string: "49.99") ?? 49.99,
            tags: ["anthem", "roof", "festival"],
            artworkName: "RoofSermon",
            audioName: "RoofSermon",
            summary: "Big-room trap written for a rooftop video and a last chorus.",
            isFeatured: false
        ),
        Beat(
            id: "chrome-halo",
            title: "Chrome Halo",
            producer: "RMC13",
            genre: .hipHop,
            bpm: 136,
            musicalKey: "F minor",
            price: Decimal(string: "29.99") ?? 29.99,
            tags: ["metallic", "bounce", "club"],
            artworkName: "ChromeHalo",
            audioName: "ChromeHalo",
            summary: "Chrome-bright synths and a bounce pattern that sits forward.",
            isFeatured: false
        )
    ]

    static let starterOwned: [OwnedBeat] = [
        OwnedBeat(
            id: UUID(uuidString: "A1000000-0000-0000-0000-000000000001")!,
            beatID: "block-prayer",
            license: .mp3Lease,
            acquiredAt: pacific(21, 18),
            wasFree: true
        ),
        OwnedBeat(
            id: UUID(uuidString: "A1000000-0000-0000-0000-000000000002")!,
            beatID: "silk-hour",
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
            title: "Midnight Voltage lands in the new beats row",
            category: .beatDrops,
            excerpt: "RMC13's 140 BPM trap exclusive is the first card in this week's five-beat scroll.",
            body: "Midnight Voltage is the lead exclusive on the beats floor: F# minor, 140 BPM, produced by RMC13. Preview it from the home row or the marketplace. MP3 leases, WAV leases, and trackout notes all check out into the same vault, where the audio, cover, and license can be exported to Files.",
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
            title: "Free download: Block Prayer is unlocked",
            category: .beatDrops,
            excerpt: "The drill starter is priced at FREE so you can test the vault download flow today.",
            body: "Block Prayer is already in the demo vault as a free MP3 lease, next to a purchased WAV of Silk Hour. Open Profile, tap either row, and export the audio, cover, or license. The same path is what a new purchase uses after checkout.",
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
            title: "Midnight Voltage",
            subtitle: "Exclusive trap drop · 140 BPM · F# minor",
            artworkName: "MidnightVoltage",
            cta: "Play Drop",
            action: .playBeat("midnight-voltage")
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
            title: "Block Prayer",
            subtitle: "Drill starter unlocked for the vault.",
            artworkName: "BlockPrayer",
            cta: "Browse Free Beats",
            action: .openFreeBeats
        ),
        HeroSlide(
            id: "hero-silk",
            badge: "FEATURED",
            title: "Silk Hour",
            subtitle: "R&B lease · 92 BPM · already in the demo vault.",
            artworkName: "SilkHour",
            cta: "Play Preview",
            action: .playBeat("silk-hour")
        )
    ]
}
