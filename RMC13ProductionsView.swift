import SwiftUI

struct RMC13ProductionsView: View {
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    RMCBrandTitle(size: 40)

                    Text("RMC13PRoductions")
                        .font(.title)
                        .fontWeight(.light)
                        .foregroundColor(RMCTheme.ivory)
                        .frame(maxWidth: .infinity, alignment: .center)

                    Image("RMC13_MAin")
                        .resizable()
                        .aspectRatio(contentMode: .fill)
                        .frame(maxWidth: .infinity)
                        .frame(height: 220)
                        .clipped()
                        .goldTrim()

                    Text("Rmc13 reels in millions of viewers with music and entertainment projects")
                        .font(.title2)
                        .fontWeight(.light)
                        .foregroundColor(RMCTheme.ivory)

                    Text("RMC13 Productions builds original music, film, game, and live entertainment drops that travel across the RMC13 network. This hub is the front door for reels, premieres, and studio news.")
                        .font(.body)
                        .foregroundColor(RMCTheme.muted)
                        .fixedSize(horizontal: false, vertical: true)

                    VStack(alignment: .leading, spacing: 14) {
                        productionRow(title: "Music", detail: "Original records, tips, and playlist features.")
                        productionRow(title: "Entertainment", detail: "Short reels, interviews, and premiere windows.")
                        productionRow(title: "Interactive", detail: "Game campaigns, battlezone events, and community drops.")
                    }
                    .padding()
                    .goldCard()
                }
                .padding()
            }
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .principal) {
                    Text("rmc13")
                        .font(.system(size: 20, weight: .ultraLight, design: .serif))
                        .tracking(4)
                        .foregroundStyle(RMCTheme.goldGradient)
                }
            }
            .rmcScreen()
        }
    }

    private func productionRow(title: String, detail: String) -> some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(title)
                .font(.headline)
                .foregroundColor(RMCTheme.gold)
            Text(detail)
                .font(.subheadline)
                .foregroundColor(RMCTheme.muted)
        }
    }
}

#Preview {
    RMC13ProductionsView()
}
