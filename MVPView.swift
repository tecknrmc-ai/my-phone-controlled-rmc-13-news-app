import SwiftUI

struct MVPView: View {
    @ObservedObject var session = UserSession.shared

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                
                // MARK: - 1. Bounded Hero Image Banner
                Image("MVP_Main")
                    .resizable()
                    .aspectRatio(contentMode: .fill)
                    .frame(width: UIScreen.main.bounds.width - 32, height: 200)
                    .clipped()
                    .goldTrim()
                    .padding(.horizontal)
                
                VStack(alignment: .leading, spacing: 16) {
                    
                    // MARK: - 2. Safe Text Header Containers
                    VStack(alignment: .leading, spacing: 4) {
                        Text("Most Valuable Player Standings")
                            .font(.title)
                            .fontWeight(.light)
                            .foregroundColor(RMCTheme.ivory)
                            .minimumScaleFactor(0.75)
                            .lineLimit(2)
                        
                        Text("MVP 2012 Arroyo Valley Community Hub")
                            .font(.subheadline)
                            .bold()
                            .foregroundColor(RMCTheme.gold)
                            .minimumScaleFactor(0.85)
                            .lineLimit(2)
                    }
                    
                    Divider()
                    
                    // MARK: - 3. Secure Wrapping Registration Card with Navigation Action
                    VStack(alignment: .leading, spacing: 14) {
                        HStack(alignment: .top, spacing: 10) {
                            Image(systemName: "person.badge.plus.fill")
                                .foregroundColor(RMCTheme.gold)
                                .font(.title3)
                            
                            Text("Sign up today and build your character profile.")
                                .font(.headline)
                                .foregroundColor(RMCTheme.ivory)
                                .fixedSize(horizontal: false, vertical: true)
                        }
                        
                        Text("Receive a full game character package with interviews, photos, press, and highlight reels from the up and coming MVP 2012 game coming soon.")
                            .font(.body)
                            .foregroundColor(RMCTheme.muted)
                            .lineSpacing(3)
                            .fixedSize(horizontal: false, vertical: true)
                        
                        // MARK: - Navigation Action Connection
                        NavigationLink(destination: MVPRegistrationView()) {
                            GoldCTAButton(title: session.isMVPRegistered ? "Open Your MVP Profile" : "Create Profile & Claim Package")
                        }
                        .padding(.top, 6)
                    }
                    .padding()
                    .goldCard()
                    
                    // MARK: - 4. Platform Architectural Overview
                    VStack(alignment: .leading, spacing: 8) {
                        Text("About the Platform")
                            .font(.headline)
                            .foregroundColor(RMCTheme.gold)
                        
                        Text("Welcome to the MVP metrics hub. This section tracks top active contributors, competitive leaders, and high-impact players across our active nodes and global servers.")
                            .font(.body)
                            .foregroundColor(RMCTheme.muted)
                            .lineSpacing(4)
                            .fixedSize(horizontal: false, vertical: true)
                    }
                    .padding(.top, 8)
                }
                .padding(.horizontal)
            }
            .padding(.vertical)
        }
        .navigationTitle("MVP Hub")
        .navigationBarTitleDisplayMode(.inline)
        .rmcScreen()
    }
}

#Preview {
    NavigationStack {
        MVPView()
    }
}
