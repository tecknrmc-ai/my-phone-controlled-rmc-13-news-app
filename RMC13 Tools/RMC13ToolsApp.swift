import SwiftUI

@main
struct RMC13ToolsApp: App {
    @UIApplicationDelegateAdaptor(ToolsAppDelegate.self) private var appDelegate

    init() {
        StudioTheme.configureChrome()
    }

    var body: some Scene {
        WindowGroup {
            ToolsRootView()
        }
    }
}
