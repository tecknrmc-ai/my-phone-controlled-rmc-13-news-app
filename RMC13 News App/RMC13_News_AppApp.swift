import SwiftUI

@main
struct RMC13_News_AppApp: App {
    @UIApplicationDelegateAdaptor(ToolsAppDelegate.self) private var appDelegate

    init() {
        StudioTheme.configureChrome()
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
