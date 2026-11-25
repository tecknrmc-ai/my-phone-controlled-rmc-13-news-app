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
    @State private var session = StudioSession()
    @State private var showSplash = true

    init() {
        StudioTheme.configureChrome()
    }

    var body: some Scene {
        WindowGroup {
            ZStack {
                MainTabView()
                    .environment(session)
                    .allowsHitTesting(!showSplash)
                if showSplash {
                    SplashSequenceView {
                        withAnimation(.easeOut(duration: 0.35)) {
                            showSplash = false
                        }
                    }
                    .transition(.opacity)
                    .zIndex(1)
                }
            }
            .preferredColorScheme(.dark)
        }
    }
}
