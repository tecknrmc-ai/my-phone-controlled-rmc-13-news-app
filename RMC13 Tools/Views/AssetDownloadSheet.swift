import SwiftUI
import UniformTypeIdentifiers

struct AssetDownloadSheet: View {
    let beat: Beat
    let owned: OwnedBeat
    @Environment(StudioSession.self) private var session
    @Environment(\.dismiss) private var dismiss
    @State private var progress: [DownloadKind: Double] = [:]
    @State private var busyKind: DownloadKind?
    @State private var exporting = false
    @State private var document: StudioFileDocument?
    @State private var exportType: UTType = .data
    @State private var exportName = "RMC13-asset"
    @State private var shareURL: URL?

    var body: some View {
        NavigationStack {
            List {
                Section {
                    HStack(spacing: 12) {
                        BeatArtwork(name: beat.artworkName)
                            .frame(width: 64, height: 64)
                            .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
                        VStack(alignment: .leading, spacing: 4) {
                            Text(beat.title)
                                .font(.headline)
                            Text(owned.license.rawValue)
                                .font(.caption)
                                .foregroundStyle(StudioTheme.cyan)
                            Text(owned.wasFree ? "Free download" : "Purchased")
                                .font(.caption2)
                                .foregroundStyle(StudioTheme.muted)
                        }
                    }
                    .listRowBackground(StudioTheme.card)
                }
                Section("Files") {
                    ForEach(DownloadKind.allCases) { kind in
                        VStack(alignment: .leading, spacing: 8) {
                            Button {
                                Task { @MainActor in
                                    await prepare(kind)
                                }
                            } label: {
                                HStack {
                                    Label(kind.title, systemImage: kind.symbol)
                                    Spacer()
                                    if busyKind == kind {
                                        ProgressView()
                                    } else {
                                        Image(systemName: "square.and.arrow.down")
                                    }
                                }
                            }
                            .disabled(busyKind != nil)
                            if let value = progress[kind] {
                                ProgressView(value: value)
                                    .tint(StudioTheme.cyan)
                            }
                        }
                        .listRowBackground(StudioTheme.card)
                    }
                }
                if let shareURL {
                    Section("Share") {
                        ShareLink(item: shareURL) {
                            Label("Share \(shareURL.lastPathComponent)", systemImage: "square.and.arrow.up")
                        }
                        .listRowBackground(StudioTheme.card)
                    }
                }
            }
            .scrollContentBackground(.hidden)
            .background(StudioTheme.background)
            .navigationTitle("Download")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button("Done") { dismiss() }
                }
            }
        }
        .preferredColorScheme(.dark)
        .fileExporter(
            isPresented: $exporting,
            document: document,
            contentType: exportType,
            defaultFilename: exportName
        ) { result in
            if case .success = result {
                session.flash("Saved to Files.")
            }
        }
    }

    private func prepare(_ kind: DownloadKind) async {
        busyKind = kind
        progress[kind] = 0
        for step in 1...20 {
            try? await Task.sleep(for: .milliseconds(45))
            progress[kind] = Double(step) / 20
        }
        let payload = StudioDocuments.export(kind: kind, beat: beat, owned: owned)
        document = StudioFileDocument(data: payload.data)
        exportType = payload.type
        exportName = payload.filename
        let url = FileManager.default.temporaryDirectory.appendingPathComponent(payload.filename)
        try? payload.data.write(to: url, options: .atomic)
        shareURL = url
        busyKind = nil
        exporting = true
    }
}

#Preview {
    AssetDownloadSheet(beat: MockCatalog.beats[2], owned: MockCatalog.starterOwned[0])
        .environment(StudioSession.preview)
}
