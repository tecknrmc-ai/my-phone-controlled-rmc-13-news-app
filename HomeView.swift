import SwiftUI

// MARK: - Persisted local account
struct StoredAccount: Codable, Equatable, Identifiable {
    var id: String { email }
    var username: String
    var email: String
    var password: String
    var phone: String
    var profileImage: String
    var isMVPRegistered: Bool
    var isMVPApproved: Bool
    var mvpGradYear: String
    var mvpPhone: String
    var mvpBio: String
    var isAdmin: Bool
    var isMVPDenied: Bool
    var requestedAt: Date?

    enum CodingKeys: String, CodingKey {
        case username, email, password, phone, profileImage
        case isMVPRegistered, isMVPApproved, mvpGradYear, mvpPhone, mvpBio, isAdmin
        case isMVPDenied, requestedAt
    }

    init(
        username: String,
        email: String,
        password: String,
        phone: String,
        profileImage: String,
        isMVPRegistered: Bool,
        isMVPApproved: Bool,
        mvpGradYear: String,
        mvpPhone: String,
        mvpBio: String,
        isAdmin: Bool,
        isMVPDenied: Bool = false,
        requestedAt: Date? = nil
    ) {
        self.username = username
        self.email = email
        self.password = password
        self.phone = phone
        self.profileImage = profileImage
        self.isMVPRegistered = isMVPRegistered
        self.isMVPApproved = isMVPApproved
        self.mvpGradYear = mvpGradYear
        self.mvpPhone = mvpPhone
        self.mvpBio = mvpBio
        self.isAdmin = isAdmin
        self.isMVPDenied = isMVPDenied
        self.requestedAt = requestedAt
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        username = try container.decode(String.self, forKey: .username)
        email = try container.decode(String.self, forKey: .email)
        password = try container.decode(String.self, forKey: .password)
        phone = try container.decode(String.self, forKey: .phone)
        profileImage = try container.decode(String.self, forKey: .profileImage)
        isMVPRegistered = try container.decode(Bool.self, forKey: .isMVPRegistered)
        isMVPApproved = try container.decode(Bool.self, forKey: .isMVPApproved)
        mvpGradYear = try container.decode(String.self, forKey: .mvpGradYear)
        mvpPhone = try container.decode(String.self, forKey: .mvpPhone)
        mvpBio = try container.decode(String.self, forKey: .mvpBio)
        isAdmin = try container.decode(Bool.self, forKey: .isAdmin)
        isMVPDenied = try container.decodeIfPresent(Bool.self, forKey: .isMVPDenied) ?? false
        requestedAt = try container.decodeIfPresent(Date.self, forKey: .requestedAt)
    }
}

// MARK: - Global Active Session Monitor Data Store
class UserSession: ObservableObject {
    static let shared = UserSession()

    @Published var hasAppProfile: Bool = false
    @Published var username: String = ""
    @Published var email: String = ""
    @Published var phone: String = ""
    @Published var profileImage: String = "person.crop.circle.fill"

    @Published var isMVPRegistered: Bool = false
    @Published var isMVPApproved: Bool = false
    @Published var isMVPDenied: Bool = false
    @Published var mvpGradYear: String = ""
    @Published var mvpPhone: String = ""
    @Published var mvpBio: String = ""
    @Published var isAdmin: Bool = false
    @Published var pendingProfileRequests: [StoredAccount] = []
    @Published var reviewedProfileRequests: [StoredAccount] = []

    private let accountsKey = "rmc13.accounts"
    private let currentEmailKey = "rmc13.currentEmail"

    private init() {
        restoreSession()
        refreshReviewQueues()
    }

    func createAccount(name: String, email: String, password: String, phone: String) -> String? {
        let normalizedEmail = email.lowercased()
        guard !name.isEmpty else { return "Enter your name." }
        guard normalizedEmail.contains("@") else { return "Enter a valid email." }
        guard password.count >= 4 else { return "Password must be at least 4 characters." }

        var accounts = loadAccounts()
        if let existing = accounts[normalizedEmail], !existing.password.isEmpty {
            return "An account with that email already exists. Sign in instead."
        }

        let existing = accounts[normalizedEmail]
        let isAdminAccount = existing?.isAdmin ?? name.localizedCaseInsensitiveContains("admin")
        let account = StoredAccount(
            username: name,
            email: normalizedEmail,
            password: password,
            phone: phone.isEmpty ? (existing?.phone ?? "") : phone,
            profileImage: existing?.profileImage ?? "person.crop.circle.fill",
            isMVPRegistered: existing?.isMVPRegistered ?? false,
            isMVPApproved: isAdminAccount ? true : false,
            mvpGradYear: existing?.mvpGradYear ?? "",
            mvpPhone: existing?.mvpPhone ?? phone,
            mvpBio: existing?.mvpBio ?? "",
            isAdmin: isAdminAccount,
            isMVPDenied: false,
            requestedAt: isAdminAccount ? existing?.requestedAt : Date()
        )
        accounts[normalizedEmail] = account
        saveAccounts(accounts)
        apply(account)
        persistCurrentEmail(normalizedEmail)
        refreshReviewQueues()
        return nil
    }

    func signIn(email: String, password: String) -> String? {
        let normalizedEmail = email.lowercased()
        let accounts = loadAccounts()
        guard let account = accounts[normalizedEmail] else {
            return "No account found for that email."
        }
        guard account.password == password else {
            return "Incorrect password."
        }
        apply(account)
        persistCurrentEmail(normalizedEmail)
        return nil
    }

    func signOut() {
        persistCurrentEmail(nil)
        hasAppProfile = false
        username = ""
        email = ""
        phone = ""
        profileImage = "person.crop.circle.fill"
        isMVPRegistered = false
        isMVPApproved = false
        isMVPDenied = false
        mvpGradYear = ""
        mvpPhone = ""
        mvpBio = ""
        isAdmin = false
    }

    func saveProfileChanges() {
        guard hasAppProfile, !email.isEmpty else { return }
        var accounts = loadAccounts()
        let key = email.lowercased()
        let existingPassword = accounts[key]?.password ?? ""
        accounts[key] = StoredAccount(
            username: username,
            email: key,
            password: existingPassword,
            phone: phone,
            profileImage: profileImage,
            isMVPRegistered: isMVPRegistered,
            isMVPApproved: isMVPApproved,
            mvpGradYear: mvpGradYear,
            mvpPhone: mvpPhone,
            mvpBio: mvpBio,
            isAdmin: isAdmin,
            isMVPDenied: isMVPDenied,
            requestedAt: accounts[key]?.requestedAt
        )
        saveAccounts(accounts)
        persistCurrentEmail(key)
        refreshReviewQueues()
    }

    /// Creates or updates the signed-in profile from MVP registration.
    func completeMVPRegistration(name: String, emailAddress: String, phoneNumber: String, graduationYear: String, bio: String, adminApproved: Bool) {
        let normalizedEmail = emailAddress.lowercased()
        username = name
        email = normalizedEmail
        phone = phoneNumber
        profileImage = "person.crop.circle.fill"
        hasAppProfile = true
        isMVPRegistered = true
        isMVPApproved = adminApproved
        isMVPDenied = false
        mvpGradYear = graduationYear
        mvpPhone = phoneNumber
        mvpBio = bio
        isAdmin = name.localizedCaseInsensitiveContains("admin")

        var accounts = loadAccounts()
        let existingPassword = accounts[normalizedEmail]?.password ?? ""
        accounts[normalizedEmail] = StoredAccount(
            username: name,
            email: normalizedEmail,
            password: existingPassword,
            phone: phoneNumber,
            profileImage: profileImage,
            isMVPRegistered: true,
            isMVPApproved: adminApproved,
            mvpGradYear: graduationYear,
            mvpPhone: phoneNumber,
            mvpBio: bio,
            isAdmin: isAdmin,
            isMVPDenied: false,
            requestedAt: adminApproved ? nil : Date()
        )
        saveAccounts(accounts)
        persistCurrentEmail(normalizedEmail)
        refreshReviewQueues()
    }

    /// Admin approve/deny is stored on the applicant account keyed by email.
    func reviewProfile(email: String, approved: Bool) -> StoredAccount? {
        let key = email.lowercased()
        var accounts = loadAccounts()
        guard var account = accounts[key] else { return nil }

        account.isMVPRegistered = true
        account.isMVPApproved = approved
        account.isMVPDenied = !approved
        accounts[key] = account
        saveAccounts(accounts)
        refreshReviewQueues()

        if self.email.lowercased() == key {
            apply(account)
        }
        return account
    }

    func decisionEmail(for account: StoredAccount, approved: Bool) -> (to: String, subject: String, body: String) {
        let to = account.email
        if approved {
            return (
                to,
                "Your RMC13 account was approved",
                """
                Hi \(account.username),

                Your RMC13 profile request for \(account.email) has been approved. You can open the app and view your profile.

                Thanks,
                RMC13 Admin
                """
            )
        }
        return (
            to,
            "Your RMC13 account was denied",
            """
            Hi \(account.username),

            Your RMC13 profile request for \(account.email) has been denied. If you think this was a mistake, submit a new profile request from the app.

            Thanks,
            RMC13 Admin
            """
        )
    }

    private func restoreSession() {
        guard let current = UserDefaults.standard.string(forKey: currentEmailKey) else { return }
        if let account = loadAccounts()[current.lowercased()] {
            apply(account)
        }
    }

    private func apply(_ account: StoredAccount) {
        hasAppProfile = true
        username = account.username
        email = account.email
        phone = account.phone
        profileImage = account.profileImage
        isMVPRegistered = account.isMVPRegistered
        isMVPApproved = account.isMVPApproved
        isMVPDenied = account.isMVPDenied
        mvpGradYear = account.mvpGradYear
        mvpPhone = account.mvpPhone
        mvpBio = account.mvpBio
        isAdmin = account.isAdmin
    }

    private func refreshReviewQueues() {
        let accounts = Array(loadAccounts().values)
        pendingProfileRequests = accounts
            .filter { !$0.isAdmin && !$0.isMVPApproved && !$0.isMVPDenied }
            .sorted { ($0.requestedAt ?? .distantPast) > ($1.requestedAt ?? .distantPast) }
        reviewedProfileRequests = accounts
            .filter { $0.isMVPApproved || $0.isMVPDenied }
            .sorted { ($0.requestedAt ?? .distantPast) > ($1.requestedAt ?? .distantPast) }
    }

    private func persistCurrentEmail(_ value: String?) {
        if let value {
            UserDefaults.standard.set(value, forKey: currentEmailKey)
        } else {
            UserDefaults.standard.removeObject(forKey: currentEmailKey)
        }
    }

    private func loadAccounts() -> [String: StoredAccount] {
        guard let data = UserDefaults.standard.data(forKey: accountsKey),
              let accounts = try? JSONDecoder().decode([String: StoredAccount].self, from: data) else {
            return [:]
        }
        return accounts
    }

    private func saveAccounts(_ accounts: [String: StoredAccount]) {
        if let data = try? JSONEncoder().encode(accounts) {
            UserDefaults.standard.set(data, forKey: accountsKey)
        }
    }
}

struct HomeView: View {
    @ObservedObject var session = UserSession.shared
    @Binding var selectedTab: Int // Links directly to bottom tab menu index switches
    
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 26) {
                    RMCBrandTitle(size: 48)
                        .padding(.top, 6)

                    // MARK: - Main story carousel
                    FlashyCarouselView(
                        title: nil,
                        items: CarouselItem.homeMainStory,
                        cardWidth: UIScreen.main.bounds.width - 64,
                        cardHeight: 230
                    )

                    // MARK: - Top headliner
                    VStack(alignment: .leading, spacing: 14) {
                        PosterTitle(text: "HEADLINER", size: 16, color: RMCTheme.gold)
                            .padding(.horizontal)

                        PosterTitle(text: "RMC13 Brings Film, Audio, Animation, Video games, and more to one location.", size: 28)
                            .padding(.horizontal)

                        FlashyCarouselView(
                            title: nil,
                            items: CarouselItem.homeHeadliner,
                            cardWidth: UIScreen.main.bounds.width - 80,
                            cardHeight: 220
                        )
                    }
                    
                    // MARK: - 1. Top Featured Hero Image Banner Layout
                    FeedPhotoFrame(postKey: "feed-breaking")
                        .padding(.horizontal)

                    // MARK: - Headline photos carousel
                    FlashyCarouselView(
                        title: "Headline Photos",
                        items: CarouselItem.homeHeadlines,
                        cardWidth: UIScreen.main.bounds.width - 80,
                        cardHeight: 220
                    )
                    
                    Rectangle()
                        .fill(RMCTheme.gold.opacity(0.35))
                        .frame(height: 0.6)
                        .padding(.horizontal)

                    // MARK: - Home Sub Menu
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Explore RMC13")
                            .font(.headline)
                            .fontWeight(.light)
                            .foregroundColor(RMCTheme.gold)
                            .padding(.horizontal)

                        ForEach(HomeSection.allCases) { section in
                            NavigationLink(destination: section.destination) {
                                HStack(spacing: 12) {
                                    Image(systemName: section.symbol)
                                        .font(.title3)
                                        .foregroundColor(RMCTheme.gold)
                                        .frame(width: 28)
                                    Text(section.title)
                                        .font(.headline)
                                        .foregroundColor(RMCTheme.ivory)
                                        .multilineTextAlignment(.leading)
                                    Spacer()
                                    Image(systemName: "chevron.right")
                                        .foregroundColor(RMCTheme.gold.opacity(0.7))
                                }
                                .padding()
                                .goldCard()
                            }
                        }
                    }
                    .padding(.horizontal)
                    
                    // MARK: - 2. MVP Section Dashboard Row
                    NavigationLink(destination: MVPView()) {
                        HStack(spacing: 16) {
                            Image("MVP_Main")
                                .resizable()
                                .aspectRatio(contentMode: .fill)
                                .frame(width: 50, height: 50)
                                .clipped()
                                .goldTrim(cornerRadius: 8)
                            
                            VStack(alignment: .leading, spacing: 4) {
                                Text("MVP Dashboard")
                                    .font(.headline)
                                    .foregroundColor(RMCTheme.ivory)
                                
                                Text("Join the Mvp 2012 Arroyo Valley video game community as a player, coach, fan, or gamer.")
                                    .font(.subheadline)
                                    .foregroundColor(RMCTheme.muted)
                                    .multilineTextAlignment(.leading)
                                    .lineLimit(3)
                            }
                            Spacer()
                            Image(systemName: "chevron.right")
                                .foregroundColor(RMCTheme.gold.opacity(0.7))
                        }
                        .padding()
                        .goldCard()
                    }
                    .padding(.horizontal)
                    
                    // MARK: - 3. RMC136AZone View Block Promo Card
                    VStack(alignment: .leading, spacing: 12) {
                        PosterTitle(text: "rmc136azone", size: 20, color: RMCTheme.gold)
                        ZStack(alignment: .topTrailing) {
                            NavigationLink(destination: RMC136AZoneDetailView()) {
                                FeedImage(postKey: "section-zone-card", showsFitBar: false)
                                    .goldTrim()
                            }
                            .buttonStyle(.plain)
                            FeedPostMenu(postKey: "section-zone-card")
                                .padding(8)
                        }
                        FitChoiceBar(postKey: "section-zone-card")
                        NavigationLink(destination: RMC136AZoneDetailView()) {
                            HStack {
                                VStack(alignment: .leading, spacing: 4) {
                                    PosterTitle(text: "Inside the 136Zone Experience", size: 24)
                                    Text("Explore tactical shifts, zones, and custom alien catalog metrics.")
                                        .font(.subheadline)
                                        .foregroundColor(RMCTheme.muted)
                                }
                                Spacer()
                                Image(systemName: "chevron.right")
                                    .foregroundColor(RMCTheme.gold.opacity(0.7))
                            }
                        }
                        .buttonStyle(.plain)
                    }
                    .padding(.horizontal)
                }
                .padding(.vertical)
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
            .safeAreaInset(edge: .top, spacing: 0) {
                RMCSeasonBar()
            }
            // MARK: - Top Left App Profile Action Button Bubble
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button(action: {
                        withAnimation { selectedTab = 3 }
                    }) {
                        HStack(spacing: 8) {
                            if session.hasAppProfile {
                                ProfileGoldRing(systemImage: session.profileImage, diameter: 32)
                                Text(session.username)
                                    .font(.subheadline).bold()
                                    .foregroundColor(RMCTheme.ivory)
                            } else {
                                ProfileGoldRing(systemImage: "person.crop.circle.badge.plus", diameter: 32)
                                Text("Sign In")
                                    .font(.subheadline).bold()
                                    .foregroundColor(RMCTheme.gold)
                            }
                        }
                    }
                }
            }
        }
    }
}

