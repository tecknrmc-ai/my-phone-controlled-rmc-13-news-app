import PhotosUI
import SwiftUI

struct SettingsView: View {
    @Environment(StudioSession.self) private var session
    @State private var name = ""
    @State private var handle = ""
    @State private var photoItem: PhotosPickerItem?
    @State private var currentPassword = ""
    @State private var newPassword = ""
    @State private var confirmPassword = ""
    @State private var passwordMessage: String?
    @State private var showDelete = false

    var body: some View {
        StudioScreen {
            Form {
                Section("Profile") {
                    TextField("Display name", text: $name)
                    TextField("Handle", text: $handle)
                    PhotosPicker(selection: $photoItem, matching: .images) {
                        Label("Edit profile photo", systemImage: "person.crop.circle.badge.plus")
                    }
                    .onChange(of: photoItem) { _, item in
                        guard let item else { return }
                        Task { @MainActor in
                            if let data = try? await item.loadTransferable(type: Data.self) {
                                session.updatePhoto(data)
                            }
                        }
                    }
                    Button("Save Profile") {
                        session.updateProfile(name: name, handle: handle)
                    }
                }
                Section("Password Reset") {
                    SecureField("Current Password", text: $currentPassword)
                    SecureField("New Password", text: $newPassword)
                    SecureField("Confirm Password", text: $confirmPassword)
                    if let passwordMessage {
                        Text(passwordMessage)
                            .font(.caption)
                            .foregroundStyle(passwordMessage == "Password updated." ? StudioTheme.cyan : StudioTheme.danger)
                    }
                    Button("Update Password") { updatePassword() }
                    Button("Email Reset Link") { session.sendResetLink() }
                }
                Section("Danger Zone") {
                    Button("Delete Account", role: .destructive) {
                        showDelete = true
                    }
                }
            }
            .scrollContentBackground(.hidden)
            .background(StudioTheme.background)
        }
        .navigationTitle("Settings")
        .navigationBarTitleDisplayMode(.inline)
        .onAppear {
            name = session.profile.displayName
            handle = session.profile.handle
        }
        .sheet(isPresented: $showDelete) {
            DeleteAccountSheet {
                session.wipe()
                name = session.profile.displayName
                handle = session.profile.handle
                currentPassword = ""
                newPassword = ""
                confirmPassword = ""
                passwordMessage = nil
                showDelete = false
            }
        }
        .preferredColorScheme(.dark)
    }

    private func updatePassword() {
        if let error = StudioLogic.passwordError(
            currentInput: currentPassword,
            stored: session.profile.password,
            newPassword: newPassword,
            confirm: confirmPassword
        ) {
            passwordMessage = error
            return
        }
        session.updatePassword(to: newPassword)
        passwordMessage = "Password updated."
        currentPassword = ""
        newPassword = ""
        confirmPassword = ""
    }
}

struct DeleteAccountSheet: View {
    var onDelete: () -> Void
    @Environment(\.dismiss) private var dismiss
    @State private var phrase = ""

    var body: some View {
        NavigationStack {
            VStack(alignment: .leading, spacing: 16) {
                Text("This wipes the local profile, vault, and press history on this device.")
                    .foregroundStyle(StudioTheme.muted)
                Text("Type DELETE to confirm")
                    .font(.headline)
                TextField("DELETE", text: $phrase)
                    .textInputAutocapitalization(.characters)
                    .padding(12)
                    .background(StudioTheme.card, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
                Button("Delete Account", role: .destructive) {
                    guard phrase == "DELETE" else { return }
                    onDelete()
                }
                .buttonStyle(.borderedProminent)
                .tint(StudioTheme.danger)
                .disabled(phrase != "DELETE")
                Spacer()
            }
            .padding(20)
            .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
            .background(StudioTheme.background.ignoresSafeArea())
            .navigationTitle("Delete Profile")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
            }
            .foregroundStyle(.white)
        }
        .preferredColorScheme(.dark)
        .presentationDetents([.medium, .large])
    }
}

#Preview {
    NavigationStack {
        SettingsView()
            .environment(StudioSession.preview)
    }
}
