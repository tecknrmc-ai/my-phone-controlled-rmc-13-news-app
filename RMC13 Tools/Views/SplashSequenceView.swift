import AVKit
import SwiftUI
import UIKit

enum ToolsOrientation {
    private static let lock = NSLock()
    private static var mask: UIInterfaceOrientationMask = .portrait

    static func current() -> UIInterfaceOrientationMask {
        lock.lock()
        defer { lock.unlock() }
        return mask
    }

    @MainActor
    static func set(_ mask: UIInterfaceOrientationMask) {
        lock.lock()
        self.mask = mask
        lock.unlock()
        let raw: Int
        if mask == .landscapeRight {
            raw = UIInterfaceOrientation.landscapeRight.rawValue
        } else if mask == .landscapeLeft {
            raw = UIInterfaceOrientation.landscapeLeft.rawValue
        } else {
            raw = UIInterfaceOrientation.portrait.rawValue
        }
        UIDevice.current.setValue(raw, forKey: "orientation")
        UIViewController.attemptRotationToDeviceOrientation()
    }
}

@MainActor
@Observable
final class SplashModel {
    var player: AVPlayer?
    var phase: SplashPhase = .blast
    var turnedSideways = false
    var videoFailed = false
    @ObservationIgnored private var loadedItem: AVPlayerItem?
    @ObservationIgnored private var watch: Task<Void, Never>?
    @ObservationIgnored private var onFinished: () -> Void = {}

    func start(onFinished: @escaping () -> Void) {
        guard watch == nil else { return }
        self.onFinished = onFinished
        ToolsOrientation.set(.portrait)
        playBlast()
    }

    func teardown() {
        watch?.cancel()
        player?.pause()
        player = nil
    }

    private func playBlast() {
        phase = .blast
        turnedSideways = false
        let url = MediaLocator.videoURL(candidates: ["RMXAI_Blast_logo", "RMXAI_Blast_Logo", "RMXAIBlastLogo"])
        play(url: url, fallback: 5.2, turnAfter: 2.1, advance: .tester)
    }

    private func playTester() {
        phase = .tester
        turnedSideways = true
        ToolsOrientation.set(.landscapeRight)
        let url = MediaLocator.videoURL(candidates: ["RMC_AppTester_Logo", "RMC_AppTester_logo", "RMC13_apptesters_logo_vid"])
        play(url: url, fallback: 4.8, turnAfter: nil, advance: .done)
    }

    private func finish() {
        watch?.cancel()
        player?.pause()
        ToolsOrientation.set(.portrait)
        Task { @MainActor in
            try? await Task.sleep(for: .milliseconds(450))
            onFinished()
        }
    }

    private enum Advance: Sendable {
        case tester
        case done
    }

    private func play(url: URL?, fallback: TimeInterval, turnAfter: TimeInterval?, advance: Advance) {
        watch?.cancel()
        videoFailed = url == nil
        let item = url.map { AVPlayerItem(url: $0) }
        loadedItem = item
        let player = AVPlayer(playerItem: item)
        player.isMuted = false
        self.player = player
        if url != nil { player.play() }
        let started = Date()
        let missingVideo = url == nil
        watch = Task { @MainActor in
            var didTurn = turnAfter == nil
            while !Task.isCancelled {
                try? await Task.sleep(for: .milliseconds(100))
                let elapsed = Date().timeIntervalSince(started)
                if let turnAfter, !didTurn, elapsed >= turnAfter {
                    didTurn = true
                    self.turnedSideways = true
                    ToolsOrientation.set(.landscapeRight)
                }
                let current = self.loadedItem
                if current?.status == .failed {
                    self.videoFailed = true
                }
                let seconds = current?.currentTime().seconds ?? 0
                let length = current?.duration.seconds ?? .nan
                let reachedEnd = length.isFinite && seconds >= max(0, length - 0.15)
                let timedOut = elapsed >= fallback + 0.35
                if reachedEnd || timedOut || (missingVideo && elapsed >= fallback) {
                    switch advance {
                    case .tester:
                        self.playTester()
                    case .done:
                        self.finish()
                    }
                    break
                }
            }
        }
    }
}

enum SplashPhase: Equatable {
    case blast
    case tester
}

struct SplashSequenceView: View {
    var onFinished: () -> Void
    @State private var model = SplashModel()
    @Environment(\.verticalSizeClass) private var verticalSizeClass

    var body: some View {
        GeometryReader { geo in
            let visualTurn = model.phase == .blast && model.turnedSideways && verticalSizeClass != .compact
            ZStack {
                Color.black
                if let player = model.player, !model.videoFailed {
                    SplashPlayerView(player: player)
                        .frame(
                            width: visualTurn ? geo.size.height : geo.size.width,
                            height: visualTurn ? geo.size.width : geo.size.height
                        )
                        .rotationEffect(visualTurn ? .degrees(90) : .zero)
                        .animation(.easeInOut(duration: 0.85), value: visualTurn)
                } else {
                    fallback
                        .rotationEffect(visualTurn ? .degrees(90) : .zero)
                        .animation(.easeInOut(duration: 0.85), value: visualTurn)
                }
            }
            .frame(width: geo.size.width, height: geo.size.height)
        }
        .ignoresSafeArea()
        .background(Color.black)
        .statusBarHidden(true)
        .onAppear { model.start(onFinished: onFinished) }
        .onDisappear { model.teardown() }
    }

    private var fallback: some View {
        VStack(spacing: 18) {
            Text(model.phase == .blast ? "RMXAI" : "RMC")
                .font(.system(size: 64, weight: .bold))
            Text(model.phase == .blast ? "BLAST" : "APP TESTER")
                .font(.system(size: 42, weight: .bold))
                .foregroundStyle(StudioTheme.cyan)
            Text("RMC13 TOOLS")
                .font(.headline)
                .foregroundStyle(.white.opacity(0.8))
        }
        .foregroundStyle(.white)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(StudioTheme.background)
    }
}

struct SplashPlayerView: UIViewControllerRepresentable {
    let player: AVPlayer

    func makeUIViewController(context: Context) -> AVPlayerViewController {
        let controller = AVPlayerViewController()
        controller.player = player
        controller.showsPlaybackControls = false
        controller.videoGravity = .resizeAspectFill
        controller.view.backgroundColor = .black
        return controller
    }

    func updateUIViewController(_ controller: AVPlayerViewController, context: Context) {
        if controller.player !== player {
            controller.player = player
        }
    }
}
