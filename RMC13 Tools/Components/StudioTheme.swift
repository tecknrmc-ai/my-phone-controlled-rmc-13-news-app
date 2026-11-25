import SwiftUI
import UIKit

enum StudioTheme {
    static let background = Color(red: 13 / 255, green: 13 / 255, blue: 15 / 255)
    static let card = Color(red: 24 / 255, green: 24 / 255, blue: 28 / 255)
    static let purple = Color(red: 0.62, green: 0.36, blue: 1.0)
    static let cyan = Color(red: 0.20, green: 0.90, blue: 0.95)
    static let ink = Color.white
    static let muted = Color.white.opacity(0.64)
    static let danger = Color(red: 1.0, green: 0.36, blue: 0.42)

    static var accentGradient: LinearGradient {
        LinearGradient(colors: [purple, cyan], startPoint: .topLeading, endPoint: .bottomTrailing)
    }

    static func configureChrome() {
        let background = UIColor(red: 13 / 255, green: 13 / 255, blue: 15 / 255, alpha: 1)
        let purple = UIColor(red: 0.62, green: 0.36, blue: 1, alpha: 1)
        let tab = UITabBarAppearance()
        tab.configureWithOpaqueBackground()
        tab.backgroundColor = background
        tab.stackedLayoutAppearance.selected.iconColor = purple
        tab.stackedLayoutAppearance.selected.titleTextAttributes = [.foregroundColor: purple]
        tab.stackedLayoutAppearance.normal.iconColor = UIColor.white.withAlphaComponent(0.45)
        tab.stackedLayoutAppearance.normal.titleTextAttributes = [.foregroundColor: UIColor.white.withAlphaComponent(0.45)]
        UITabBar.appearance().standardAppearance = tab
        UITabBar.appearance().scrollEdgeAppearance = tab

        let nav = UINavigationBarAppearance()
        nav.configureWithOpaqueBackground()
        nav.backgroundColor = background
        nav.titleTextAttributes = [.foregroundColor: UIColor.white]
        nav.largeTitleTextAttributes = [.foregroundColor: UIColor.white]
        UINavigationBar.appearance().standardAppearance = nav
        UINavigationBar.appearance().scrollEdgeAppearance = nav
        UINavigationBar.appearance().tintColor = purple
    }
}

struct StudioScreen<Content: View>: View {
    let content: Content

    init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }

    var body: some View {
        content
            .background(StudioTheme.background.ignoresSafeArea())
    }
}

struct BeatArtwork: View {
    let name: String

    var body: some View {
        ZStack {
            StudioTheme.accentGradient
            Image(name)
                .resizable()
                .scaledToFill()
        }
        .clipped()
    }
}

struct PriceBadge: View {
    let label: String

    var body: some View {
        Text(label)
            .font(.caption.weight(.bold))
            .padding(.horizontal, 8)
            .padding(.vertical, 4)
            .background(label == "FREE" ? StudioTheme.cyan : StudioTheme.purple, in: Capsule())
            .foregroundStyle(label == "FREE" ? Color.black : Color.white)
    }
}

struct FilterPill: View {
    let title: String
    let isSelected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.subheadline.weight(.semibold))
                .padding(.horizontal, 14)
                .padding(.vertical, 8)
                .background(isSelected ? AnyShapeStyle(StudioTheme.accentGradient) : AnyShapeStyle(StudioTheme.card), in: Capsule())
                .foregroundStyle(isSelected ? Color.white : StudioTheme.muted)
        }
        .buttonStyle(.plain)
    }
}

struct StudioToast: View {
    let message: String

    var body: some View {
        Text(message)
            .font(.subheadline.weight(.semibold))
            .foregroundStyle(.white)
            .padding(.horizontal, 16)
            .padding(.vertical, 12)
            .background(.ultraThinMaterial, in: Capsule())
            .overlay(Capsule().stroke(StudioTheme.cyan.opacity(0.7), lineWidth: 1))
            .padding(.top, 8)
    }
}
