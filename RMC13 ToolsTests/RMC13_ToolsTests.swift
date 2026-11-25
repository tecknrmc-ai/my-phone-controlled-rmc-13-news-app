import XCTest
@testable import RMC13_Tools

final class RMC13_ToolsTests: XCTestCase {
    func testHomeRowUsesFiveBeats() {
        XCTAssertEqual(StudioLogic.rowBeats(MockCatalog.beats).count, 5)
    }
}
