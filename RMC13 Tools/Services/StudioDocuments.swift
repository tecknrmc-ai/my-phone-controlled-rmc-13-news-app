import SwiftUI
import UIKit
import UniformTypeIdentifiers

struct StudioFileDocument: FileDocument {
    static var readableContentTypes: [UTType] { [.data] }
    var data: Data

    init(data: Data) {
        self.data = data
    }

    init(configuration: ReadConfiguration) throws {
        data = configuration.file.regularFileContents ?? Data()
    }

    func fileWrapper(configuration: WriteConfiguration) throws -> FileWrapper {
        FileWrapper(regularFileWithContents: data)
    }
}

enum StudioDocuments {
    static func export(kind: DownloadKind, beat: Beat, owned: OwnedBeat) -> (data: Data, filename: String, type: UTType) {
        switch kind {
        case .audio:
            let ext = owned.license.audioExtension
            let url = MediaLocator.audioURL(named: beat.audioName, preferredExtension: ext)
            let bytes = MediaLocator.data(at: url)
            let type: UTType = ext == "mp3" ? .mp3 : .wav
            return (bytes.isEmpty ? Data("RMC13 \(beat.title) audio".utf8) : bytes, "\(fileSlug(beat.title)).\(ext)", type)
        case .cover:
            return (coverData(named: beat.artworkName), "\(fileSlug(beat.title))-cover.jpg", .jpeg)
        case .license:
            return (licensePDF(beat: beat, owned: owned), "\(fileSlug(beat.title))-license.pdf", .pdf)
        case .notes:
            let text = tracklist(beat: beat, owned: owned)
            return (Data(text.utf8), "\(fileSlug(beat.title))-tracklist.txt", .plainText)
        }
    }

    static func coverData(named name: String) -> Data {
        if let url = MediaLocator.url(for: name, extensions: ["jpg", "jpeg", "png"]),
           let data = try? Data(contentsOf: url), !data.isEmpty {
            return data
        }
        if let image = UIImage(named: name), let data = image.jpegData(compressionQuality: 0.92) {
            return data
        }
        return Data()
    }

    static func licensePDF(beat: Beat, owned: OwnedBeat) -> Data {
        StudioPDF.make(lines: [
            "RMC13 Tools License Agreement",
            beat.title,
            "Producer: \(beat.producer)",
            "License: \(owned.license.rawValue)",
            "Genre: \(beat.genre.rawValue)  BPM: \(beat.bpm)  Key: \(beat.musicalKey)",
            "Deliverables: audio file + high-res cover art",
            "Personal lease for the named artist vault.",
            "The beat itself is not cleared for resale.",
            "Issued \(owned.acquiredAt.formatted(date: .abbreviated, time: .omitted))"
        ])
    }

    static func tracklist(beat: Beat, owned: OwnedBeat) -> String {
        """
        \(beat.title) — \(beat.producer)
        License: \(owned.license.rawValue)
        \(beat.bpm) BPM · \(beat.musicalKey) · \(beat.genre.rawValue)
        \(beat.summary)
        Included: audio file, high-res cover art, this tracklist.
        """
    }

    private static func fileSlug(_ title: String) -> String {
        let cleaned = title.lowercased().map { character -> Character in
            character.isLetter || character.isNumber ? character : "-"
        }
        let collapsed = String(cleaned).replacingOccurrences(of: "--", with: "-")
        return collapsed.trimmingCharacters(in: CharacterSet(charactersIn: "-"))
    }
}
