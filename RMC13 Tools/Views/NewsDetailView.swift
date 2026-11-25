import SwiftUI

struct NewsDetailView: View {
    let post: NewsPost
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 16) {
                    BeatArtwork(name: post.artworkName)
                        .frame(height: 240)
                        .clipShape(RoundedRectangle(cornerRadius: 22, style: .continuous))
                    HStack {
                        Text(post.category.rawValue)
                            .font(.caption.weight(.bold))
                            .foregroundStyle(StudioTheme.cyan)
                        if let badge = post.badge {
                            Text(badge)
                                .font(.caption2.weight(.bold))
                                .padding(.horizontal, 8)
                                .padding(.vertical, 4)
                                .background(StudioTheme.purple, in: Capsule())
                        }
                    }
                    Text(post.title)
                        .font(.title.bold())
                    Text("\(post.publishedAt.formatted(date: .abbreviated, time: .shortened)) · \(post.minutes) min read")
                        .font(.caption)
                        .foregroundStyle(StudioTheme.muted)
                    Text(post.body)
                        .font(.body)
                        .foregroundStyle(.white.opacity(0.92))
                        .lineSpacing(4)
                }
                .padding(20)
                .foregroundStyle(.white)
            }
            .background(StudioTheme.background.ignoresSafeArea())
            .navigationTitle("RMC13 News")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button("Done") { dismiss() }
                }
            }
        }
        .preferredColorScheme(.dark)
    }
}

#Preview {
    NewsDetailView(post: MockCatalog.news[0])
}
