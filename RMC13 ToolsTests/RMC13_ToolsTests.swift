import XCTest
@testable import RMC13_Tools

final class RMC13_ToolsTests: XCTestCase {
    func testHomeListsDesktopBeats() {
        XCTAssertEqual(MockCatalog.beats.count, 25)
        XCTAssertEqual(MockCatalog.beats.first?.title, "Breakneck Halo 2")
        XCTAssertEqual(MockCatalog.beats.map(\.title).prefix(14), [
            "Breakneck Halo 2",
            "Breakneck Halo 3",
            "Clock Hands to the Floor 2",
            "Clock Hands to the Floor",
            "Cold Night Come-Up 2",
            "Cold Night Come-Up",
            "Desert Freeway Bhangra",
            "High Class Highlight",
            "High-Rise Flex",
            "Midnight Cypher Chase 2",
            "Midnight Cypher Chase",
            "Midnight Sprint 2",
            "Midnight Sprint",
            "Run It Like Money"
        ])
    }
}
