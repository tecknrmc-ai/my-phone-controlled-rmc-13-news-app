import PhotosUI
import SwiftUI
import UIKit

struct PressReleaseView: View {
    @Environment(StudioSession.self) private var session
    @State private var draft = PressDraft()
    @State private var step = 0
    @State private var issues: [String] = []
    @State private var showPreview = false
    @State private var showCheckout = false
    @State private var photoItem: PhotosPickerItem?

    private let stepTitles = ["Artist", "Biography", "Story", "Media", "Tier"]

    var body: some View {
        NavigationStack {
            StudioScreen {
                VStack(spacing: 0) {
                    progress
                    ScrollView {
                        VStack(alignment: .leading, spacing: 16) {
                            if !issues.isEmpty {
                                ForEach(issues, id: \.self) { issue in
                                    Label(issue, systemImage: "exclamationmark.triangle.fill")
                                        .font(.caption)
                                        .foregroundStyle(StudioTheme.danger)
                                }
                            }
                            stepContent
                        }
                        .padding(20)
                    }
                    footer
                }
            }
            .navigationTitle("Press Release")
            .sheet(isPresented: $showPreview) {
                PressPreviewSheet(draft: draft)
            }
            .sheet(isPresented: $showCheckout) {
                PressCheckoutSheet(draft: draft) {
                    if session.submitPress(draft) {
                        draft = PressDraft()
                        step = 0
                        showCheckout = false
                        session.selectedTab = .profile
                    }
                }
                .environment(session)
            }
        }
    }

    private var progress: some View {
        HStack(spacing: 6) {
            ForEach(stepTitles.indices, id: \.self) { index in
                VStack(spacing: 4) {
                    Capsule()
                        .fill(index <= step ? AnyShapeStyle(StudioTheme.accentGradient) : AnyShapeStyle(Color.white.opacity(0.12)))
                        .frame(height: 4)
                    Text(stepTitles[index])
                        .font(.caption2)
                        .foregroundStyle(index == step ? .white : StudioTheme.muted)
                }
            }
        }
        .padding(.horizontal, 16)
        .padding(.top, 8)
    }

    @ViewBuilder
    private var stepContent: some View {
        switch step {
        case 0:
            field("Artist / Stage Name", text: $draft.artistName)
            field("Project Title", text: $draft.projectTitle)
            Picker("Release Type", selection: $draft.releaseType) {
                ForEach(ReleaseType.allCases) { type in
                    Text(type.rawValue).tag(type)
                }
            }
            .pickerStyle(.segmented)
            DatePicker("Release Date", selection: $draft.releaseDate, displayedComponents: .date)
        case 1:
            editor("Artist Biography", text: $draft.biography, limit: 800)
        case 2:
            editor("Character / Persona", text: $draft.persona, limit: 400)
            field("Hometown", text: $draft.hometown)
            field("High School", text: $draft.highSchool)
            editor("Key Achievements & Milestones", text: $draft.achievements, limit: 600)
            editor("Miscellaneous / Additional Notes", text: $draft.notes, limit: 500)
        case 3:
            PhotosPicker(selection: $photoItem, matching: .images) {
                Label(draft.photoData == nil ? "Add cover art or press photo" : "Replace press photo", systemImage: "photo.badge.plus")
                    .font(.headline)
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(StudioTheme.card, in: RoundedRectangle(cornerRadius: 16, style: .continuous))
            }
            .buttonStyle(.plain)
            .onChange(of: photoItem) { _, item in
                guard let item else { return }
                Task { @MainActor in
                    if let data = try? await item.loadTransferable(type: Data.self) {
                        draft.photoData = data
                    }
                }
            }
            if let data = draft.photoData, let image = UIImage(data: data) {
                Image(uiImage: image)
                    .resizable()
                    .scaledToFill()
                    .frame(height: 220)
                    .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
            } else {
                Text("A photo is optional. The write-up still needs the story fields.")
                    .font(.caption)
                    .foregroundStyle(StudioTheme.muted)
            }
        default:
            ForEach(PressTier.allCases) { tier in
                Button {
                    draft.tier = tier
                } label: {
                    VStack(alignment: .leading, spacing: 8) {
                        HStack {
                            Text(tier.name)
                                .font(.headline)
                            if let badge = tier.badge {
                                Text(badge)
                                    .font(.caption2.weight(.bold))
                                    .padding(.horizontal, 8)
                                    .padding(.vertical, 3)
                                    .background(StudioTheme.cyan, in: Capsule())
                                    .foregroundStyle(.black)
                            }
                            Spacer()
                            Text(StudioLogic.usd(tier.price))
                                .font(.headline)
                        }
                        ForEach(tier.deliverables, id: \.self) { item in
                            Label(item, systemImage: "checkmark")
                                .font(.caption)
                                .foregroundStyle(StudioTheme.muted)
                        }
                    }
                    .padding(14)
                    .foregroundStyle(.white)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(StudioTheme.card, in: RoundedRectangle(cornerRadius: 18, style: .continuous))
                    .overlay(
                        RoundedRectangle(cornerRadius: 18, style: .continuous)
                            .stroke(draft.tier == tier ? StudioTheme.cyan : Color.clear, lineWidth: 1.5)
                    )
                }
                .buttonStyle(.plain)
            }
        }
    }

    private var footer: some View {
        VStack(spacing: 10) {
            if step < 4 {
                HStack(spacing: 12) {
                    if step > 0 { backButton }
                    continueButton
                }
            } else {
                if step > 0 { backButton }
                Button("Preview Press Release") {
                    issues = StudioLogic.pressIssues(draft)
                    if issues.isEmpty { showPreview = true }
                }
                .buttonStyle(.bordered)
                .frame(maxWidth: .infinity)
                Button("Submit") {
                    issues = StudioLogic.pressIssues(draft)
                    if issues.isEmpty { showCheckout = true }
                }
                .buttonStyle(.borderedProminent)
                .tint(StudioTheme.purple)
                .frame(maxWidth: .infinity)
            }
        }
        .padding(16)
        .frame(maxWidth: .infinity)
        .background(StudioTheme.background)
    }

    private var backButton: some View {
        Button("Back") {
            issues = []
            step -= 1
        }
        .buttonStyle(.bordered)
        .frame(maxWidth: .infinity)
    }

    private var continueButton: some View {
        Button("Continue") { advance() }
            .buttonStyle(.borderedProminent)
            .tint(StudioTheme.purple)
            .frame(maxWidth: .infinity)
    }

    private func advance() {
        issues = StudioLogic.stepIssues(draft, step: step)
        if issues.isEmpty { step += 1 }
    }

    private func field(_ title: String, text: Binding<String>) -> some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(title)
                .font(.caption.weight(.semibold))
                .foregroundStyle(StudioTheme.muted)
            TextField(title, text: text)
                .padding(12)
                .background(StudioTheme.card, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
        }
    }

    private func editor(_ title: String, text: Binding<String>, limit: Int) -> some View {
        VStack(alignment: .leading, spacing: 6) {
            HStack {
                Text(title)
                    .font(.caption.weight(.semibold))
                    .foregroundStyle(StudioTheme.muted)
                Spacer()
                Text("\(text.wrappedValue.count)/\(limit)")
                    .font(.caption2.monospacedDigit())
                    .foregroundStyle(StudioTheme.muted)
            }
            TextEditor(text: text)
                .frame(minHeight: 120)
                .padding(8)
                .scrollContentBackground(.hidden)
                .background(StudioTheme.card, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
                .onChange(of: text.wrappedValue) { _, newValue in
                    if newValue.count > limit {
                        text.wrappedValue = String(newValue.prefix(limit))
                    }
                }
        }
    }
}

struct PressPreviewSheet: View {
    let draft: PressDraft
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 16) {
                    if let data = draft.photoData, let image = UIImage(data: data) {
                        Image(uiImage: image)
                            .resizable()
                            .scaledToFill()
                            .frame(height: 200)
                            .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
                    }
                    Text(StudioLogic.formattedRelease(draft))
                        .font(.body)
                        .foregroundStyle(.white)
                        .frame(maxWidth: .infinity, alignment: .leading)
                }
                .padding(20)
            }
            .background(StudioTheme.background.ignoresSafeArea())
            .navigationTitle("Preview")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button("Done") { dismiss() }
                }
            }
        }
        .preferredColorScheme(.dark)
    }
}

struct PressCheckoutSheet: View {
    let draft: PressDraft
    var onConfirm: () -> Void
    @Environment(\.dismiss) private var dismiss
    @State private var submitted = false

    var body: some View {
        NavigationStack {
            VStack(spacing: 18) {
                if submitted {
                    Image(systemName: "checkmark.seal.fill")
                        .font(.system(size: 64))
                        .foregroundStyle(StudioTheme.cyan)
                    Text("Campaign filed")
                        .font(.title.bold())
                    Text("\(draft.projectTitle) is In Review on your profile.")
                        .multilineTextAlignment(.center)
                        .foregroundStyle(StudioTheme.muted)
                    Button("View in Profile", action: onConfirm)
                        .buttonStyle(.borderedProminent)
                        .tint(StudioTheme.purple)
                } else {
                    Text(draft.tier?.name ?? "Tier")
                        .font(.title2.bold())
                    Text(draft.tier.map { StudioLogic.usd($0.price) } ?? "")
                        .font(.largeTitle.bold())
                        .foregroundStyle(StudioTheme.cyan)
                    Text("Simulated checkout. No card is charged. Submitting saves the campaign on this device.")
                        .font(.subheadline)
                        .foregroundStyle(StudioTheme.muted)
                        .multilineTextAlignment(.center)
                    Button("Confirm & Submit") {
                        withAnimation { submitted = true }
                    }
                    .buttonStyle(.borderedProminent)
                    .tint(StudioTheme.purple)
                    Button("Cancel", role: .cancel) { dismiss() }
                }
            }
            .padding(24)
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .background(StudioTheme.background.ignoresSafeArea())
            .navigationTitle("Checkout")
            .navigationBarTitleDisplayMode(.inline)
            .foregroundStyle(.white)
        }
        .preferredColorScheme(.dark)
    }
}

#Preview {
    PressReleaseView()
        .environment(StudioSession.preview)
}
