import Foundation

enum Genre: String, CaseIterable, Identifiable, Codable, Hashable, Sendable {
    case all = "All"
    case trap = "Trap"
    case rnb = "R&B"
    case hipHop = "Hip-Hop"
    case drill = "Drill"
    case afrobeats = "Afrobeats"

    var id: String { rawValue }
}

enum LicenseTier: String, CaseIterable, Identifiable, Codable, Hashable, Sendable {
    case mp3Lease = "MP3 Lease"
    case wavLease = "WAV Lease"
    case trackout = "Trackout Stems"

    var id: String { rawValue }

    var blurb: String {
        switch self {
        case .mp3Lease:
            "Stereo MP3 master plus the high-res cover."
        case .wavLease:
            "Uncompressed WAV master plus the high-res cover."
        case .trackout:
            "WAV master, stem notes, and the high-res cover."
        }
    }

    var audioExtension: String {
        switch self {
        case .mp3Lease: "mp3"
        case .wavLease, .trackout: "wav"
        }
    }
}

struct Beat: Identifiable, Codable, Hashable, Sendable {
    let id: String
    let title: String
    let producer: String
    let genre: Genre
    let bpm: Int
    let musicalKey: String
    let price: Decimal
    let tags: [String]
    let artworkName: String
    let audioName: String
    let summary: String
    let isFeatured: Bool

    var isFree: Bool { price == 0 }

    var priceLabel: String {
        isFree ? "FREE" : StudioLogic.usd(price)
    }
}

struct OwnedBeat: Identifiable, Codable, Hashable, Sendable {
    let id: UUID
    let beatID: String
    let license: LicenseTier
    let acquiredAt: Date
    let wasFree: Bool
}

enum NewsCategory: String, CaseIterable, Identifiable, Codable, Hashable, Sendable {
    case all = "All"
    case toolUpdates = "Tool Updates"
    case marketingTips = "Marketing Tips"
    case beatDrops = "Beat Drops"

    var id: String { rawValue }
}

struct NewsPost: Identifiable, Codable, Hashable, Sendable {
    let id: String
    let title: String
    let category: NewsCategory
    let excerpt: String
    let body: String
    let minutes: Int
    let publishedAt: Date
    let artworkName: String
    let badge: String?
}

enum ReleaseType: String, CaseIterable, Identifiable, Codable, Hashable, Sendable {
    case single = "Single"
    case ep = "EP"
    case album = "Album"
    case musicVideo = "Music Video"

    var id: String { rawValue }
}

enum PressTier: String, CaseIterable, Identifiable, Codable, Hashable, Sendable {
    case standard
    case featured
    case premiere

    var id: String { rawValue }

    var name: String {
        switch self {
        case .standard: "Bottom Tier"
        case .featured: "Middle Tier"
        case .premiere: "Top Tier"
        }
    }

    var price: Decimal {
        switch self {
        case .standard: Decimal(string: "49.99") ?? 49.99
        case .featured: Decimal(string: "99.00") ?? 99
        case .premiere: Decimal(string: "149.00") ?? 149
        }
    }

    var badge: String? {
        self == .featured ? "Most Popular" : nil
    }

    var deliverables: [String] {
        switch self {
        case .standard:
            [
                "Standard press release write-up",
                "Grammar and editorial polish",
                "Submission to RMC13 partner blogs"
            ]
        case .featured:
            [
                "Everything in Bottom Tier",
                "Featured placement on RMC13 News",
                "Priority distribution",
                "Social media spotlight"
            ]
        case .premiere:
            [
                "Everything in Middle Tier",
                "Homepage hero feature eligibility",
                "Guaranteed syndication blast",
                "Dedicated PR campaign report"
            ]
        }
    }
}

enum CampaignStatus: String, Codable, Hashable, Sendable {
    case inReview = "In Review"
    case published = "Published"
}

struct PressCampaign: Identifiable, Codable, Hashable, Sendable {
    let id: UUID
    var artistName: String
    var projectTitle: String
    var releaseType: ReleaseType
    var releaseDate: Date
    var biography: String
    var persona: String
    var hometown: String
    var highSchool: String
    var achievements: String
    var notes: String
    var tier: PressTier
    var status: CampaignStatus
    var submittedAt: Date
    var photoData: Data?
}

struct PressDraft: Equatable, Sendable {
    var artistName: String = ""
    var projectTitle: String = ""
    var releaseType: ReleaseType = .single
    var releaseDate: Date = Date()
    var biography: String = ""
    var persona: String = ""
    var hometown: String = ""
    var highSchool: String = ""
    var achievements: String = ""
    var notes: String = ""
    var tier: PressTier?
    var photoData: Data?
}

struct ArtistProfile: Codable, Equatable, Sendable {
    var displayName: String
    var handle: String
    var email: String
    var password: String
    var photoData: Data?

    static let demo = ArtistProfile(
        displayName: "Nova Lane",
        handle: "@novalane",
        email: "nova@rmc13.studio",
        password: "studio13",
        photoData: nil
    )

    static let guest = ArtistProfile(
        displayName: "New Artist",
        handle: "@artist",
        email: "artist@rmc13.studio",
        password: "studio13",
        photoData: nil
    )
}

struct VaultSnapshot: Codable, Equatable, Sendable {
    var profile: ArtistProfile
    var owned: [OwnedBeat]
    var campaigns: [PressCampaign]

    static var seeded: VaultSnapshot {
        VaultSnapshot(profile: .demo, owned: MockCatalog.starterOwned, campaigns: [])
    }

    static var fresh: VaultSnapshot {
        VaultSnapshot(profile: .guest, owned: [], campaigns: [])
    }
}

enum VaultFilter: String, CaseIterable, Identifiable, Sendable {
    case all = "All Items"
    case purchased = "Purchased"
    case free = "Free Downloads"

    var id: String { rawValue }
}

enum ToolsTab: Int, CaseIterable, Identifiable, Hashable, Sendable {
    case home
    case beats
    case press
    case profile

    var id: Int { rawValue }

    var title: String {
        switch self {
        case .home: "Home"
        case .beats: "Beats"
        case .press: "Press Release"
        case .profile: "Profile"
        }
    }

    var symbol: String {
        switch self {
        case .home: "house.fill"
        case .beats: "waveform"
        case .press: "newspaper.fill"
        case .profile: "person.crop.circle.fill"
        }
    }
}

struct HeroSlide: Identifiable, Hashable, Sendable {
    enum Action: Hashable, Sendable {
        case playBeat(String)
        case openPress
        case openFreeBeats
    }

    let id: String
    let badge: String
    let title: String
    let subtitle: String
    let artworkName: String
    let cta: String
    let action: Action
}

enum DownloadKind: String, Identifiable, CaseIterable, Sendable {
    case audio
    case cover
    case license
    case notes

    var id: String { rawValue }

    var title: String {
        switch self {
        case .audio: "Beat Audio File"
        case .cover: "High-Res Cover Art"
        case .license: "License Agreement PDF"
        case .notes: "Tracklist Notes"
        }
    }

    var symbol: String {
        switch self {
        case .audio: "waveform"
        case .cover: "photo"
        case .license: "doc.richtext"
        case .notes: "list.bullet.rectangle"
        }
    }
}
