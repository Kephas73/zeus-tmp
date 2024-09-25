package com.example.java_native;

import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.webkit.ConsoleMessage;
import android.webkit.PermissionRequest;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

public class MainActivity extends AppCompatActivity {

    private static final int REQUEST_PERMISSIONS = 1;
    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Initialize Logger and create log file
        Logger.initLogFile(this);

        // Log app start
        Logger.log("App started.");

        // Initialize and configure WebView
        webView = findViewById(R.id.webView);
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setMediaPlaybackRequiresUserGesture(false);
        webSettings.setDomStorageEnabled(true);
        webSettings.setAllowFileAccess(true);
        webSettings.setAllowContentAccess(true);
        webSettings.setDatabaseEnabled(false);
        webSettings.setCacheMode(WebSettings.LOAD_NO_CACHE);

        // Set custom WebViewClient and WebChromeClient
        webView.setWebViewClient(new MyWebViewClient());
        webView.setWebChromeClient(new MyWebChromeClient());

        // Request permissions
        requestPermissions();

        // Load URL and clear cache
        webView.clearCache(true);
        webView.loadUrl("https://uchida.videoschat.net/");
    }

    private void requestPermissions() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA)
                != PackageManager.PERMISSION_GRANTED ||
                ContextCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO)
                        != PackageManager.PERMISSION_GRANTED) {

            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.CAMERA, Manifest.permission.RECORD_AUDIO},
                    REQUEST_PERMISSIONS);
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions,
                                           @NonNull int[] grantResults) {
        if (requestCode == REQUEST_PERMISSIONS) {
            for (int i = 0; i < permissions.length; i++) {
                if (grantResults.length > i && grantResults[i] == PackageManager.PERMISSION_GRANTED) {
                    Logger.log("Permission granted for: " + permissions[i]);
                } else {
                    Logger.log("Permission denied for: " + permissions[i]);
                }
            }
        }
    }

    private static class MyWebViewClient extends WebViewClient {

        @Override
        public void onPageStarted(WebView view, String url, android.graphics.Bitmap favicon) {
            super.onPageStarted(view, url, favicon);
            Logger.log("Page started loading: " + url);
        }

        @Override
        public void onPageFinished(WebView view, String url) {
            super.onPageFinished(view, url);
            Logger.log("Page finished loading: " + url);
        }

        @Override
        public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
            super.onReceivedError(view, errorCode, description, failingUrl);
            Logger.log("Error loading page: " + description + " URL: " + failingUrl);
        }

        @Override
        public void onReceivedHttpError(WebView view, WebResourceRequest request, android.webkit.WebResourceResponse errorResponse) {
            super.onReceivedHttpError(view, request, errorResponse);
            Logger.log("HTTP error: " + errorResponse.getStatusCode() + " URL: " + request.getUrl());
        }
    }

    private class MyWebChromeClient extends WebChromeClient {

        @Override
        public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
            Logger.log("Console message: " + consoleMessage.message() + " at line " + consoleMessage.lineNumber());
            return super.onConsoleMessage(consoleMessage);
        }

        @Override
        public void onProgressChanged(WebView view, int newProgress) {
            Logger.log("Page loading progress: " + newProgress + "%");
            super.onProgressChanged(view, newProgress);
        }

        @Override
        public void onPermissionRequest(final PermissionRequest request) {
            runOnUiThread(() -> {
                // Check if the request includes camera and/or microphone permissions
                for (String permission : request.getResources()) {
                    if (PermissionRequest.RESOURCE_VIDEO_CAPTURE.equals(permission) ||
                            PermissionRequest.RESOURCE_AUDIO_CAPTURE.equals(permission)) {

                        // If the permissions are granted, grant the request
                        if (ContextCompat.checkSelfPermission(MainActivity.this, Manifest.permission.CAMERA)
                                == PackageManager.PERMISSION_GRANTED &&
                                ContextCompat.checkSelfPermission(MainActivity.this, Manifest.permission.RECORD_AUDIO)
                                        == PackageManager.PERMISSION_GRANTED) {
                            request.grant(request.getResources());
                        } else {
                            // If not granted, log the denied permissions
                            Logger.log("Permissions denied for: " + permission);
                        }
                    }
                }
            });
        }
    }
}
