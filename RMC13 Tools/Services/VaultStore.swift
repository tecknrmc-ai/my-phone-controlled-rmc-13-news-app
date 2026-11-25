import Foundation

final class VaultStore {
    private let defaults: UserDefaults
    private let key: String

    init(defaults: UserDefaults = .standard, key: String = "rmc13.tools.vault.v1") {
        self.defaults = defaults
        self.key = key
    }

    func load() -> VaultSnapshot {
        guard let data = defaults.data(forKey: key) else {
            let seeded = VaultSnapshot.seeded
            save(seeded)
            return seeded
        }
        guard let snapshot = try? JSONDecoder().decode(VaultSnapshot.self, from: data) else {
            let seeded = VaultSnapshot.seeded
            save(seeded)
            return seeded
        }
        return snapshot
    }

    func save(_ snapshot: VaultSnapshot) {
        guard let data = try? JSONEncoder().encode(snapshot) else { return }
        defaults.set(data, forKey: key)
    }
}
