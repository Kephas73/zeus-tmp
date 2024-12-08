import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import { WebView } from 'react-native-webview';
import RNFS from 'react-native-fs';

const App = () => {
  useEffect(() => {
    requestFilePermission();
  }, []);

  const injectedJavaScript = `
    (function() {
      function interceptConsole(method) {
        var original = console[method];
        console[method] = function() {
          var message = Array.prototype.slice.call(arguments).join(' ');
          window.ReactNativeWebView.postMessage(JSON.stringify({type: method, message: message}));
          original.apply(console, arguments);
        };
      }
      ['log', 'warn', 'error'].forEach(interceptConsole);
    })();
  `;

  async function requestFilePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Needed',
          message: 'This app needs access to your storage to save log files.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission granted');
        return true;
      } else {
        Alert.alert(
          'Permission Denied',
          'You need to grant storage permission to save logs.',
        );
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  async function logToFile(message: string) {
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );

    if (!hasPermission) {
      console.log('Storage permission not granted');
      return;
    }

    const directoryPath = `${RNFS.ExternalDirectoryPath}/MyAppLogs`;
    const filePath = `${directoryPath}/_joinRoom-Android-ReactNative.txt`;

    // Create directory if it doesn't exist
    const directoryExists = await RNFS.exists(directoryPath);
    if (!directoryExists) {
      await RNFS.mkdir(directoryPath);
    }

    const logMessage = `${new Date().toISOString()}: ${message}\n`;

    RNFS.appendFile(filePath, logMessage, 'utf8')
      .then(() => console.log('Log saved to:', filePath))
      .catch(err => console.log('Error saving log:', err));
  }

  const onMessage = (event: any) => {
    try {
      const log = JSON.parse(event.nativeEvent.data);
      logToFile(`Console Log [${log.type}]: ${log.message}`);
      console.log(`Console Log [${log.type}]: ${log.message}`);
    } catch (e) {
      console.error('Failed to parse message:', event.nativeEvent.data);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: 'https://uchida.videoschat.net/' }}
        style={styles.webview}
        javaScriptEnabled={true}
        injectedJavaScript={injectedJavaScript}
        onMessage={onMessage}
        allowsFullscreenVideo={false}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        onLoad={() => console.log('Page Loaded')}
        onLoadEnd={() => console.log('Page Load Ended')}
        onError={error => console.log('Error loading page:', error)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default App;
