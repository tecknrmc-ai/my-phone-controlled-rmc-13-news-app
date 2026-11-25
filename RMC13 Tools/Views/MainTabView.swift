import SwiftUI

struct ToolsMainTabView: View {
    @Environment(StudioSession.self) private var session

    var body: some View {
        TabView(selection: Binding(
            get: { session.selectedTab },
            set: { session.selectedTab = $0 }
        )) {
            ToolsHomeView()
                .tabItem { Label(ToolsTab.home.title, systemImage: ToolsTab.home.symbol) }
                .tag(ToolsTab.home)
            BeatsView()
                .tabItem { Label(ToolsTab.beats.title, systemImage: ToolsTab.beats.symbol) }
                .tag(ToolsTab.beats)
            PressReleaseView()
                .tabItem { Label(ToolsTab.press.title, systemImage: ToolsTab.press.symbol) }
                .tag(ToolsTab.press)
            ToolsProfileView()
                .tabItem { Label(ToolsTab.profile.title, systemImage: ToolsTab.profile.symbol) }
                .tag(ToolsTab.profile)
        }
        .tint(StudioTheme.purple)
        .toolbarBackground(StudioTheme.background, for: .tabBar)
        .toolbarBackground(.visible, for: .tabBar)
        .safeAreaInset(edge: .bottom, spacing: 0) {
            if session.player.current != nil {
                MiniPlayerBar()
                    .padding(.bottom, 6)
            }
        }
        .overlay(alignment: .top) {
            if let toast = session.toast {
                StudioToast(message: toast)
                    .transition(.move(edge: .top).combined(with: .opacity))
            }
        }
        .animation(.snappy, value: session.toast)
        .sheet(isPresented: Binding(
            get: { session.playerSheet },
            set: { session.playerSheet = $0 }
        )) {
            FullPlayerView()
                .environment(session)
        }
        .preferredColorScheme(.dark)
    }
}

#Preview {
    ToolsMainTabView()
        .environment(StudioSession.preview)
}
