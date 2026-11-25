import Foundation

@main
enum ToolsLogicCheck {
    static func main() {
        let beats = MockCatalog.beats
        precondition(beats.count == 25, "expected the desktop beat folder, got \(beats.count)")
        precondition(beats.first?.title == "Breakneck Halo 2")
        precondition(MockCatalog.news.count >= 4, "expected 4+ news posts")
        precondition(StudioLogic.rowBeats(beats).count == 5, "preview helper still returns 5")
        precondition(Set(StudioLogic.rowBeats(beats).map(\.id)).count == 5)

        let free = StudioLogic.filteredBeats(beats, query: "", genre: .all, bpm: 70...180, freeOnly: true)
        precondition(free.count == 2, "free beats \(free.map(\.title))")
        precondition(free.allSatisfy(\.isFree))

        let trap = StudioLogic.filteredBeats(beats, query: "", genre: .trap, bpm: 70...180, freeOnly: false)
        precondition(trap.allSatisfy { $0.genre == .trap && !$0.title.isEmpty })
        precondition(trap.contains { $0.title == "Breakneck Halo 2" })

        let slow = StudioLogic.filteredBeats(beats, query: "", genre: .all, bpm: 80...100, freeOnly: false)
        precondition(slow.contains { $0.title == "High Class Highlight" })
        precondition(!slow.contains { $0.bpm > 100 })

        let search = StudioLogic.filteredBeats(beats, query: "bhangra", genre: .all, bpm: 70...180, freeOnly: false)
        precondition(search.count == 1 && search[0].id == "desert-freeway-bhangra")

        precondition(StudioLogic.passwordError(currentInput: "nope", stored: "studio13", newPassword: "newpass123", confirm: "newpass123") != nil)
        precondition(StudioLogic.passwordError(currentInput: "studio13", stored: "studio13", newPassword: "short", confirm: "short") != nil)
        precondition(StudioLogic.passwordError(currentInput: "studio13", stored: "studio13", newPassword: "studio13", confirm: "studio13") != nil)
        precondition(StudioLogic.passwordError(currentInput: "studio13", stored: "studio13", newPassword: "newpass123", confirm: "different") != nil)
        precondition(StudioLogic.passwordError(currentInput: "studio13", stored: "studio13", newPassword: "newpass123", confirm: "newpass123") == nil)

        var draft = PressDraft()
        precondition(!StudioLogic.pressIssues(draft).isEmpty)
        draft.artistName = "Nova Lane"
        draft.projectTitle = "Voltage"
        draft.biography = String(repeating: "Night drive through the city with a full band. ", count: 2)
        draft.hometown = "Los Angeles"
        draft.tier = .featured
        precondition(StudioLogic.pressIssues(draft).isEmpty, StudioLogic.pressIssues(draft).joined(separator: ", "))
        let story = StudioLogic.formattedRelease(draft)
        precondition(story.contains("Nova Lane"))
        precondition(story.contains("Voltage"))
        precondition(story.contains("Middle Tier"))

        precondition(MockCatalog.starterOwned.count == 2)
        precondition(StudioLogic.filteredOwned(MockCatalog.starterOwned, filter: .free).count == 1)
        precondition(StudioLogic.filteredOwned(MockCatalog.starterOwned, filter: .purchased).count == 1)

        let defaults = UserDefaults(suiteName: "rmc13.tools.logic.\(UUID().uuidString)")!
        let store = VaultStore(defaults: defaults)
        let seeded = store.load()
        precondition(seeded.owned.count == 2)
        precondition(seeded.profile.displayName == "Nova Lane")
        store.save(.fresh)
        let wiped = store.load()
        precondition(wiped.owned.isEmpty)
        precondition(wiped.profile.displayName == "New Artist")

        let pdf = StudioPDF.make(lines: ["RMC13 Tools", "License"])
        precondition(String(data: pdf, encoding: .utf8)?.contains("%PDF-1.4") == true)

        let heroes = MockCatalog.heroes
        precondition(heroes.contains { $0.badge == "NEW TOOL" })
        precondition(heroes.contains { $0.badge == "FEATURED" })
        print("RMC13 Tools logic checks passed (\(beats.count) beats, \(MockCatalog.news.count) stories)")
    }
}
