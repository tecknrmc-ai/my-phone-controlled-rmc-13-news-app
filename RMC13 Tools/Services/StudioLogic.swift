import Foundation

enum StudioLogic {
    static func usd(_ value: Decimal) -> String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .currency
        formatter.currencyCode = "USD"
        formatter.locale = Locale(identifier: "en_US")
        return formatter.string(from: value as NSDecimalNumber) ?? "$\(value)"
    }

    static func rowBeats(_ beats: [Beat], count: Int = 5) -> [Beat] {
        Array(beats.prefix(count))
    }

    static func filteredBeats(
        _ beats: [Beat],
        query: String,
        genre: Genre,
        bpm: ClosedRange<Int>,
        freeOnly: Bool
    ) -> [Beat] {
        let needle = query.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        return beats.filter { beat in
            if freeOnly && !beat.isFree { return false }
            if genre != .all && beat.genre != genre { return false }
            if !bpm.contains(beat.bpm) { return false }
            if needle.isEmpty { return true }
            let haystack = ([beat.title, beat.producer, beat.musicalKey, beat.genre.rawValue] + beat.tags)
                .joined(separator: " ")
                .lowercased()
            return haystack.contains(needle)
        }
    }

    static func passwordError(
        currentInput: String,
        stored: String,
        newPassword: String,
        confirm: String
    ) -> String? {
        if currentInput != stored {
            return "Current password does not match."
        }
        if newPassword.count < 8 {
            return "New password needs at least 8 characters."
        }
        if newPassword == stored {
            return "Choose a different password than the one you use now."
        }
        if newPassword != confirm {
            return "New password and confirmation do not match."
        }
        return nil
    }

    static func pressIssues(_ draft: PressDraft) -> [String] {
        var issues: [String] = []
        if draft.artistName.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
            issues.append("Artist / stage name is required.")
        }
        if draft.projectTitle.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
            issues.append("Project title is required.")
        }
        if draft.biography.trimmingCharacters(in: .whitespacesAndNewlines).count < 40 {
            issues.append("Biography needs at least 40 characters.")
        }
        if draft.hometown.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
            issues.append("Hometown is required.")
        }
        if draft.tier == nil {
            issues.append("Choose a press release tier before submitting.")
        }
        return issues
    }

    static func stepIssues(_ draft: PressDraft, step: Int) -> [String] {
        switch step {
        case 0:
            return pressIssues(draft).filter {
                $0.hasPrefix("Artist") || $0.hasPrefix("Project")
            }
        case 1:
            return pressIssues(draft).filter { $0.hasPrefix("Biography") }
        case 2:
            return pressIssues(draft).filter { $0.hasPrefix("Hometown") }
        case 4:
            return pressIssues(draft).filter { $0.hasPrefix("Choose") }
        default:
            return []
        }
    }

    static func formattedRelease(_ draft: PressDraft, on date: Date = Date()) -> String {
        let release = draft.releaseDate.formatted(date: .long, time: .omitted)
        let filed = date.formatted(date: .abbreviated, time: .omitted)
        let tier = draft.tier?.name ?? "Unassigned tier"
        let school = draft.highSchool.trimmingCharacters(in: .whitespacesAndNewlines)
        let schoolLine = school.isEmpty ? "" : "\nHigh school: \(school)"
        let persona = draft.persona.trimmingCharacters(in: .whitespacesAndNewlines)
        let achievements = draft.achievements.trimmingCharacters(in: .whitespacesAndNewlines)
        let notes = draft.notes.trimmingCharacters(in: .whitespacesAndNewlines)

        return """
        FOR IMMEDIATE RELEASE
        \(filed) · RMC13 Tools Press Desk · \(tier)

        \(draft.artistName) announces \(draft.releaseType.rawValue.lowercased()) "\(draft.projectTitle)"
        Release date: \(release)

        \(draft.biography.trimmingCharacters(in: .whitespacesAndNewlines))

        Background
        Hometown: \(draft.hometown)\(schoolLine)
        \(persona.isEmpty ? "Brand identity is on file with the RMC13 desk." : persona)

        Milestones
        \(achievements.isEmpty ? "Milestones will be confirmed with the artist during editorial." : achievements)

        \(notes.isEmpty ? "RMC13 Tools will distribute this release to the outlets included in the selected tier." : notes)

        Media contact: press@rmc13.tools
        """
    }

    static func filteredOwned(_ owned: [OwnedBeat], filter: VaultFilter) -> [OwnedBeat] {
        switch filter {
        case .all:
            owned
        case .purchased:
            owned.filter { !$0.wasFree }
        case .free:
            owned.filter(\.wasFree)
        }
    }
}
