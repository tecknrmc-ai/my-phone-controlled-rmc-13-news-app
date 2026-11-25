import SwiftUI

struct WaveformView: View {
    let seed: String
    var progress: Double

    var body: some View {
        HStack(alignment: .center, spacing: 3) {
            ForEach(0..<40, id: \.self) { index in
                RoundedRectangle(cornerRadius: 2, style: .continuous)
                    .fill(index < Int(progress * 40) ? StudioTheme.cyan : Color.white.opacity(0.28))
                    .frame(height: height(index))
            }
        }
        .frame(height: 56)
    }

    private func height(_ index: Int) -> CGFloat {
        var hasher = Hasher()
        hasher.combine(seed)
        hasher.combine(index)
        let value = abs(hasher.finalize() % 100)
        return CGFloat(16 + value % 40)
    }
}

struct BeatCardView: View {
    let beat: Beat
    let queue: [Beat]
    var showsLicense: Bool = false
    var onLicense: (() -> Void)?

    @Environment(StudioSession.self) private var session

    private var isCurrent: Bool { session.player.current?.id == beat.id }

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            ZStack(alignment: .bottomLeading) {
                BeatArtwork(name: beat.artworkName)
                    .frame(height: 168)
                    .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
                HStack {
                    Button {
                        if isCurrent {
                            session.player.toggle()
                        } else {
                            session.presentPlayer(beat, queue: queue)
                        }
                    } label: {
                        Image(systemName: isCurrent && session.player.isPlaying ? "pause.fill" : "play.fill")
                            .font(.headline)
                            .foregroundStyle(.black)
                            .frame(width: 36, height: 36)
                            .background(StudioTheme.cyan, in: Circle())
                    }
                    .buttonStyle(.plain)
                    .accessibilityLabel(isCurrent && session.player.isPlaying ? "Pause \(beat.title)" : "Play \(beat.title)")
                    Spacer()
                    PriceBadge(label: beat.priceLabel)
                }
                .padding(10)
            }
            .contentShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
            .onTapGesture {
                session.presentPlayer(beat, queue: queue)
            }

            VStack(alignment: .leading, spacing: 6) {
                Text(beat.title)
                    .font(.headline)
                    .foregroundStyle(.white)
                    .lineLimit(1)
                Text("\(beat.producer) · \(beat.bpm) BPM · \(beat.musicalKey)")
                    .font(.caption)
                    .foregroundStyle(StudioTheme.muted)
                    .lineLimit(1)
                Text(beat.genre.rawValue)
                    .font(.caption2.weight(.bold))
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(StudioTheme.purple.opacity(0.25), in: Capsule())
                    .foregroundStyle(StudioTheme.cyan)
            }
            .contentShape(Rectangle())
            .onTapGesture {
                session.presentPlayer(beat, queue: queue)
            }
            if showsLicense, let onLicense {
                Button("License & files", action: onLicense)
                    .font(.caption.weight(.semibold))
                    .foregroundStyle(StudioTheme.cyan)
            }
        }
        .padding(12)
        .background(StudioTheme.card, in: RoundedRectangle(cornerRadius: 20, style: .continuous))
    }
}
