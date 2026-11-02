//
//  MainTabView.swift
//  RMC13 News App
//
//  Created by Kymeyka brown on 10/29/26.
//

import SwiftUI

struct MainTabView: View {
    @ObservedObject private var session = UserSession.shared
    @State private var selectedTab = 0

    var body: some View {
        TabView(selection: $selectedTab) {
            HomeView(selectedTab: $selectedTab)
                .tabItem {
                    Label("Home", systemImage: "house.fill")
                }
                .tag(0)

            NewsArticlesView()
                .tabItem {
                    Label("Articles", systemImage: "newspaper.fill")
                }
                .tag(1)

            RMC13ProductionsView()
                .tabItem {
                    Label("RMC13", systemImage: "play.rectangle.fill")
                }
                .tag(2)

            ProfileView()
                .tabItem {
                    Label("Profile", systemImage: session.hasAppProfile ? "person.crop.circle.fill" : "person.crop.circle.badge.plus")
                }
                .tag(3)

            if session.isAdmin {
                AdminReviewView()
                    .tabItem {
                        Label("Review", systemImage: "checkmark.shield.fill")
                    }
                    .badge(session.pendingProfileRequests.count)
                    .tag(4)
            }
        }
        .environmentObject(session)
        .preferredColorScheme(.dark)
        .tint(RMCTheme.gold)
        .toolbarBackground(RMCTheme.obsidian, for: .tabBar)
        .toolbarBackground(.visible, for: .tabBar)
    }
}

#Preview {
    MainTabView()
}
