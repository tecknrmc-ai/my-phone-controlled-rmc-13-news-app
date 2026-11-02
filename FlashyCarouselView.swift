import SwiftUI

struct FlashyCarouselView: View {
    var title: String? = "Featured Highlights"
    var items: [CarouselItem] = CarouselItem.previewSamples
    var cardWidth: CGFloat = 280
    var cardHeight: CGFloat = 380
    var horizontalPadding: CGFloat = 24

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            if let title, !title.isEmpty {
                Text(title)
                    .font(.title2)
                    .fontWeight(.light)
                    .foregroundColor(RMCTheme.gold)
                    .padding(.horizontal, horizontalPadding)
            }

            ScrollView(.horizontal, showsIndicators: false) {
                LazyHStack(spacing: -10) {
                    ForEach(items) { card in
                        carouselCard(card)
                            .frame(width: cardWidth, height: cardHeight)
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
            .frame(height: cardHeight + 20)
        }
    }

    @ViewBuilder
    private func carouselCard(_ card: CarouselItem) -> some View {
        ZStack(alignment: .bottomLeading) {
            if let imageName = card.imageName {
                Image(imageName)
                    .resizable()
                    .aspectRatio(contentMode: .fill)
                    .frame(width: cardWidth, height: cardHeight)
                    .clipped()

                LinearGradient(
                    colors: [.clear, .black.opacity(0.72)],
                    startPoint: .center,
                    endPoint: .bottom
                )

                Text(card.title)
                    .font(.title3)
                    .bold()
                    .foregroundColor(.white)
                    .padding(20)
            } else {
                VStack(alignment: .leading) {
                    if let systemImage = card.systemImage {
                        Image(systemName: systemImage)
                            .font(.system(size: 40))
                            .foregroundColor(.white)
                            .padding(.bottom, 8)
                    }

                    Text(card.title)
                        .font(.title3)
                        .bold()
                        .foregroundColor(.white)

                    Spacer()
                }
                .padding(24)
                .frame(width: cardWidth, height: cardHeight)
                .background(
                    RoundedRectangle(cornerRadius: 28)
                        .fill((card.color ?? .gray).gradient)
                )
            }
        }
        .frame(width: cardWidth, height: cardHeight)
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

    init(title: String, color: Color, image: String) {
        self.title = title
        self.color = color
        self.systemImage = image
    }

    init(title: String, imageName: String) {
        self.title = title
        self.imageName = imageName
    }

    static let previewSamples: [CarouselItem] = [
        CarouselItem(title: "Explore Nature", color: .mint, image: "globe"),
        CarouselItem(title: "Tech Trends", color: .purple, image: "cpu"),
        CarouselItem(title: "Fitness Goals", color: .orange, image: "figure.run"),
        CarouselItem(title: "Creative Arts", color: .pink, image: "paintpalette"),
        CarouselItem(title: "Night Life", color: .indigo, image: "moon.stars")
    ]

    static let homeMainStory: [CarouselItem] = [
        CarouselItem(title: "Eric MVP", imageName: "Eric_MVP"),
        CarouselItem(title: "RMC13 Story", imageName: "Mvp_STORY_MAIN")
    ]

    static let homeHeadliner: [CarouselItem] = [
        CarouselItem(title: "LA Film Mode", imageName: "generated-image-1-41"),
        CarouselItem(title: "136A Battlezone", imageName: "RMC136AZone_Banner"),
        CarouselItem(title: "Hyper 3D AI", imageName: "HomeCarousel_Hyper3DAI"),
        CarouselItem(title: "Unreal Community", imageName: "HomeCarousel_UnrealCommunity"),
        CarouselItem(title: "MVP 2012", imageName: "MVP_Main"),
        CarouselItem(title: "Legends of Glory", imageName: "Legends_Glory")
    ]

    static let homeHeadlines: [CarouselItem] = [
        CarouselItem(title: "Unreal Community", imageName: "HomeCarousel_UnrealCommunity"),
        CarouselItem(title: "Hyper 3D AI", imageName: "HomeCarousel_Hyper3DAI")
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
