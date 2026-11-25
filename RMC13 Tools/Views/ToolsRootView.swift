import SwiftUI

struct ToolsRootView: View {
    @State private var session = StudioSession()
    @State private var splash = SplashModel()
    @State private var showSplash = true

    var body: some View {
        ZStack {
            if showSplash {
                SplashSequenceView(model: splash) {
                    showSplash = false
                }
                .zIndex(1)
            } else {
                ToolsMainTabView()
                    .environment(session)
            }
        }
        .preferredColorScheme(.dark)
    }
}

#Preview("RMC13 Tools") {
    ToolsRootView()
}
