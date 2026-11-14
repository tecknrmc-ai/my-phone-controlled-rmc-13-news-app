import SwiftUI

/// Top bar on the homepage and the main feed. Opens the Season 1 page.
struct RMCSeasonBar: View {
    var body: some View {
        NavigationLink {
            SeasonOneView()
        } label: {
            Text("RMC13Season1")
                .font(.system(size: 12, weight: .semibold))
                .tracking(1.3)
                .foregroundStyle(RMCTheme.gold)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 6)
                .background(Color.black)
                .overlay(alignment: .bottom) {
                    Rectangle()
                        .fill(RMCTheme.gold)
                        .frame(height: 1)
                }
        }
        .buttonStyle(.plain)
        .accessibilityLabel("RMC13 Season 1")
    }
}

/// Season 1: the Legends of Glory poster at full size, then the video trailer.
struct SeasonOneView: View {
    @State private var showTrailer = false

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 0) {
                gloryPoster
                videoTrailerSection
                    .padding(.horizontal, 16)
                    .padding(.top, 20)
                    .padding(.bottom, 32)
            }
        }
        .navigationTitle("Season 1")
        .navigationBarTitleDisplayMode(.inline)
        .rmcScreen()
        .fullScreenCover(isPresented: $showTrailer) {
            SeasonTrailerStage()
        }
    }

    /// Entire poster, edge to edge, at the image's own aspect. No crop.
    private var gloryPoster: some View {
        Image("Legends_Glory")
            .resizable()
            .scaledToFit()
            .frame(maxWidth: .infinity)
            .background(Color.black)
            .overlay(alignment: .bottom) {
                Rectangle()
                    .fill(RMCTheme.gold)
                    .frame(height: 1.5)
            }
            .accessibilityLabel("Legends of Glory poster")
    }

    private var videoTrailerSection: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("VIDEO TRAILER")
                .font(.system(size: 12, weight: .bold))
                .tracking(2.2)
                .foregroundStyle(RMCTheme.gold)

            Button {
                showTrailer = true
            } label: {
                Color.black
                    .aspectRatio(16 / 9, contentMode: .fit)
                    .overlay {
                        Image("Legends_Glory")
                            .resizable()
                            .scaledToFill()
                    }
                    .clipped()
                    .overlay {
                        Circle()
                            .fill(Color.black.opacity(0.62))
                            .frame(width: 68, height: 68)
                            .overlay {
                                Image(systemName: "play.fill")
                                    .font(.system(size: 26, weight: .bold))
                                    .foregroundStyle(RMCTheme.gold)
                                    .offset(x: 2)
                            }
                    }
                    .goldTrim()
            }
            .buttonStyle(.plain)
            .accessibilityLabel("Play Season 1 video trailer")

            Text("Legends of Glory")
                .font(.title3)
                .fontWeight(.light)
                .foregroundStyle(RMCTheme.ivory)

            Text("Season 1 trailer for the Legends of Glory card.")
                .font(.subheadline)
                .foregroundStyle(RMCTheme.muted)
                .fixedSize(horizontal: false, vertical: true)
        }
    }
}

private struct SeasonTrailerStage: View {
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        ZStack {
            Color.black.ignoresSafeArea()
            VStack(spacing: 18) {
                Image("Legends_Glory")
                    .resizable()
                    .scaledToFit()
                    .frame(maxWidth: .infinity)
                    .overlay(alignment: .center) {
                        Image(systemName: "play.circle.fill")
                            .font(.system(size: 64))
                            .symbolRenderingMode(.palette)
                            .foregroundStyle(RMCTheme.gold, Color.black.opacity(0.55))
                    }
                Text("Season 1 trailer")
                    .font(.system(size: 13, weight: .semibold))
                    .tracking(1.6)
                    .textCase(.uppercase)
                    .foregroundStyle(RMCTheme.gold)
            }
            .padding(.horizontal, 12)

            VStack {
                HStack {
                    Spacer()
                    Button {
                        dismiss()
                    } label: {
                        Image(systemName: "xmark")
                            .font(.system(size: 14, weight: .bold))
                            .foregroundStyle(RMCTheme.gold)
                            .frame(width: 36, height: 36)
                            .background(Circle().fill(Color.black.opacity(0.7)))
                            .overlay(Circle().stroke(RMCTheme.gold.opacity(0.8), lineWidth: 1))
                    }
                    .padding()
                    .accessibilityLabel("Close trailer")
                }
                Spacer()
            }
        }
    }
}

#Preview {
    NavigationStack {
        SeasonOneView()
    }
}
