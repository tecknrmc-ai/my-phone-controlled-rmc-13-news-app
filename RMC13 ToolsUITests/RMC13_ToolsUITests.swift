import XCTest

final class RMC13_ToolsUITests: XCTestCase {
    func testLaunchReachesHome() {
        let app = XCUIApplication()
        app.launch()
        XCTAssertTrue(app.tabBars.firstMatch.waitForExistence(timeout: 20))
    }
}
