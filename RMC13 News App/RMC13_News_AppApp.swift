import SwiftUI

@main
struct RMC13_News_AppApp: App {
    init() {
        RMCTheme.configureChrome()
    }

    var body: some Scene {
        WindowGroup {
            MainTabView()
                .preferredColorScheme(.dark)
                .tint(RMCTheme.gold)
        }
    }
}
