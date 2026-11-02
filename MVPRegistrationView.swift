import SwiftUI
import UniformTypeIdentifiers

struct MVPRegistrationView: View {
    @ObservedObject var session = UserSession.shared

    @State private var currentStep: Int = 1
    @State private var fullName: String = ""
    @State private var emailAddress: String = ""
    @State private var phoneNumber: String = ""
    @State private var graduationYear: String = "2012"
    @State private var bioDescription: String = "Arroyo Valley competitive sandbox framework enthusiast."
    @State private var skillsList: String = "Tactical Navigation, Reflex Thresholding"
    @State private var currentStatusText: String = "Active Sector Operator"

    @State private var adminPinInput: String = ""
    private let correctAdminPin: String = "1313"

    var body: some View {
        VStack {
            if session.isMVPApproved {
                approvedPortfolio
            } else if session.isMVPDenied {
                deniedReview
            } else if session.isMVPRegistered && !session.isAdmin {
                pendingReview
            } else if currentStep == 1 {
                registrationForm
            } else if currentStep == 2 {
                adminGateway
            }
        }
        .rmcScreen()
        .navigationTitle("MVP Profile")
        .navigationBarTitleDisplayMode(.inline)
        .onAppear {
            if fullName.isEmpty {
                fullName = session.username
                emailAddress = session.email
                phoneNumber = session.phone.isEmpty ? session.mvpPhone : session.phone
                if !session.mvpBio.isEmpty {
                    bioDescription = session.mvpBio
                }
                if !session.mvpGradYear.isEmpty {
                    graduationYear = session.mvpGradYear
                }
            }
            if session.isMVPRegistered && session.isAdmin && !session.isMVPApproved {
                currentStep = 2
            }
        }
    }

    private var approvedPortfolio: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                VStack(spacing: 8) {
                    Image("MVP_Main")
                        .resizable()
                        .aspectRatio(contentMode: .fill)
                        .frame(width: 90, height: 90)
                        .clipShape(Circle())
                        .overlay(Circle().stroke(Color.blue, lineWidth: 2))
                    Text(session.username)
                        .font(.title2)
                        .bold()
                    Text("Class of \(session.mvpGradYear) • \(currentStatusText)")
                        .font(.caption)
                        .foregroundColor(.secondary)
                    Text(session.email)
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
                .frame(maxWidth: .infinity)
                .padding()
                .background(Color(.systemBackground))
                .cornerRadius(12)

                VStack(alignment: .leading, spacing: 8) {
                    Text("Biography").font(.headline)
                    Text(session.mvpBio).font(.body).foregroundColor(.secondary)
                }
                .padding()
                .background(Color(.systemBackground))
                .cornerRadius(12)

                VStack(alignment: .leading, spacing: 8) {
                    Text("Skills & Contact Metrics").font(.headline)
                    Text("Attributes: \(skillsList)").font(.footnote)
                    Text("Contact Phone: \(session.mvpPhone)").font(.footnote)
                }
                .padding()
                .background(Color(.systemBackground))
                .cornerRadius(12)
            }
            .padding()
        }
    }

    private var deniedReview: some View {
        VStack(spacing: 24) {
            Spacer()
            Image(systemName: "xmark.seal.fill")
                .font(.system(size: 75))
                .foregroundColor(.red)
            Text("Profile request denied")
                .font(.title)
                .bold()
            Text("An email was sent to \(session.email) with this decision. You can submit a new profile request if you want to try again.")
                .font(.headline)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
                .padding(.horizontal)
            Button("Submit a new request") {
                session.isMVPRegistered = false
                session.isMVPDenied = false
                session.saveProfileChanges()
                currentStep = 1
            }
            .buttonStyle(.borderedProminent)
            Spacer()
        }
    }

    private var pendingReview: some View {
        VStack(spacing: 24) {
            Spacer()
            Image(systemName: "paperplane.circle.fill")
                .font(.system(size: 75))
                .foregroundColor(.blue)
            Text("Thank you for signing up!")
                .font(.title)
                .bold()
            Text("We'll be in touch soon. Your app profile is ready on the Profile tab.")
                .font(.headline)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
                .padding(.horizontal)
            Spacer()
        }
    }

    private var registrationForm: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                Text("Build Your Profile").font(.title).bold()
                Text("MVP 2012 Arroyo Valley Setup").font(.subheadline).foregroundColor(.blue).bold()

                VStack(alignment: .leading, spacing: 12) {
                    Text("Full Name *").font(.caption).bold()
                    TextField("Enter full name (Type 'Admin' for test gateway)", text: $fullName)
                        .padding(10)
                        .background(Color(.systemGray6))
                        .cornerRadius(8)

                    Text("Email Address *").font(.caption).bold()
                    TextField("name@domain.com", text: $emailAddress)
                        .padding(10)
                        .background(Color(.systemGray6))
                        .cornerRadius(8)
                        .keyboardType(.emailAddress)
                        .textInputAutocapitalization(.never)

                    Text("Phone Number *").font(.caption).bold()
                    TextField("(555) 000-0000", text: $phoneNumber)
                        .padding(10)
                        .background(Color(.systemGray6))
                        .cornerRadius(8)
                        .keyboardType(.phonePad)

                    Text("Bio Description").font(.caption).bold()
                    TextEditor(text: $bioDescription)
                        .frame(height: 70)
                        .padding(4)
                        .background(Color(.systemGray6))
                        .cornerRadius(8)
                }
                .padding()
                .background(Color(.systemBackground))
                .cornerRadius(12)

                Button(action: submitProfile) {
                    GoldCTAButton(
                        title: "Submit Profile Information",
                        enabled: !(fullName.isEmpty || emailAddress.isEmpty || phoneNumber.isEmpty)
                    )
                }
                .disabled(fullName.isEmpty || emailAddress.isEmpty || phoneNumber.isEmpty)
            }
            .padding()
        }
    }

    private var adminGateway: some View {
        VStack(spacing: 20) {
            Spacer()
            Image(systemName: "lock.shield.fill")
                .font(.system(size: 60))
                .foregroundColor(.orange)
            Text("Admin Portal Gateway").font(.title2).fontWeight(.light).foregroundColor(RMCTheme.ivory)
            SecureField("Enter 1313 to activate profile", text: $adminPinInput)
                .padding(10)
                .background(Color(.systemBackground))
                .cornerRadius(8)
                .keyboardType(.numberPad)
                .padding(.horizontal, 24)
            Spacer()
            if adminPinInput == correctAdminPin {
                Button(action: {
                    withAnimation {
                        session.completeMVPRegistration(
                            name: fullName,
                            emailAddress: emailAddress,
                            phoneNumber: phoneNumber,
                            graduationYear: graduationYear,
                            bio: bioDescription,
                            adminApproved: true
                        )
                    }
                }) {
                    Text("Approve Admin Profile Portfolio")
                        .font(.headline)
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.green)
                        .cornerRadius(12)
                }
                .padding()
            }
        }
    }

    private func submitProfile() {
        let wantsAdmin = fullName.localizedCaseInsensitiveContains("admin")
        session.completeMVPRegistration(
            name: fullName,
            emailAddress: emailAddress,
            phoneNumber: phoneNumber,
            graduationYear: graduationYear,
            bio: bioDescription,
            adminApproved: false
        )
        if wantsAdmin {
            withAnimation { currentStep = 2 }
        }
    }
}
