import SwiftUI
import UIKit

struct BeatDetailView: View {
    let beat: Beat
    @Environment(StudioSession.self) private var session
    @Environment(\.dismiss) private var dismiss
    @State private var license: LicenseTier = .mp3Lease
    @State private var confirmed = false

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 18) {
                    BeatArtwork(name: beat.artworkName)
                        .frame(height: 280)
                        .clipShape(RoundedRectangle(cornerRadius: 24, style: .continuous))
                    HStack {
                        VStack(alignment: .leading, spacing: 4) {
                            Text(beat.title)
                                .font(.title.bold())
                            Text("\(beat.producer) · \(beat.genre.rawValue)")
                                .foregroundStyle(StudioTheme.muted)
                        }
                        Spacer()
                        PriceBadge(label: beat.priceLabel)
                    }
                    Text("\(beat.bpm) BPM · \(beat.musicalKey)")
                        .font(.subheadline.weight(.semibold))
                        .foregroundStyle(StudioTheme.cyan)
                    WaveformView(
                        seed: beat.id,
                        progress: session.player.current?.id == beat.id ? session.player.currentTime / max(session.player.duration, 0.1) : 0.35
                    )
                    Text(beat.summary)
                        .foregroundStyle(.white.opacity(0.9))
                    Text("License")
                        .font(.headline)
                    ForEach(LicenseTier.allCases) { tier in
                        Button {
                            license = tier
                        } label: {
                            HStack(alignment: .top, spacing: 12) {
                                Image(systemName: license == tier ? "checkmark.circle.fill" : "circle")
                                    .foregroundStyle(license == tier ? StudioTheme.cyan : StudioTheme.muted)
                                VStack(alignment: .leading, spacing: 4) {
                                    Text(tier.rawValue)
                                        .font(.headline)
                                    Text(tier.blurb)
                                        .font(.caption)
                                        .foregroundStyle(StudioTheme.muted)
                                        .multilineTextAlignment(.leading)
                                }
                                Spacer()
                            }
                            .padding(14)
                            .background(StudioTheme.card, in: RoundedRectangle(cornerRadius: 16, style: .continuous))
                            .overlay(
                                RoundedRectangle(cornerRadius: 16, style: .continuous)
                                    .stroke(license == tier ? StudioTheme.cyan : Color.clear, lineWidth: 1.5)
                            )
                        }
                        .buttonStyle(.plain)
                    }
                    VStack(alignment: .leading, spacing: 6) {
                        Text("Included")
                            .font(.headline)
                        Label("Audio file", systemImage: "waveform")
                        Label("High-Res Cover Art", systemImage: "photo")
                        if license == .trackout {
                            Label("Trackout notes", systemImage: "list.bullet")
                        }
                    }
                    .foregroundStyle(.white)
                    if confirmed || session.owns(beat.id) {
                        Label(confirmed ? "Added to your vault" : "Already in your vault", systemImage: "checkmark.seal.fill")
                            .font(.headline)
                            .foregroundStyle(StudioTheme.cyan)
                    }
                    Button(action: checkout) {
                        Text(buttonTitle)
                            .font(.headline)
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(StudioTheme.accentGradient, in: RoundedRectangle(cornerRadius: 16, style: .continuous))
                            .foregroundStyle(.white)
                    }
                    .buttonStyle(.plain)
                    .disabled(session.owns(beat.id))
                }
                .padding(20)
                .foregroundStyle(.white)
            }
            .background(StudioTheme.background.ignoresSafeArea())
            .navigationTitle("Beat")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Close") { dismiss() }
                }
                ToolbarItem(placement: .primaryAction) {
                    Button {
                        session.presentPlayer(beat, queue: session.catalog)
                    } label: {
                        Image(systemName: "play.fill")
                    }
                    .accessibilityLabel("Play \(beat.title)")
                }
            }
        }
        .preferredColorScheme(.dark)
    }

    private var buttonTitle: String {
        if session.owns(beat.id) { return "In Your Vault" }
        return beat.isFree ? "Get Free" : "Purchase Beat · \(beat.priceLabel)"
    }

    private func checkout() {
        guard !session.owns(beat.id) else { return }
        session.acquire(beat, license: license)
        withAnimation { confirmed = true }
        UIImpactFeedbackGenerator(style: .medium).impactOccurred()
    }
}

#Preview {
    BeatDetailView(beat: MockCatalog.beats[0])
        .environment(StudioSession.preview)
}
