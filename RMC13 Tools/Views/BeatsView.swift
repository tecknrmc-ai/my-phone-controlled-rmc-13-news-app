import SwiftUI

struct BeatsView: View {
    @Environment(StudioSession.self) private var session
    @State private var query = ""
    @State private var genre: Genre = .all
    @State private var bpmMin = 70.0
    @State private var bpmMax = 180.0
    @State private var freeOnly = false
    @State private var detailBeat: Beat?

    private var results: [Beat] {
        let lower = min(Int(bpmMin), Int(bpmMax))
        let upper = max(Int(bpmMin), Int(bpmMax))
        return StudioLogic.filteredBeats(
            session.catalog,
            query: query,
            genre: genre,
            bpm: lower...upper,
            freeOnly: freeOnly
        )
    }

    var body: some View {
        NavigationStack {
            StudioScreen {
                ScrollView {
                    VStack(alignment: .leading, spacing: 16) {
                        filterBar
                        if results.isEmpty {
                            ContentUnavailableView("No beats match", systemImage: "waveform.slash", description: Text("Clear a filter or search another tag."))
                                .foregroundStyle(.white)
                        } else {
                            LazyVStack(spacing: 14) {
                                ForEach(results) { beat in
                                    BeatCardView(beat: beat, queue: results, showsLicense: true) {
                                        detailBeat = beat
                                    }
                                }
                            }
                        }
                    }
                    .padding(16)
                }
            }
            .navigationTitle("Beats")
            .sheet(item: $detailBeat) { beat in
                BeatDetailView(beat: beat)
                    .environment(session)
            }
        }
        .onAppear {
            if session.beatsFreeOnly {
                freeOnly = true
                session.beatsFreeOnly = false
            }
        }
        .onChange(of: session.beatsFreeOnly) { _, isOn in
            if isOn {
                freeOnly = true
                session.beatsFreeOnly = false
            }
        }
    }

    private var filterBar: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Image(systemName: "magnifyingglass")
                    .foregroundStyle(StudioTheme.muted)
                TextField("Search title or tags", text: $query)
                    .textInputAutocapitalization(.never)
                    .autocorrectionDisabled()
            }
            .padding(12)
            .background(StudioTheme.card, in: RoundedRectangle(cornerRadius: 14, style: .continuous))
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 8) {
                    ForEach(Genre.allCases) { item in
                        FilterPill(title: item.rawValue, isSelected: genre == item) {
                            genre = item
                        }
                    }
                }
            }
            VStack(alignment: .leading, spacing: 6) {
                Text("BPM \(Int(min(bpmMin, bpmMax)))–\(Int(max(bpmMin, bpmMax)))")
                    .font(.caption.weight(.semibold))
                    .foregroundStyle(StudioTheme.muted)
                Slider(value: $bpmMin, in: 70...180, step: 1)
                Slider(value: $bpmMax, in: 70...180, step: 1)
            }
            .tint(StudioTheme.cyan)
            Toggle("Free Only", isOn: $freeOnly)
                .tint(StudioTheme.cyan)
        }
    }
}

#Preview {
    BeatsView()
        .environment(StudioSession.preview)
}
