import SwiftUI

struct FlashyCarouselView: View {
    var title: String? = "Featured Highlights"
    var items: [CarouselItem] = CarouselItem.previewSamples
    var cardWidth: CGFloat = 280
    var cardHeight: CGFloat = 380
    var horizontalPadding: CGFloat = 24

    @ObservedObject private var library = FeedLibrary.shared

    private var visibleItems: [CarouselItem] {
        items.filter { item in
            guard let postKey = item.postKey else { return true }
            return library.post(postKey) != nil
        }
    }

    var body: some View {
        let shown = visibleItems
        if !shown.isEmpty {
            VStack(alignment: .leading, spacing: 8) {
                if let title, !title.isEmpty {
                    PosterTitle(text: title, size: 26, color: RMCTheme.gold)
                        .padding(.horizontal, horizontalPadding)
                }

                ScrollView(.horizontal, showsIndicators: false) {
                    LazyHStack(alignment: .top, spacing: -10) {
                        ForEach(shown) { card in
                            carouselCard(card)
                                .frame(width: cardWidth, height: height(for: card))
                                .scrollTransition(.interactive, axis: .horizontal) { content, phase in
                                    content
                                        .scaleEffect(phase.isIdentity ? 1.0 : 0.88)
                                        .opacity(phase.isIdentity ? 1.0 : 0.6)
                                        .rotation3DEffect(
                                            .degrees(phase.value * -18),
                                            axis: (x: 0, y: 1, z: 0),
                                            perspective: 0.5
                                        )
                                }
                        }
                    }
                    .scrollTargetLayout()
                    .padding(.horizontal, horizontalPadding)
                }
                .scrollTargetBehavior(.viewAligned)
                .frame(height: (shown.map { height(for: $0) }.max() ?? cardHeight) + 20)
            }
        }
    }

    private func height(for card: CarouselItem) -> CGFloat {
        guard let postKey = card.postKey, let post = library.post(postKey) else {
            return cardHeight
        }
        return post.fit.height(for: cardWidth)
    }

    private func resolvedTitle(_ card: CarouselItem) -> String {
        if let postKey = card.postKey, let post = library.post(postKey) {
            return post.title
        }
        return card.title
    }

    @ViewBuilder
    private func carouselCard(_ card: CarouselItem) -> some View {
        let cardSize = height(for: card)
        ZStack(alignment: .bottomLeading) {
            if let postKey = card.postKey {
                FeedImage(postKey: postKey, showsFitBar: false, locksAspect: false)
            } else if let imageName = card.imageName {
                Image(imageName)
                    .resizable()
                    .aspectRatio(contentMode: .fill)
                    .frame(width: cardWidth, height: cardSize)
                    .clipped()
            } else {
                VStack(alignment: .leading) {
                    if let systemImage = card.systemImage {
                        Image(systemName: systemImage)
                            .font(.system(size: 40))
                            .foregroundColor(.white)
                            .padding(.bottom, 8)
                    }
                    PosterTitle(text: card.title, size: 24)
                    Spacer()
                }
                .padding(24)
                .frame(width: cardWidth, height: cardSize)
                .background(
                    RoundedRectangle(cornerRadius: 28)
                        .fill((card.color ?? .gray).gradient)
                )
            }

            if card.imageName != nil || card.postKey != nil {
                LinearGradient(
                    colors: [.clear, .black.opacity(0.78)],
                    startPoint: .center,
                    endPoint: .bottom
                )
                .allowsHitTesting(false)

                VStack(alignment: .leading, spacing: 8) {
                    PosterTitle(text: resolvedTitle(card), size: 26)
                        .shadow(color: .black.opacity(0.85), radius: 3, y: 1)
                    if let postKey = card.postKey {
                        FitChoiceBar(postKey: postKey)
                    }
                }
                .padding(12)
            }
        }
        .overlay(alignment: .topTrailing) {
            if let postKey = card.postKey {
                FeedPostMenu(postKey: postKey)
                    .padding(12)
            }
        }
        .frame(width: cardWidth, height: cardSize)
        .clipShape(RoundedRectangle(cornerRadius: 22, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 22, style: .continuous)
                .stroke(RMCTheme.gold.opacity(0.7), lineWidth: 1.2)
        )
        .shadow(color: RMCTheme.gold.opacity(0.28), radius: 12, x: 0, y: 6)
    }
}

struct CarouselItem: Identifiable {
    let id = UUID()
    let title: String
    var color: Color? = nil
    var imageName: String? = nil
    var systemImage: String? = nil
    var postKey: String? = nil

    init(title: String, color: Color, image: String) {
        self.title = title
        self.color = color
        self.systemImage = image
    }

    init(title: String, imageName: String, postKey: String? = nil) {
        self.title = title
        self.imageName = imageName
        self.postKey = postKey
    }

    static let previewSamples: [CarouselItem] = [
        CarouselItem(title: "Explore Nature", color: .mint, image: "globe"),
        CarouselItem(title: "Tech Trends", color: .purple, image: "cpu"),
        CarouselItem(title: "Fitness Goals", color: .orange, image: "figure.run"),
        CarouselItem(title: "Creative Arts", color: .pink, image: "paintpalette"),
        CarouselItem(title: "Night Life", color: .indigo, image: "moon.stars")
    ]

    static let homeMainStory: [CarouselItem] = [
        CarouselItem(title: "Eric MVP", imageName: "Eric_MVP", postKey: "story-eric"),
        CarouselItem(title: "RMC13 Story", imageName: "Mvp_STORY_MAIN", postKey: "story-main")
    ]

    static let homeHeadliner: [CarouselItem] = [
        CarouselItem(title: "LA Film Mode", imageName: "generated-image-1-41", postKey: "feed-film"),
        CarouselItem(title: "136A Battlezone", imageName: "RMC136AZone_Banner", postKey: "feed-battlezone"),
        CarouselItem(title: "Hyper 3D AI", imageName: "HomeCarousel_Hyper3DAI", postKey: "feed-hyper"),
        CarouselItem(title: "Unreal Community", imageName: "HomeCarousel_UnrealCommunity", postKey: "feed-unreal"),
        CarouselItem(title: "MVP 2012", imageName: "MVP_Main", postKey: "feed-mvp"),
        CarouselItem(title: "Legends of Glory", imageName: "Legends_Glory", postKey: "feed-legends")
    ]

    static let homeHeadlines: [CarouselItem] = [
        CarouselItem(title: "Unreal Community", imageName: "HomeCarousel_UnrealCommunity", postKey: "headline-unreal"),
        CarouselItem(title: "Hyper 3D AI", imageName: "HomeCarousel_Hyper3DAI", postKey: "headline-hyper")
    ]

    static let battleZonePhotos: [CarouselItem] = [
        CarouselItem(title: "Main 6", imageName: "Main6_Battle_Zone"),
        CarouselItem(title: "Main 2", imageName: "Main2_Battle_Zone"),
        CarouselItem(title: "Main 3", imageName: "Main3_Battle_Zone"),
        CarouselItem(title: "Main 4", imageName: "Main4_Battle_Zone"),
        CarouselItem(title: "Main Side", imageName: "Mainside_Battle_Zone"),
        CarouselItem(title: "B-Roll", imageName: "Broll_Battle_Zone"),
        CarouselItem(title: "Teckn", imageName: "Teckn_Battle_Zone"),
        CarouselItem(title: "Teckn 2", imageName: "Teckn2_Battle_Zone"),
        CarouselItem(title: "Tunez", imageName: "Tunez_Battle_Zone"),
        CarouselItem(title: "Tunez Side", imageName: "Tunezside_Battle_Zone"),
        CarouselItem(title: "Harman", imageName: "Harman_Battle_Zone"),
        CarouselItem(title: "Cash", imageName: "Cash_Battle_Zone"),
        CarouselItem(title: "Bob", imageName: "Bob_Battle_Zone"),
        CarouselItem(title: "Bizzy", imageName: "Bizzy_Battle_Zone"),
        CarouselItem(title: "TNT", imageName: "TNT_Battle_Zone"),
        CarouselItem(title: "Nef", imageName: "Nef_Battle_Zone")
    ]
}

#Preview {
    FlashyCarouselView()
        .preferredColorScheme(.dark)
}
