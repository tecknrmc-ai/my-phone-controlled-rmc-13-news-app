import AVFoundation
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

final class ToolsAppDelegate: NSObject, UIApplicationDelegate {
    func application(
        _ application: UIApplication,
        supportedInterfaceOrientationsFor window: UIWindow?
    ) -> UIInterfaceOrientationMask {
        ToolsOrientation.current()
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
    @ObservationIgnored private var started = false
    @ObservationIgnored private var didFinish = false

    func start(onFinished: @escaping () -> Void) {
        self.onFinished = onFinished
        guard !started else { return }
        started = true
        let audio = AVAudioSession.sharedInstance()
        try? audio.setCategory(.playback, mode: .moviePlayback)
        try? audio.setActive(true)
        ToolsOrientation.set(.portrait)
        playBlast()
    }

    private func playBlast() {
        phase = .blast
        turnedSideways = false
        let blast = MediaLocator.videoURL(candidates: ["RMXAI_Blast_logo", "RMXAI_Blast_Logo", "RMXAIBlastLogo"])
        let tester = MediaLocator.videoURL(candidates: ["RMC_AppTester_Logo", "RMC_AppTester_logo", "RMC13_apptesters_logo_vid"])
        watch = Task { @MainActor in
            await self.play(url: blast, minimum: 5.2, turnAfter: 2.1)
            guard !Task.isCancelled else { return }
            self.phase = .tester
            self.turnedSideways = true
            ToolsOrientation.set(.landscapeRight)
            await self.play(url: tester, minimum: 4.8, turnAfter: nil)
            guard !Task.isCancelled else { return }
            self.finish()
        }
    }

    private func finish() {
        guard !didFinish else { return }
        didFinish = true
        watch?.cancel()
        watch = nil
        player?.pause()
        let done = onFinished
        onFinished = {}
        done()
        ToolsOrientation.set(.portrait)
    }

    private func play(url: URL?, minimum: TimeInterval, turnAfter: TimeInterval?) async {
        videoFailed = url == nil
        let item = url.map { AVPlayerItem(url: $0) }
        loadedItem = item
        let player = AVPlayer(playerItem: item)
        player.isMuted = false
        self.player = player
        if url != nil {
            player.play()
        }
        let startedAt = Date()
        let missingVideo = url == nil
        var didTurn = turnAfter == nil
        while !Task.isCancelled {
            try? await Task.sleep(for: .milliseconds(100))
            let elapsed = Date().timeIntervalSince(startedAt)
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
            let reachedEnd = length.isFinite && length > 0 && seconds >= max(0, length - 0.12)
            let playedLongEnough = elapsed >= minimum && (missingVideo || self.videoFailed || reachedEnd)
            let timedOut = elapsed >= minimum + 2
            if playedLongEnough || timedOut {
                return
            }
        }
    }
}

enum SplashPhase: Equatable {
    case blast
    case tester
}

struct SplashSequenceView: View {
    var model: SplashModel
    var onFinished: () -> Void
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
            controller.player?.play()
        }
    }
}
