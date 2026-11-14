import SwiftUI
import UIKit

enum RMCTheme {
    static let obsidian = Color(red: 0.03, green: 0.03, blue: 0.03)
    static let obsidianSoft = Color(red: 0.07, green: 0.06, blue: 0.05)
    static let card = Color(red: 0.09, green: 0.08, blue: 0.07)
    static let gold = Color(red: 0.83, green: 0.69, blue: 0.38)
    static let goldBright = Color(red: 0.97, green: 0.85, blue: 0.52)
    static let goldDeep = Color(red: 0.55, green: 0.42, blue: 0.18)
    static let ivory = Color(red: 0.96, green: 0.93, blue: 0.86)
    static let muted = Color(red: 0.72, green: 0.68, blue: 0.60)

    static var goldGradient: LinearGradient {
        LinearGradient(
            colors: [goldBright, gold, goldDeep],
            startPoint: .topLeading,
            endPoint: .bottomTrailing
        )
    }

    static func configureChrome() {
        let goldUI = UIColor(red: 0.83, green: 0.69, blue: 0.38, alpha: 1)
        let blackUI = UIColor(red: 0.03, green: 0.03, blue: 0.03, alpha: 1)

        let tab = UITabBarAppearance()
        tab.configureWithOpaqueBackground()
        tab.backgroundColor = blackUI
        tab.shadowColor = goldUI.withAlphaComponent(0.35)
        tab.stackedLayoutAppearance.selected.iconColor = goldUI
        tab.stackedLayoutAppearance.selected.titleTextAttributes = [.foregroundColor: goldUI]
        tab.stackedLayoutAppearance.normal.iconColor = UIColor.white.withAlphaComponent(0.42)
        tab.stackedLayoutAppearance.normal.titleTextAttributes = [.foregroundColor: UIColor.white.withAlphaComponent(0.42)]
        UITabBar.appearance().standardAppearance = tab
        UITabBar.appearance().scrollEdgeAppearance = tab
        UITabBar.appearance().tintColor = goldUI
        UITabBar.appearance().unselectedItemTintColor = UIColor.white.withAlphaComponent(0.42)
        UITabBar.appearance().barTintColor = blackUI
        UITabBar.appearance().isTranslucent = false

        let nav = UINavigationBarAppearance()
        nav.configureWithOpaqueBackground()
        nav.backgroundColor = blackUI
        nav.shadowColor = goldUI.withAlphaComponent(0.25)
        nav.titleTextAttributes = [
            .foregroundColor: goldUI,
            .font: UIFont.systemFont(ofSize: 17, weight: .light)
        ]
        nav.largeTitleTextAttributes = [
            .foregroundColor: goldUI,
            .font: UIFont.systemFont(ofSize: 32, weight: .ultraLight)
        ]
        UINavigationBar.appearance().standardAppearance = nav
        UINavigationBar.appearance().scrollEdgeAppearance = nav
        UINavigationBar.appearance().compactAppearance = nav
        UINavigationBar.appearance().tintColor = goldUI
        UITextField.appearance().keyboardAppearance = .dark
    }
}

/// Condensed poster type that shrinks to the photo or video frame.
struct PosterTitle: View {
    let text: String
    var size: CGFloat = 28
    var color: Color = RMCTheme.ivory
    var alignment: Alignment = .leading

    var body: some View {
        Text(text)
            .font(.custom("DINCondensed-Bold", size: size))
            .lineLimit(2)
            .minimumScaleFactor(0.5)
            .foregroundStyle(color)
            .frame(maxWidth: .infinity, alignment: alignment)
    }
}

/// Black disc with a black-and-gold ring for the app profile.
struct ProfileGoldRing: View {
    var systemImage: String
    var diameter: CGFloat = 84

    var body: some View {
        Image(systemName: systemImage)
            .font(.system(size: diameter * 0.42, weight: .regular))
            .foregroundStyle(RMCTheme.gold)
            .frame(width: diameter, height: diameter)
            .background(Circle().fill(Color.black))
            .overlay {
                Circle().strokeBorder(
                    AngularGradient(
                        colors: [
                            .black,
                            RMCTheme.goldDeep,
                            RMCTheme.goldBright,
                            .black,
                            RMCTheme.gold,
                            .black
                        ],
                        center: .center
                    ),
                    lineWidth: max(2, diameter * 0.06)
                )
            }
            .accessibilityLabel("Profile")
    }
}

struct RMCBrandTitle: View {
    var size: CGFloat = 44

    var body: some View {
        Text("rmc13")
            .font(.system(size: size, weight: .ultraLight, design: .serif))
            .tracking(8)
            .textCase(.lowercase)
            .foregroundStyle(RMCTheme.goldGradient)
            .shadow(color: RMCTheme.gold.opacity(0.55), radius: 14, y: 0)
            .frame(maxWidth: .infinity)
    }
}

struct GoldCardBackground: ViewModifier {
    func body(content: Content) -> some View {
        content
            .background(RMCTheme.card)
            .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .stroke(RMCTheme.gold.opacity(0.55), lineWidth: 1)
            )
            .shadow(color: RMCTheme.gold.opacity(0.18), radius: 12, y: 4)
    }
}

struct GoldTrimImage: ViewModifier {
    var cornerRadius: CGFloat = 16

    func body(content: Content) -> some View {
        content
            .clipShape(RoundedRectangle(cornerRadius: cornerRadius, style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
                    .stroke(RMCTheme.goldGradient, lineWidth: 1.2)
            )
            .shadow(color: RMCTheme.gold.opacity(0.28), radius: 10, y: 3)
    }
}

extension View {
    func goldCard() -> some View {
        modifier(GoldCardBackground())
    }

    func goldTrim(cornerRadius: CGFloat = 16) -> some View {
        modifier(GoldTrimImage(cornerRadius: cornerRadius))
    }

    func rmcScreen() -> some View {
        self
            .background(RMCTheme.obsidian.ignoresSafeArea())
            .toolbarBackground(RMCTheme.obsidian, for: .navigationBar)
            .toolbarBackground(.visible, for: .navigationBar)
            .toolbarColorScheme(.dark, for: .navigationBar)
    }
}

struct GoldCTAButton: View {
    let title: String
    var enabled: Bool = true

    var body: some View {
        Text(title)
            .font(.headline)
            .foregroundColor(enabled ? RMCTheme.obsidian : RMCTheme.muted)
            .frame(maxWidth: .infinity)
            .padding()
            .background(enabled ? RMCTheme.goldGradient : LinearGradient(colors: [RMCTheme.obsidianSoft], startPoint: .top, endPoint: .bottom))
            .overlay(
                RoundedRectangle(cornerRadius: 12, style: .continuous)
                    .stroke(RMCTheme.gold.opacity(enabled ? 0.9 : 0.3), lineWidth: 1)
            )
            .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
            .shadow(color: enabled ? RMCTheme.gold.opacity(0.35) : .clear, radius: 10, y: 3)
    }
}
