import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:path_provider/path_provider.dart';
import 'package:permission_handler/permission_handler.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  late InAppWebViewController webViewController;
  final String initialUrl = "https://uchida.videoschat.net/";

  @override
  void initState() {
    super.initState();
    requestPermissions();
  }

  Future<void> requestPermissions() async {
    if (Platform.isAndroid) {
      var storageStatus = await Permission.storage.status;
      var cameraStatus = await Permission.camera.status;
      var micStatus = await Permission.microphone.status;

      if (!storageStatus.isGranted) {
        await Permission.storage.request();
      }
      if (!cameraStatus.isGranted) {
        await Permission.camera.request();
      }
      if (!micStatus.isGranted) {
        await Permission.microphone.request();
      }
    }
  }

  Future<String> getLogFilePath() async {
    final directory = await getExternalStorageDirectory();
    final directoryPath = "${directory!.path}/MyAppLogs";
    final filePath = "$directoryPath/_joinRoom-Android-Flutter.txt";

    final dir = Directory(directoryPath);
    if (!(await dir.exists())) {
      await dir.create(recursive: true);
    }

    return filePath;
  }

  Future<void> logToFile(String message) async {
    try {
      final filePath = await getLogFilePath();
      final logMessage = "${DateTime.now().toIso8601String()}: $message\n";
      final file = File(filePath);
      await file.writeAsString(logMessage, mode: FileMode.append, flush: true);
      print('Log saved to: $filePath');
    } catch (e) {
      print('Error saving log: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: SafeArea(
          child: InAppWebView(
            initialUrlRequest: URLRequest(url: Uri.parse(initialUrl)),
            onWebViewCreated: (controller) {
              webViewController = controller;
            },
            initialOptions: InAppWebViewGroupOptions(
                ios: IOSInAppWebViewOptions(
              allowsInlineMediaPlayback: true,
              allowsAirPlayForMediaPlayback: true,
              allowsPictureInPictureMediaPlayback: true,
            )),
            onLoadStop: (controller, url) async {
              await webViewController.evaluateJavascript(source: """
                (function() {
                  function interceptConsole(method) {
                    var original = console[method];
                    console[method] = function() {
                      var message = Array.prototype.slice.call(arguments).join(' ');
                      window.flutter_inappwebview.callHandler('consoleMessage', method, message);
                      original.apply(console, arguments);
                    };
                  }
                  ['log', 'warn', 'error'].forEach(interceptConsole);
                })();
              """);
            },
            onConsoleMessage: (controller, consoleMessage) async {
              final message =
                  "Console Log [${consoleMessage.messageLevel}]: ${consoleMessage.message}";
              await logToFile(message);
              print(message);
            },
            androidOnPermissionRequest: (controller, origin, resources) async {
              return PermissionRequestResponse(
                  resources: resources,
                  action: PermissionRequestResponseAction.GRANT);
            },
          ),
        ),
      ),
    );
  }
}
