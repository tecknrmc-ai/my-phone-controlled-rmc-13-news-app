import SwiftUI
import MessageUI

struct AdminReviewView: View {
    @ObservedObject var session = UserSession.shared
    @State private var mailDraft: DecisionMailDraft?
    @State private var showMailComposer = false
    @State private var mailFallbackMessage = ""
    @State private var showMailFallback = false

    var body: some View {
        NavigationStack {
            List {
                Section {
                    if session.pendingProfileRequests.isEmpty {
                        Text("No profile requests waiting for review.")
                            .foregroundColor(.secondary)
                    } else {
                        ForEach(session.pendingProfileRequests) { request in
                            pendingCard(request)
                        }
                    }
                } header: {
                    Text("Requested Profiles")
                }

                if !session.reviewedProfileRequests.isEmpty {
                    Section("Reviewed") {
                        ForEach(session.reviewedProfileRequests) { request in
                            reviewedRow(request)
                        }
                    }
                }
            }
            .scrollContentBackground(.hidden)
            .background(RMCTheme.obsidian)
            .navigationTitle("Admin Review")
            .rmcScreen()
            .sheet(isPresented: $showMailComposer, onDismiss: {
                mailDraft = nil
            }) {
                if let mailDraft {
                    MailComposeView(
                        recipients: [mailDraft.to],
                        subject: mailDraft.subject,
                        body: mailDraft.body,
                        isPresented: $showMailComposer
                    )
                }
            }
            .alert("Email could not be sent automatically", isPresented: $showMailFallback) {
                Button("OK", role: .cancel) {}
            } message: {
                Text(mailFallbackMessage)
            }
        }
    }

    private func pendingCard(_ request: StoredAccount) -> some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(alignment: .top, spacing: 12) {
                Image(systemName: request.profileImage)
                    .font(.largeTitle)
                    .foregroundColor(.blue)

                VStack(alignment: .leading, spacing: 4) {
                    Text(request.username)
                        .font(.headline)
                    Text(request.email)
                        .font(.subheadline)
                        .foregroundColor(.blue)
                    Text(request.isMVPRegistered ? "MVP profile request" : "Account profile request")
                        .font(.caption)
                        .bold()
                        .foregroundColor(.orange)
                    if !request.mvpPhone.isEmpty {
                        Text(request.mvpPhone)
                            .font(.caption)
                            .foregroundColor(.secondary)
                    }
                    if !request.mvpGradYear.isEmpty {
                        Text("Class of \(request.mvpGradYear)")
                            .font(.caption)
                            .foregroundColor(.secondary)
                    }
                }
            }

            if !request.mvpBio.isEmpty {
                Text(request.mvpBio)
                    .font(.body)
                    .foregroundColor(.secondary)
            }

            Text("Decision email will be sent to \(request.email).")
                .font(.caption)
                .foregroundColor(.secondary)

            HStack(spacing: 12) {
                Button {
                    decide(request, approved: true)
                } label: {
                    Label("Approve", systemImage: "checkmark.circle.fill")
                        .font(.headline)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 10)
                }
                .buttonStyle(.borderedProminent)
                .tint(.green)

                Button(role: .destructive) {
                    decide(request, approved: false)
                } label: {
                    Label("Deny", systemImage: "xmark.circle.fill")
                        .font(.headline)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 10)
                }
                .buttonStyle(.borderedProminent)
            }
        }
        .padding(.vertical, 6)
    }

    private func reviewedRow(_ request: StoredAccount) -> some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(request.username)
                .font(.headline)
            Text(request.email)
                .font(.caption)
                .foregroundColor(.blue)
            Text(request.isMVPApproved ? "Approved" : "Denied")
                .font(.caption)
                .bold()
                .foregroundColor(request.isMVPApproved ? .green : .red)
        }
        .padding(.vertical, 4)
    }

    private func decide(_ request: StoredAccount, approved: Bool) {
        guard let updated = session.reviewProfile(email: request.email, approved: approved) else { return }
        let message = session.decisionEmail(for: updated, approved: approved)
        mailDraft = DecisionMailDraft(to: message.to, subject: message.subject, body: message.body)
        sendDecisionEmail(message)
    }

    private func sendDecisionEmail(_ message: (to: String, subject: String, body: String)) {
        if MFMailComposeViewController.canSendMail() {
            showMailComposer = true
            return
        }

        var components = URLComponents()
        components.scheme = "mailto"
        components.path = message.to
        components.queryItems = [
            URLQueryItem(name: "subject", value: message.subject),
            URLQueryItem(name: "body", value: message.body)
        ]

        if let url = components.url, UIApplication.shared.canOpenURL(url) {
            UIApplication.shared.open(url)
        } else {
            mailFallbackMessage = "The decision was saved to \(message.to), but this device has no Mail account. Add an email account in Settings, then the Approve/Deny buttons can send the notice."
            showMailFallback = true
        }
    }
}

private struct DecisionMailDraft {
    let to: String
    let subject: String
    let body: String
}

struct MailComposeView: UIViewControllerRepresentable {
    let recipients: [String]
    let subject: String
    let body: String
    @Binding var isPresented: Bool

    func makeCoordinator() -> Coordinator {
        Coordinator(isPresented: $isPresented)
    }

    func makeUIViewController(context: Context) -> MFMailComposeViewController {
        let controller = MFMailComposeViewController()
        controller.mailComposeDelegate = context.coordinator
        controller.setToRecipients(recipients)
        controller.setSubject(subject)
        controller.setMessageBody(body, isHTML: false)
        return controller
    }

    func updateUIViewController(_ uiViewController: MFMailComposeViewController, context: Context) {}

    final class Coordinator: NSObject, MFMailComposeViewControllerDelegate {
        @Binding var isPresented: Bool

        init(isPresented: Binding<Bool>) {
            _isPresented = isPresented
        }

        func mailComposeController(_ controller: MFMailComposeViewController, didFinishWith result: MFMailComposeResult, error: Error?) {
            isPresented = false
        }
    }
}

#Preview {
    AdminReviewView()
}
