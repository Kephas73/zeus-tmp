import SwiftUI
import WebKit

// Định nghĩa WebViewController
class WebViewController: UIViewController {
    var webView: WKWebView!

    override func viewDidLoad() {
        super.viewDidLoad()

        let webConfiguration = WKWebViewConfiguration()
        let userContentController = WKUserContentController()
        let scriptSource = """
        document.addEventListener('webkitfullscreenchange', function() {
            if (document.webkitIsFullScreen) {
                document.webkitExitFullscreen();
            }
        });
        """
        let script = WKUserScript(source: scriptSource, injectionTime: .atDocumentEnd, forMainFrameOnly: true)
        userContentController.addUserScript(script)
        webConfiguration.userContentController = userContentController
        webConfiguration.allowsInlineMediaPlayback = true
        webConfiguration.preferences.javaScriptCanOpenWindowsAutomatically = true

        webView = WKWebView(frame: self.view.bounds, configuration: webConfiguration)
        webView.uiDelegate = self
        self.view.addSubview(webView)

        if let url = URL(string: "https://example.likeness-online.com") {
            let request = URLRequest(url: url)
            webView.load(request)
        }
    }
}

extension WebViewController: WKUIDelegate {}

// Tạo UIViewControllerRepresentable Wrapper
struct WebViewControllerRepresentable: UIViewControllerRepresentable {
    func makeUIViewController(context: Context) -> WebViewController {
        return WebViewController()
    }

    func updateUIViewController(_ uiViewController: WebViewController, context: Context) {
        // Cập nhật UIViewController nếu cần
    }
}
