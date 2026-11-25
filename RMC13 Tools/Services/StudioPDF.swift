import Foundation

enum StudioPDF {
    static func make(lines: [String]) -> Data {
        let escaped = lines.map { escape(String($0.prefix(95))) }
        var stream = "BT /F1 12 Tf 16 TL 54 740 Td\n"
        for (index, line) in escaped.enumerated() {
            if index > 0 { stream += "T*\n" }
            stream += "(\(line)) Tj\n"
        }
        stream += "ET"
        let objects = [
            "<< /Type /Catalog /Pages 2 0 R >>",
            "<< /Type /Pages /Count 1 /Kids [3 0 R] >>",
            "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>",
            "<< /Length \(stream.utf8.count) >>\nstream\n\(stream)\nendstream",
            "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"
        ]
        var output = "%PDF-1.4\n"
        var offsets = [0]
        for (index, object) in objects.enumerated() {
            offsets.append(output.utf8.count)
            output += "\(index + 1) 0 obj\n\(object)\nendobj\n"
        }
        let xrefStart = output.utf8.count
        output += "xref\n0 \(objects.count + 1)\n"
        output += "0000000000 65535 f \n"
        for offset in offsets.dropFirst() {
            output += String(format: "%010d 00000 n \n", offset)
        }
        output += "trailer << /Size \(objects.count + 1) /Root 1 0 R >>\nstartxref\n\(xrefStart)\n%%EOF"
        return Data(output.utf8)
    }

    private static func escape(_ text: String) -> String {
        text
            .replacingOccurrences(of: "\\", with: "\\\\")
            .replacingOccurrences(of: "(", with: "\\(")
            .replacingOccurrences(of: ")", with: "\\)")
    }
}
