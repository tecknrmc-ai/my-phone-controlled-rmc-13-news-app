import SwiftUI
import UIKit

final class ToolsAppDelegate: NSObject, UIApplicationDelegate {
    func application(
        _ application: UIApplication,
        supportedInterfaceOrientationsFor window: UIWindow?
    ) -> UIInterfaceOrientationMask {
        ToolsOrientation.current()
    }
}

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
