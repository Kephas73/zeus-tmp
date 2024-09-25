import SwiftUI
import WebKit
import UIKit

// Định nghĩa WebViewController
class WebViewController: UIViewController, WKScriptMessageHandler, WKUIDelegate {
    var webView: WKWebView!

    override func viewDidLoad() {
        super.viewDidLoad()

        let webConfiguration = WKWebViewConfiguration()
        let userContentController = WKUserContentController()
        let scriptSource = """
                (function() {
                    window.webkit.messageHandlers.consoleLog.postMessage({type: 'test', message: 'console log connected!'});
                    function interceptConsole(method) {
                        var original = console[method];
                        console[method] = function() {
                            var message = Array.prototype.slice.call(arguments).join(' ');
                            if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.consoleLog) {
                                window.webkit.messageHandlers.consoleLog.postMessage({type: method, message: message});
                            }
                            original.apply(console, arguments);
                        };
                    }
                    ['log', 'warn', 'error'].forEach(interceptConsole);
                })();
        document.addEventListener('webkitfullscreenchange', function() {
            if (document.webkitIsFullScreen) {
                document.webkitExitFullscreen();
            }
        });
        """
        let script = WKUserScript(source: scriptSource, injectionTime: .atDocumentEnd, forMainFrameOnly: true)
        userContentController.add(self, name: "consoleLog")
        userContentController.addUserScript(script)
        webConfiguration.allowsInlineMediaPlayback = true
        webConfiguration.preferences.javaScriptCanOpenWindowsAutomatically = true
        webConfiguration.userContentController = userContentController

        webView = WKWebView(frame: self.view.bounds, configuration: webConfiguration)
        webView.uiDelegate = self
        self.view.addSubview(webView)

        if let url = URL(string: "https://uchida.videoschat.net") {
            let request = URLRequest(url: url)
            webView.load(request)
            webView.evaluateJavaScript("document.readyState", completionHandler: { (result, error) in
                if let readyState = result as? String, readyState == "complete" {
                    print("Dom loaded!")
                }
            })
        }
    }

    // Xử lý các thông điệp từ JavaScript
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        if let messageBody = message.body as? [String: String],
           let type = messageBody["type"],
           let logMessage = messageBody["message"] {
            print("Console \(type): \(logMessage)")
        }
    }
}

// Tạo UIViewControllerRepresentable Wrapper
struct WebViewControllerRepresentable: UIViewControllerRepresentable {
    func makeUIViewController(context: Context) -> WebViewController {
        return WebViewController()
    }

    func updateUIViewController(_ uiViewController: WebViewController, context: Context) {
        // Cập nhật UIViewController nếu cần
    }
}
