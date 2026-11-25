import Observation

@MainActor
@Observable
final class StudioSession {
    let catalog: [Beat]
    let news: [NewsPost]
    let heroes: [HeroSlide]
    let player = AudioPlayerModel()

    var profile: ArtistProfile
    var owned: [OwnedBeat]
    var campaigns: [PressCampaign]
    var selectedTab: ToolsTab = .home
    var beatsFreeOnly = false
    var playerSheet = false
    var toast: String?

    @ObservationIgnored private let store: VaultStore
    @ObservationIgnored private var toastTask: Task<Void, Never>?

    init(
        store: VaultStore = VaultStore(),
        catalog: [Beat] = MockCatalog.beats,
        news: [NewsPost] = MockCatalog.news,
        heroes: [HeroSlide] = MockCatalog.heroes
    ) {
        self.store = store
        self.catalog = catalog
        self.news = news
        self.heroes = heroes
        let snapshot = store.load()
        profile = snapshot.profile
        owned = snapshot.owned
        campaigns = snapshot.campaigns
    }

    static var preview: StudioSession { StudioSession() }

    var rowBeats: [Beat] { StudioLogic.rowBeats(catalog) }

    func beat(_ id: String) -> Beat? {
        catalog.first { $0.id == id }
    }

    func owns(_ beatID: String) -> Bool {
        owned.contains { $0.beatID == beatID }
    }

    func ownedRecord(for beatID: String) -> OwnedBeat? {
        owned.first { $0.beatID == beatID }
    }

    func presentPlayer(_ beat: Beat, queue: [Beat]) {
        player.open(beat, queue: queue)
        playerSheet = true
    }

    func acquire(_ beat: Beat, license: LicenseTier) {
        guard !owns(beat.id) else {
            flash("\(beat.title) is already in your vault.")
            return
        }
        let record = OwnedBeat(
            id: UUID(),
            beatID: beat.id,
            license: license,
            acquiredAt: Date(),
            wasFree: beat.isFree
        )
        owned.insert(record, at: 0)
        persist()
        flash(beat.isFree ? "\(beat.title) saved to your vault." : "Purchased \(beat.title). It's in your vault.")
    }

    func submitPress(_ draft: PressDraft) -> Bool {
        guard StudioLogic.pressIssues(draft).isEmpty, let tier = draft.tier else { return false }
        let campaign = PressCampaign(
            id: UUID(),
            artistName: draft.artistName.trimmingCharacters(in: .whitespacesAndNewlines),
            projectTitle: draft.projectTitle.trimmingCharacters(in: .whitespacesAndNewlines),
            releaseType: draft.releaseType,
            releaseDate: draft.releaseDate,
            biography: draft.biography.trimmingCharacters(in: .whitespacesAndNewlines),
            persona: draft.persona.trimmingCharacters(in: .whitespacesAndNewlines),
            hometown: draft.hometown.trimmingCharacters(in: .whitespacesAndNewlines),
            highSchool: draft.highSchool.trimmingCharacters(in: .whitespacesAndNewlines),
            achievements: draft.achievements.trimmingCharacters(in: .whitespacesAndNewlines),
            notes: draft.notes.trimmingCharacters(in: .whitespacesAndNewlines),
            tier: tier,
            status: .inReview,
            submittedAt: Date(),
            photoData: draft.photoData
        )
        campaigns.insert(campaign, at: 0)
        persist()
        flash("Press release filed. Status: In Review.")
        return true
    }

    func updateProfile(name: String, handle: String) {
        let trimmedName = name.trimmingCharacters(in: .whitespacesAndNewlines)
        let trimmedHandle = handle.trimmingCharacters(in: .whitespacesAndNewlines)
        if !trimmedName.isEmpty { profile.displayName = trimmedName }
        if !trimmedHandle.isEmpty {
            profile.handle = trimmedHandle.hasPrefix("@") ? trimmedHandle : "@\(trimmedHandle)"
        }
        persist()
        flash("Profile saved.")
    }

    func updatePhoto(_ data: Data?) {
        profile.photoData = data
        persist()
    }

    func updatePassword(to newPassword: String) {
        profile.password = newPassword
        persist()
        flash("Password updated.")
    }

    func sendResetLink() {
        flash("Reset link sent to \(profile.email).")
    }

    func wipe() {
        let fresh = VaultSnapshot.fresh
        profile = fresh.profile
        owned = []
        campaigns = []
        player.stop()
        playerSheet = false
        beatsFreeOnly = false
        store.save(fresh)
        flash("Profile deleted on this device.")
    }

    func flash(_ message: String) {
        toast = message
        toastTask?.cancel()
        toastTask = Task { @MainActor in
            try? await Task.sleep(for: .seconds(2.4))
            guard !Task.isCancelled, toast == message else { return }
            toast = nil
        }
    }

    private func persist() {
        store.save(VaultSnapshot(profile: profile, owned: owned, campaigns: campaigns))
    }
}
