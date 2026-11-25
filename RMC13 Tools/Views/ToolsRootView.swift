import SwiftUI

struct ToolsRootView: View {
    @State private var session = StudioSession()
    @State private var showSplash = true

    var body: some View {
        ZStack {
            ToolsMainTabView()
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

#Preview("RMC13 Tools") {
    ToolsRootView()
}
