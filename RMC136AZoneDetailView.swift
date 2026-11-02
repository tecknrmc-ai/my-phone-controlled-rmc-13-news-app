import SwiftUI

struct RMC136AZoneDetailView: View {
    let alienImages = ["Alien_Alien animal", "Madox_HeadAlien", "Growler_Alien", "Alien_Alien animal"]
    
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                
                // MARK: - 1. Top Featured Image Banner
                Image("136Zone_Game")
                    .resizable()
                    .aspectRatio(contentMode: .fill)
                    .frame(width: UIScreen.main.bounds.width - 32, height: 200)
                    .clipped()
                    .goldTrim()
                    .padding(.horizontal)
                
                // MARK: - 2. Safe Wrapping Overview Text
                VStack(alignment: .leading, spacing: 10) {
                    Text("Inside the 136Zone Experience")
                        .font(.title2)
                        .fontWeight(.light)
                        .foregroundColor(RMCTheme.ivory)
                    
                    Text("Tactical Framework Overview")
                        .font(.subheadline).bold().foregroundColor(RMCTheme.gold)
                    
                    Divider()
                    
                    Text("Explore structural tactical shifts and localized zones introduced in the competitive sandbox framework. Build clean data metrics around environmental metadata shifts across map indexes. Players are required to track local species behavior while monitoring active sector security parameters.")
                        .font(.body)
                        .foregroundColor(RMCTheme.muted)
                        .lineSpacing(4)
                        .fixedSize(horizontal: false, vertical: true)
                }
                .padding(.horizontal)
                
                // MARK: - 3. Horizontal Specimen Carousel
                VStack(alignment: .leading, spacing: 12) {
                    Text("Zone Specimen Catalog")
                        .font(.headline)
                        .foregroundColor(RMCTheme.gold)
                        .padding(.horizontal)
                    
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(spacing: 16) {
                            ForEach(0..<alienImages.count, id: \.self) { index in
                                VStack(alignment: .leading) {
                                    Image(alienImages[index])
                                        .resizable()
                                        .aspectRatio(contentMode: .fill)
                                        .frame(width: 130, height: 130)
                                        .clipped()
                                        .goldTrim(cornerRadius: 10)
                                    
                                    Text(alienImages[index].replacingOccurrences(of: "_", with: " "))
                                        .font(.caption).bold()
                                        .foregroundColor(RMCTheme.ivory)
                                        .lineLimit(1)
                                }
                                .frame(width: 130)
                            }
                        }
                        .padding(.horizontal)
                    }
                }
                
            } // Ends the internal content VStack
            .padding(.vertical)
        } // Ends the parent ScrollView
        .navigationTitle("136Zone Spec")
        .navigationBarTitleDisplayMode(.inline)
        .rmcScreen()
    } // Ends the body property block
} // Ends the main RMC136AZoneDetailView structure block

#Preview {
    NavigationStack {
        RMC136AZoneDetailView()
    }
}

