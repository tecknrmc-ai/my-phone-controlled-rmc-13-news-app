import SwiftUI

struct NewsArticlesView: View {
    var body: some View {
        NavigationStack {
            List {
                // MARK: - Top Main Featured Hero
                Section {
                    VStack(alignment: .leading, spacing: 8) {
                            Image("RMC13_MAin")
                            .resizable()
                            .aspectRatio(contentMode: .fill)
                            .frame(height: 200)
                            .clipped()
                            .goldTrim()
                        
                        Text("FEATURED: Global Node Infrastructure Upgrade")
                            .font(.title2)
                            .fontWeight(.light)
                            .foregroundColor(RMCTheme.ivory)
                            .padding(.top, 4)
                        
                        Text("Deep dive into the architecture optimizations powering the next generation sandbox servers.")
                            .font(.subheadline)
                            .foregroundColor(RMCTheme.muted)
                            .lineLimit(2)
                    }
                    .padding(.vertical, 8)
                }
                .listRowInsets(EdgeInsets())
                .listRowBackground(Color.clear)
                
                // MARK: - Secondary Sections Matching Home Layout
                Section("Legends Expansion") {
                    NavigationLink(destination: ArticleDetailView(
                        title: "Legends of glory",
                        source: "rmcglobal",
                        imageName: "Legends_Glory",
                        isSystemImage: false,
                        content: "Glory battle artist join rmc13 for a huge battle. Experience the expansion mechanics and unique rewards dropping in this rotation."
                    )) {
                        VStack(alignment: .leading, spacing: 8) {
                            Image("Legends_Glory")
                                .resizable()
                                .aspectRatio(contentMode: .fill)
                                .frame(height: 160)
                                .clipped()
                                .cornerRadius(12)
                            
                            Text("rmc13 prepares full scale legends of glory drop")
                                .font(.headline)
                                .foregroundColor(RMCTheme.ivory)
                            
                            Text("Source: rmcglobal")
                                .font(.caption)
                                .foregroundColor(RMCTheme.gold)
                        }
                        .padding(.vertical, 8)
                    }
                }
                .listRowInsets(EdgeInsets())
                .listRowBackground(Color.clear)
                
                // MARK: - Main Articles List
                Section("All News Articles") {
                    ForEach(ArticlesDataStore.articles) { article in
                        NavigationLink(destination: ArticleDetailView(
                            title: article.title,
                            source: article.source,
                            imageName: article.imageName,
                            isSystemImage: true,
                            content: article.content
                        )) {
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
                                    Text(article.title)
                                        .font(.headline)
                                        .foregroundColor(RMCTheme.ivory)
                                        .lineLimit(2)
                                    
                                    Text(article.description)
                                        .font(.subheadline)
                                        .foregroundColor(RMCTheme.muted)
                                        .lineLimit(2)
                                    
                                    Text("Source: \(article.source)")
                                        .font(.caption)
                                        .foregroundColor(RMCTheme.gold)
                                }
                            }
                            .padding(.vertical, 4)
                        }
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
        }
    }
}

// MARK: - Reusable Article Detail View
struct ArticleDetailView: View {
    let title: String
    let source: String
    let imageName: String
    let isSystemImage: Bool
    let content: String
    
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                if isSystemImage {
                    Image(systemName: imageName)
                        .font(.system(size: 60))
                        .foregroundColor(RMCTheme.gold)
                        .frame(maxWidth: .infinity, alignment: .center)
                        .padding()
                } else {
                    Image(imageName)
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(maxWidth: .infinity)
                        .goldTrim()
                }
                
                Text(title)
                    .font(.title)
                    .fontWeight(.light)
                    .foregroundColor(RMCTheme.ivory)
                
                Text("By \(source)")
                    .font(.subheadline)
                    .foregroundColor(RMCTheme.gold)
                
                Rectangle()
                    .fill(RMCTheme.gold.opacity(0.35))
                    .frame(height: 0.6)
                
                Text(content)
                    .font(.body)
                    .foregroundColor(RMCTheme.muted)
            }
            .padding()
        }
        .navigationBarTitleDisplayMode(.inline)
        .rmcScreen()
    }
}

// MARK: - Local Data Blueprint
struct AppArticleItem: Identifiable {
    let id = UUID()
    let title: String
    let description: String
    let source: String
    let imageName: String
    let content: String
}

// MARK: - Isolated Articles Data Store
struct ArticlesDataStore {
    static let articles: [AppArticleItem] = [
        AppArticleItem(
            title: "Global Node Optimizations",
            description: "Network response speeds reach record efficiency thresholds across infrastructure nodes.",
            source: "RMC Engine Dev",
            imageName: "cpu",
            content: "Full-scale optimizations inside core system algorithms have dropped interface latency down significantly."
        ),
        AppArticleItem(
            title: "Community Roadmap Revealed",
            description: "Upcoming features prioritize user-generated asset sharing and customization layouts.",
            source: "RMC Comms",
            imageName: "map",
            content: "The dynamic sandbox framework expansion paths will unveil fully localized customization hubs next sprint."
        ),
        AppArticleItem(
            title: "Server Maintenance Schedule",
            description: "Upcoming brief downtime window for database clustering updates.",
            source: "RMC SysOps",
            imageName: "clock",
            content: "Scheduled clustering migrations will happen during off-peak weekend hours to ensure operational safety parameters."
        )
    ]
}

// MARK: - Preview Engine Setup
#Preview {
    NewsArticlesView()
}

