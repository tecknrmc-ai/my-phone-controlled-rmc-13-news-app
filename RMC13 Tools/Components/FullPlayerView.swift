import SwiftUI

struct MiniPlayerBar: View {
    @Environment(StudioSession.self) private var session

    var body: some View {
        if let beat = session.player.current {
            HStack(spacing: 12) {
                BeatArtwork(name: beat.artworkName)
                    .frame(width: 44, height: 44)
                    .clipShape(RoundedRectangle(cornerRadius: 8, style: .continuous))
                VStack(alignment: .leading, spacing: 2) {
                    Text(beat.title)
                        .font(.subheadline.weight(.semibold))
                        .foregroundStyle(.white)
                        .lineLimit(1)
                    Text("\(beat.producer) · \(beat.bpm) BPM")
                        .font(.caption)
                        .foregroundStyle(StudioTheme.muted)
                        .lineLimit(1)
                }
                Spacer()
                Button {
                    session.player.toggle()
                } label: {
                    Image(systemName: session.player.isPlaying ? "pause.fill" : "play.fill")
                        .font(.title3)
                        .foregroundStyle(.white)
                        .frame(width: 36, height: 36)
                }
                .buttonStyle(.plain)
                .accessibilityLabel(session.player.isPlaying ? "Pause" : "Play")
            }
            .padding(.horizontal, 12)
            .padding(.vertical, 8)
            .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 16, style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .stroke(StudioTheme.purple.opacity(0.45), lineWidth: 1)
            )
            .contentShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
            .onTapGesture {
                session.playerSheet = true
            }
            .padding(.horizontal, 12)
            .accessibilityElement(children: .combine)
            .accessibilityAddTraits(.isButton)
            .accessibilityLabel("Now playing \(beat.title)")
        }
    }
}

struct FullPlayerView: View {
    @Environment(StudioSession.self) private var session
    @Environment(\.dismiss) private var dismiss
    @State private var showDetail = false

    var body: some View {
        NavigationStack {
            Group {
                if let beat = session.player.current {
                    playerBody(beat)
                } else {
                    ContentUnavailableView("Nothing queued", systemImage: "waveform", description: Text("Tap a beat to open the player."))
                }
            }
            .background(StudioTheme.background.ignoresSafeArea())
            .navigationTitle("Now Playing")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Close") { dismiss() }
                }
            }
        }
        .presentationDetents([.large])
        .presentationDragIndicator(.visible)
        .preferredColorScheme(.dark)
        .sheet(isPresented: $showDetail) {
            if let beat = session.player.current {
                BeatDetailView(beat: beat)
                    .environment(session)
            }
        }
    }

    private func playerBody(_ beat: Beat) -> some View {
        ScrollView {
            VStack(spacing: 22) {
                BeatArtwork(name: beat.artworkName)
                    .frame(width: 280, height: 280)
                    .clipShape(RoundedRectangle(cornerRadius: 28, style: .continuous))
                    .shadow(color: StudioTheme.purple.opacity(0.45), radius: 24, y: 12)
                VStack(spacing: 6) {
                    Text(beat.title)
                        .font(.title.bold())
                        .foregroundStyle(.white)
                    Text("\(beat.producer) · \(beat.genre.rawValue)")
                        .foregroundStyle(StudioTheme.muted)
                    Text("\(beat.bpm) BPM · \(beat.musicalKey)")
                        .font(.subheadline.weight(.semibold))
                        .foregroundStyle(StudioTheme.cyan)
                }
                WaveformView(seed: beat.id, progress: progress)
                    .padding(.horizontal, 24)
                VStack(spacing: 6) {
                    Slider(
                        value: Binding(
                            get: { session.player.currentTime },
                            set: { session.player.seek(to: $0) }
                        ),
                        in: 0...max(session.player.duration, 0.1)
                    )
                    .tint(StudioTheme.cyan)
                    HStack {
                        Text(clock(session.player.currentTime))
                        Spacer()
                        Text(clock(session.player.duration))
                    }
                    .font(.caption.monospacedDigit())
                    .foregroundStyle(StudioTheme.muted)
                }
                .padding(.horizontal, 24)
                HStack(spacing: 22) {
                    transport("backward.end.fill") { session.player.previous() }
                    transport("gobackward.15") { session.player.skip(by: -15) }
                    Button {
                        session.player.toggle()
                    } label: {
                        Image(systemName: session.player.isPlaying ? "pause.fill" : "play.fill")
                            .font(.title)
                            .foregroundStyle(.black)
                            .frame(width: 72, height: 72)
                            .background(StudioTheme.accentGradient, in: Circle())
                    }
                    .buttonStyle(.plain)
                    .accessibilityLabel(session.player.isPlaying ? "Pause" : "Play")
                    transport("goforward.15") { session.player.skip(by: 15) }
                    transport("forward.end.fill") { session.player.next() }
                }
                HStack {
                    Image(systemName: "speaker.fill")
                    Slider(
                        value: Binding(
                            get: { session.player.volume },
                            set: { session.player.setVolume($0) }
                        ),
                        in: 0...1
                    )
                    .tint(StudioTheme.purple)
                    Image(systemName: "speaker.wave.3.fill")
                }
                .foregroundStyle(StudioTheme.muted)
                .padding(.horizontal, 24)
                Toggle(isOn: Binding(
                    get: { session.player.isLooping },
                    set: { session.player.setLooping($0) }
                )) {
                    Label("Loop preview", systemImage: "repeat")
                }
                .tint(StudioTheme.cyan)
                .padding(.horizontal, 24)
                Button {
                    showDetail = true
                } label: {
                    Text(session.owns(beat.id) ? "View license & files" : (beat.isFree ? "Get Free" : "Purchase Beat"))
                        .font(.headline)
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(StudioTheme.accentGradient, in: RoundedRectangle(cornerRadius: 16, style: .continuous))
                        .foregroundStyle(.white)
                }
                .buttonStyle(.plain)
                .padding(.horizontal, 24)
                Text(beat.summary)
                    .font(.subheadline)
                    .foregroundStyle(StudioTheme.muted)
                    .multilineTextAlignment(.center)
                    .padding(.horizontal, 28)
            }
            .padding(.vertical, 12)
        }
    }

    private var progress: Double {
        guard session.player.duration > 0 else { return 0 }
        return session.player.currentTime / session.player.duration
    }

    private func transport(_ symbol: String, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            Image(systemName: symbol)
                .font(.title3)
                .foregroundStyle(.white)
                .frame(width: 44, height: 44)
        }
        .buttonStyle(.plain)
    }

    private func clock(_ time: TimeInterval) -> String {
        let total = max(0, Int(time.rounded()))
        return String(format: "%d:%02d", total / 60, total % 60)
    }
}
