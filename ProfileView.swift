import SwiftUI

struct ProfileView: View {
    @ObservedObject var session = UserSession.shared
    @State private var isCreatingAccount = false
    @State private var nameInput = ""
    @State private var emailInput = ""
    @State private var passwordInput = ""
    @State private var phoneInput = ""
    @State private var formError = ""

    var body: some View {
        NavigationStack {
            Group {
                if session.hasAppProfile {
                    signedInProfile
                } else {
                    signedOutForm
                }
            }
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .principal) {
                    Text("rmc13")
                        .font(.system(size: 20, weight: .ultraLight, design: .serif))
                        .tracking(4)
                        .foregroundStyle(RMCTheme.goldGradient)
                }
            }
            .rmcScreen()
        }
    }

    private var signedInProfile: some View {
        ScrollView {
            VStack(spacing: 20) {
                VStack(spacing: 10) {
                    ProfileGoldRing(systemImage: session.profileImage, diameter: 96)

                    Text(session.username)
                        .font(.title2)
                        .fontWeight(.light)
                        .foregroundColor(RMCTheme.ivory)

                    Text(session.email)
                        .font(.subheadline)
                        .foregroundColor(RMCTheme.muted)
                }
                .frame(maxWidth: .infinity)
                .padding()
                .goldCard()

                ProfileMediaSections()
                    .padding()
                    .goldCard()

                VStack(alignment: .leading, spacing: 12) {
                    Text("Account")
                        .font(.headline)
                        .foregroundColor(RMCTheme.gold)

                    profileRow(title: "Name", value: session.username)
                    profileRow(title: "Email", value: session.email)
                    if !session.phone.isEmpty {
                        profileRow(title: "Phone", value: session.phone)
                    }
                }
                .padding()
                .frame(maxWidth: .infinity, alignment: .leading)
                .goldCard()

                VStack(alignment: .leading, spacing: 12) {
                    Text("MVP Status")
                        .font(.headline)
                        .foregroundColor(RMCTheme.gold)

                    profileRow(
                        title: "Registration",
                        value: session.isMVPRegistered ? "Submitted" : (session.hasAppProfile ? "Account submitted" : "Not registered")
                    )
                    profileRow(
                        title: "Approval",
                        value: session.isAdmin
                            ? "Admin"
                            : (session.isMVPApproved
                               ? "Approved"
                               : (session.isMVPDenied ? "Denied" : "Pending review"))
                    )
                    if !session.mvpGradYear.isEmpty {
                        profileRow(title: "Class", value: session.mvpGradYear)
                    }
                    if !session.mvpBio.isEmpty {
                        Text(session.mvpBio)
                            .font(.body)
                            .foregroundColor(.secondary)
                    }

                    NavigationLink(destination: MVPView()) {
                        GoldCTAButton(title: session.isMVPRegistered ? "View MVP Hub" : "Create MVP Profile")
                    }

                    if session.isAdmin {
                        NavigationLink(destination: AdminReviewView()) {
                            GoldCTAButton(
                                title: session.pendingProfileRequests.isEmpty
                                 ? "Open Admin Review"
                                 : "Review \(session.pendingProfileRequests.count) profile request\(session.pendingProfileRequests.count == 1 ? "" : "s")"
                            )
                        }
                    }
                }
                .padding()
                .frame(maxWidth: .infinity, alignment: .leading)
                .goldCard()

                Button(role: .destructive) {
                    session.signOut()
                    clearForm()
                } label: {
                    Text("Sign Out")
                        .font(.headline)
                        .frame(maxWidth: .infinity)
                        .padding()
                }
            }
            .padding()
        }
    }

    private var signedOutForm: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                Picker("Mode", selection: $isCreatingAccount) {
                    Text("Sign In").tag(false)
                    Text("Create Account").tag(true)
                }
                .pickerStyle(.segmented)

                Text(isCreatingAccount
                     ? "Create an account to save your profile on this device."
                     : "Sign in with the email you used when you created your profile.")
                    .font(.subheadline)
                    .foregroundColor(RMCTheme.muted)

                VStack(alignment: .leading, spacing: 12) {
                    if isCreatingAccount {
                        labeledField("Full Name", text: $nameInput)
                    }

                    labeledField("Email", text: $emailInput)
                        .keyboardType(.emailAddress)
                        .textInputAutocapitalization(.never)
                        .autocorrectionDisabled()

                    VStack(alignment: .leading, spacing: 6) {
                        Text("Password").font(.caption).bold()
                        SecureField("Password", text: $passwordInput)
                            .padding(10)
                            .foregroundColor(RMCTheme.ivory)
                            .background(RMCTheme.obsidianSoft)
                            .overlay(
                                RoundedRectangle(cornerRadius: 8)
                                    .stroke(RMCTheme.gold.opacity(0.4), lineWidth: 1)
                            )
                    }

                    if isCreatingAccount {
                        labeledField("Phone (optional)", text: $phoneInput)
                            .keyboardType(.phonePad)
                    }
                }
                .padding()
                .goldCard()

                if !formError.isEmpty {
                    Text(formError)
                        .font(.footnote)
                        .foregroundColor(.red)
                }

                Button(action: submitAuth) {
                    GoldCTAButton(title: isCreatingAccount ? "Create Account" : "Sign In", enabled: canSubmit)
                }
                .disabled(!canSubmit)
            }
            .padding()
        }
    }

    private var canSubmit: Bool {
        if isCreatingAccount {
            return !nameInput.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
                && !emailInput.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
                && !passwordInput.isEmpty
        }
        return !emailInput.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
            && !passwordInput.isEmpty
    }

    private func submitAuth() {
        let email = emailInput.trimmingCharacters(in: .whitespacesAndNewlines)
        if isCreatingAccount {
            if let error = session.createAccount(
                name: nameInput.trimmingCharacters(in: .whitespacesAndNewlines),
                email: email,
                password: passwordInput,
                phone: phoneInput.trimmingCharacters(in: .whitespacesAndNewlines)
            ) {
                formError = error
            } else {
                formError = ""
                clearForm()
            }
        } else if let error = session.signIn(email: email, password: passwordInput) {
            formError = error
        } else {
            formError = ""
            clearForm()
        }
    }

    private func clearForm() {
        nameInput = ""
        emailInput = ""
        passwordInput = ""
        phoneInput = ""
        formError = ""
    }

    private func labeledField(_ title: String, text: Binding<String>) -> some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(title).font(.caption).bold().foregroundColor(RMCTheme.gold)
            TextField(title, text: text)
                .padding(10)
                .foregroundColor(RMCTheme.ivory)
                .background(RMCTheme.obsidianSoft)
                .overlay(
                    RoundedRectangle(cornerRadius: 8)
                        .stroke(RMCTheme.gold.opacity(0.4), lineWidth: 1)
                )
        }
    }

    private func profileRow(title: String, value: String) -> some View {
        HStack {
            Text(title)
                .foregroundColor(RMCTheme.muted)
            Spacer()
            Text(value)
                .bold()
                .foregroundColor(RMCTheme.ivory)
                .multilineTextAlignment(.trailing)
        }
        .font(.subheadline)
    }
}

#Preview {
    ProfileView()
}
