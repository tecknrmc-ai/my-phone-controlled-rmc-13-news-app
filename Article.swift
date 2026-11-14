import SwiftUI

struct NewsArticlesView: View {
    @ObservedObject private var library = FeedLibrary.shared
    @ObservedObject private var videos = VideoLibrary.shared

    var body: some View {
        NavigationStack {
            List {
                if !videos.clips(in: .articles).isEmpty {
                    Section {
                        SharedVideoLaneView(lane: .articles)
                            .padding(.vertical, 8)
                    }
                    .listRowInsets(EdgeInsets())
                    .listRowBackground(Color.clear)
                }

                if library.post("article-featured") != nil {
                    Section {
                        FeedPhotoFrame(postKey: "article-featured")
                            .padding(.vertical, 8)
                    }
                    .listRowInsets(EdgeInsets())
                    .listRowBackground(Color.clear)
                }

                if library.post("article-legends") != nil {
                    Section("Legends Expansion") {
                        VStack(alignment: .leading, spacing: 8) {
                            ZStack(alignment: .topTrailing) {
                                NavigationLink {
                                    ArticleDetailView(postKey: "article-legends")
                                } label: {
                                    FeedImage(postKey: "article-legends", showsFitBar: false)
                                        .goldTrim()
                                }
                                .buttonStyle(.plain)
                                FeedPostMenu(postKey: "article-legends")
                                    .padding(8)
                            }
                            NavigationLink {
                                ArticleDetailView(postKey: "article-legends")
                            } label: {
                                VStack(alignment: .leading, spacing: 4) {
                                    PosterTitle(text: library.post("article-legends")?.title ?? "Legends of Glory", size: 26)
                                    Text("Source: rmcglobal")
                                        .font(.caption)
                                        .foregroundColor(RMCTheme.gold)
                                }
                            }
                            .buttonStyle(.plain)
                            FitChoiceBar(postKey: "article-legends")
                        }
                        .padding(.vertical, 8)
                    }
                    .listRowInsets(EdgeInsets())
                    .listRowBackground(Color.clear)
                }

                Section("All News Articles") {
                    ForEach(library.ordered(FeedLibrary.articleIDs)) { article in
                        HStack(alignment: .top, spacing: 8) {
                            NavigationLink {
                                ArticleDetailView(postKey: article.id)
                            } label: {
                                HStack(alignment: .top, spacing: 12) {
                                    Image(systemName: article.imageName)
                                        .font(.title)
                                        .foregroundColor(RMCTheme.gold)
                                        .frame(width: 44, height: 44)
                                        .background(RMCTheme.obsidianSoft)
                                        .overlay(
                                            RoundedRectangle(cornerRadius: 8)
                                                .stroke(RMCTheme.gold.opacity(0.5), lineWidth: 1)
                                        )
                                        .cornerRadius(8)

                                    VStack(alignment: .leading, spacing: 4) {
                                        PosterTitle(text: article.title, size: 22)
                                        Text(article.body)
                                            .font(.subheadline)
                                            .foregroundColor(RMCTheme.muted)
                                            .lineLimit(2)
                                        Text("Source: \(article.subtitle)")
                                            .font(.caption)
                                            .foregroundColor(RMCTheme.gold)
                                    }
                                }
                            }
                            .buttonStyle(.plain)
                            FeedPostMenu(postKey: article.id)
                        }
                        .padding(.vertical, 4)
                    }
                }
            }
            .listStyle(.insetGrouped)
            .scrollContentBackground(.hidden)
            .background(RMCTheme.obsidian)
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
            .safeAreaInset(edge: .top, spacing: 0) {
                RMCSeasonBar()
            }
        }
    }
}

// MARK: - Reusable Article Detail View
struct ArticleDetailView: View {
    var postKey: String? = nil
    var title: String = ""
    var source: String = ""
    var imageName: String = ""
    var isSystemImage: Bool = false
    var content: String = ""

    @ObservedObject private var library = FeedLibrary.shared

    private var resolvedTitle: String { live?.title ?? title }
    private var resolvedSource: String { live?.subtitle ?? source }
    private var resolvedImage: String { live?.imageName ?? imageName }
    private var resolvedSystem: Bool { live?.isSystemImage ?? isSystemImage }
    private var resolvedBody: String { live?.body ?? content }
    private var live: FeedPost? {
        guard let postKey else { return nil }
        return library.post(postKey)
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                if let postKey, library.post(postKey) == nil {
                    PosterTitle(text: "This post was removed.", size: 28)
                } else {
                    if let postKey, !resolvedSystem {
                        ZStack(alignment: .topTrailing) {
                            FeedImage(postKey: postKey)
                                .goldTrim()
                            FeedPostMenu(postKey: postKey)
                                .padding(8)
                        }
                    } else if resolvedSystem {
                        Image(systemName: resolvedImage)
                            .font(.system(size: 60))
                            .foregroundColor(RMCTheme.gold)
                            .frame(maxWidth: .infinity, alignment: .center)
                            .padding()
                    } else {
                        Image(resolvedImage)
                            .resizable()
                            .aspectRatio(contentMode: .fit)
                            .frame(maxWidth: .infinity)
                            .goldTrim()
                    }

                    PosterTitle(text: resolvedTitle, size: 34)

                    Text("By \(resolvedSource)")
                        .font(.subheadline)
                        .foregroundColor(RMCTheme.gold)

                    Rectangle()
                        .fill(RMCTheme.gold.opacity(0.35))
                        .frame(height: 0.6)

                    Text(resolvedBody)
                        .font(.body)
                        .foregroundColor(RMCTheme.muted)
                }
            }
            .padding()
        }
        .navigationBarTitleDisplayMode(.inline)
        .rmcScreen()
    }
}

// MARK: - Preview Engine Setup
#Preview {
    NewsArticlesView()
}

