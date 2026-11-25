import Foundation

enum MediaLocator {
    static func url(for name: String, extensions: [String], subdirectories: [String?] = [nil, "Beats", "Assets/Beats", "Videos"]) -> URL? {
        for ext in extensions {
            for subdirectory in subdirectories {
                if let subdirectory,
                   let url = Bundle.main.url(forResource: name, withExtension: ext, subdirectory: subdirectory) {
                    return url
                }
                if let url = Bundle.main.url(forResource: name, withExtension: ext) {
                    return url
                }
            }
        }
        return nil
    }

    static func audioURL(named name: String, preferredExtension: String) -> URL? {
        let ordered = [preferredExtension, "mp3", "wav", "m4a"]
        var seen: [String] = []
        for ext in ordered where !seen.contains(ext) {
            seen.append(ext)
            if let url = url(for: name, extensions: [ext]) {
                return url
            }
        }
        return nil
    }

    static func videoURL(candidates: [String]) -> URL? {
        for name in candidates {
            if let url = url(for: name, extensions: ["mp4", "mov", "m4v"], subdirectories: [nil, "Videos", "Assets/Videos"]) {
                return url
            }
        }
        return nil
    }

    static func data(at url: URL?) -> Data {
        guard let url, let data = try? Data(contentsOf: url), !data.isEmpty else {
            return Data()
        }
        return data
    }
}
