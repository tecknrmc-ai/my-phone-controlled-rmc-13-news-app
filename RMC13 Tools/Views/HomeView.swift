import SwiftUI

struct ToolsHomeView: View {
    @Environment(StudioSession.self) private var session
    @State private var category: NewsCategory = .all
    @State private var selectedPost: NewsPost?

    private var posts: [NewsPost] {
        category == .all ? session.news : session.news.filter { $0.category == category }
    }

    var body: some View {
        NavigationStack {
            StudioScreen {
                ScrollView {
                    VStack(alignment: .leading, spacing: 22) {
                        hero
                        quickActions
                        newBeatsRow
                        newsHeader
                        newsList
                    }
                    .padding(.bottom, 24)
                }
            }
            .navigationTitle("RMC13 Tools")
            .sheet(item: $selectedPost) { post in
                NewsDetailView(post: post)
            }
        }
    }

    private var hero: some View {
        TabView {
            ForEach(session.heroes) { slide in
                ZStack(alignment: .bottomLeading) {
                    BeatArtwork(name: slide.artworkName)
                    LinearGradient(
                        colors: [.clear, .black.opacity(0.15), StudioTheme.background],
                        startPoint: .top,
                        endPoint: .bottom
                    )
                    VStack(alignment: .leading, spacing: 10) {
                        Text(slide.badge)
                            .font(.caption.weight(.bold))
                            .padding(.horizontal, 10)
                            .padding(.vertical, 5)
                            .background(StudioTheme.purple, in: Capsule())
                        Text(slide.title)
                            .font(.title.bold())
                        Text(slide.subtitle)
                            .font(.subheadline)
                            .foregroundStyle(.white.opacity(0.86))
                        Button(slide.cta) { run(slide.action) }
                            .font(.headline)
                            .padding(.horizontal, 16)
                            .padding(.vertical, 10)
                            .background(StudioTheme.cyan, in: Capsule())
                            .foregroundStyle(.black)
                    }
                    .padding(20)
                    .foregroundStyle(.white)
                }
                .clipShape(RoundedRectangle(cornerRadius: 0))
            }
        }
        .tabViewStyle(.page(indexDisplayMode: .automatic))
        .frame(height: 430)
    }

    private var quickActions: some View {
        HStack(spacing: 12) {
            quickCard(title: "Create a Press Release", symbol: "newspaper.fill", tint: StudioTheme.purple) {
                session.selectedTab = .press
            }
            quickCard(title: "Browse Free Beats", symbol: "waveform", tint: StudioTheme.cyan) {
                session.beatsFreeOnly = true
                session.selectedTab = .beats
            }
        }
        .padding(.horizontal, 16)
    }

    private var newBeatsRow: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text("New Beats")
                    .font(.title3.bold())
                Spacer()
                Button("See all") { session.selectedTab = .beats }
                    .font(.subheadline.weight(.semibold))
                    .foregroundStyle(StudioTheme.cyan)
            }
            .padding(.horizontal, 16)
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 14) {
                    ForEach(session.catalog) { beat in
                        BeatCardView(beat: beat, queue: session.catalog)
                            .frame(width: 220)
                    }
                }
                .padding(.horizontal, 16)
            }
        }
    }

    private var newsHeader: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Updates & News")
                .font(.title3.bold())
                .padding(.horizontal, 16)
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 8) {
                    ForEach(NewsCategory.allCases) { item in
                        FilterPill(title: item.rawValue, isSelected: category == item) {
                            category = item
                        }
                    }
                }
                .padding(.horizontal, 16)
            }
        }
    }

    private var newsList: some View {
        VStack(spacing: 12) {
            ForEach(posts) { post in
                Button {
                    selectedPost = post
                } label: {
                    HStack(alignment: .top, spacing: 12) {
                        BeatArtwork(name: post.artworkName)
                            .frame(width: 92, height: 92)
                            .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
                        VStack(alignment: .leading, spacing: 6) {
                            HStack {
                                Text(post.category.rawValue.uppercased())
                                    .font(.caption2.weight(.bold))
                                    .foregroundStyle(StudioTheme.cyan)
                                if let badge = post.badge {
                                    Text(badge)
                                        .font(.caption2.weight(.bold))
                                        .padding(.horizontal, 6)
                                        .padding(.vertical, 2)
                                        .background(StudioTheme.purple, in: Capsule())
                                }
                            }
                            Text(post.title)
                                .font(.headline)
                                .foregroundStyle(.white)
                                .multilineTextAlignment(.leading)
                            Text(post.excerpt)
                                .font(.caption)
                                .foregroundStyle(StudioTheme.muted)
                                .lineLimit(2)
                                .multilineTextAlignment(.leading)
                            Text("\(post.publishedAt.formatted(date: .abbreviated, time: .omitted)) · \(post.minutes) min read")
                                .font(.caption2)
                                .foregroundStyle(StudioTheme.muted)
                        }
                        Spacer(minLength: 0)
                    }
                    .padding(12)
                    .background(StudioTheme.card, in: RoundedRectangle(cornerRadius: 18, style: .continuous))
                }
                .buttonStyle(.plain)
            }
        }
        .padding(.horizontal, 16)
    }

    private func quickCard(title: String, symbol: String, tint: Color, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            VStack(alignment: .leading, spacing: 12) {
                Image(systemName: symbol)
                    .font(.title2)
                    .foregroundStyle(tint)
                Text(title)
                    .font(.subheadline.weight(.semibold))
                    .foregroundStyle(.white)
                    .multilineTextAlignment(.leading)
            }
            .frame(maxWidth: .infinity, minHeight: 110, alignment: .leading)
            .padding(14)
            .background(StudioTheme.card, in: RoundedRectangle(cornerRadius: 18, style: .continuous))
        }
        .buttonStyle(.plain)
    }

    private func run(_ action: HeroSlide.Action) {
        switch action {
        case .playBeat(let id):
            guard let beat = session.beat(id) else { return }
            session.presentPlayer(beat, queue: session.catalog)
        case .openPress:
            session.selectedTab = .press
        case .openFreeBeats:
            session.beatsFreeOnly = true
            session.selectedTab = .beats
        }
    }
}

#Preview {
    ToolsHomeView()
        .environment(StudioSession.preview)
}
