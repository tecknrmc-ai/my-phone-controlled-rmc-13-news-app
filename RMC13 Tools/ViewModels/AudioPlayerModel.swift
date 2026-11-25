import AVFoundation
import Observation

@MainActor
@Observable
final class AudioPlayerModel {
    var current: Beat?
    var queue: [Beat] = []
    var isPlaying = false
    var currentTime: TimeInterval = 0
    var duration: TimeInterval = 10
    var isLooping = true
    var volume: Double = 0.9

    @ObservationIgnored private var engine: AVAudioPlayer?
    @ObservationIgnored private var clock: Task<Void, Never>?

    func open(_ beat: Beat, queue: [Beat]) {
        self.queue = queue.isEmpty ? [beat] : queue
        if current?.id == beat.id, engine != nil || current != nil {
            if !isPlaying { play() }
            return
        }
        load(beat, autoplay: true)
    }

    func toggle() {
        if isPlaying {
            pause()
        } else if current != nil {
            play()
        }
    }

    func play() {
        activateSession()
        if let engine {
            engine.volume = Float(volume)
            engine.numberOfLoops = isLooping ? -1 : 0
            engine.play()
        }
        isPlaying = true
        startClock()
    }

    func pause() {
        engine?.pause()
        isPlaying = false
    }

    func stop() {
        engine?.stop()
        engine = nil
        clock?.cancel()
        current = nil
        queue = []
        isPlaying = false
        currentTime = 0
    }

    func seek(to time: TimeInterval) {
        let upper = max(duration, 0.1)
        let clamped = min(max(0, time), upper)
        currentTime = clamped
        engine?.currentTime = clamped
    }

    func skip(by seconds: TimeInterval) {
        seek(to: currentTime + seconds)
    }

    func next() {
        guard let current, let index = queue.firstIndex(where: { $0.id == current.id }) else { return }
        let beat = queue[(index + 1) % queue.count]
        load(beat, autoplay: true)
    }

    func previous() {
        guard let current, let index = queue.firstIndex(where: { $0.id == current.id }) else { return }
        if currentTime > 2 {
            seek(to: 0)
            return
        }
        let beat = queue[(index - 1 + queue.count) % queue.count]
        load(beat, autoplay: true)
    }

    func setLooping(_ looping: Bool) {
        isLooping = looping
        engine?.numberOfLoops = looping ? -1 : 0
    }

    func setVolume(_ value: Double) {
        volume = value
        engine?.volume = Float(value)
    }

    private func load(_ beat: Beat, autoplay: Bool) {
        engine?.stop()
        current = beat
        currentTime = 0
        let ext = "wav"
        if let url = MediaLocator.audioURL(named: beat.audioName, preferredExtension: ext),
           let player = try? AVAudioPlayer(contentsOf: url) {
            player.volume = Float(volume)
            player.numberOfLoops = isLooping ? -1 : 0
            player.prepareToPlay()
            engine = player
            duration = max(player.duration, 0.1)
        } else {
            engine = nil
            duration = 30
        }
        if autoplay {
            play()
        } else {
            isPlaying = false
            startClock()
        }
    }

    private func startClock() {
        clock?.cancel()
        clock = Task { @MainActor in
            while !Task.isCancelled {
                try? await Task.sleep(for: .milliseconds(150))
                if let engine {
                    currentTime = engine.currentTime
                    if !engine.isPlaying, isPlaying, !isLooping {
                        isPlaying = false
                    }
                } else if isPlaying {
                    currentTime += 0.15
                    if currentTime >= duration {
                        currentTime = isLooping ? 0 : duration
                        if !isLooping { isPlaying = false }
                    }
                }
            }
        }
    }

    private func activateSession() {
        let session = AVAudioSession.sharedInstance()
        try? session.setCategory(.playback, mode: .default)
        try? session.setActive(true)
    }
}
