import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import { WebView } from 'react-native-webview';
import RNFS from 'react-native-fs';

const App = () => {
  useEffect(() => {
    requestFilePermission();
  }, []);

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
        Alert.alert('Permission Denied', 'You need to grant storage permission to save logs.');
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  async function logToFile(message) {
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );

    if (!hasPermission) {
      console.log('Storage permission not granted');
      return;
    }

    const directoryPath = `${RNFS.ExternalDirectoryPath}/MyAppLogs`;
    const filePath = `${directoryPath}/webview_logs.txt`;

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

  const logEvent = (eventName, data) => {
    const message = `${eventName}: ${JSON.stringify(data)}`;
    console.log(message);
    logToFile(message);
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: 'https://videoschat.net/' }}
        style={styles.webview}
        javaScriptEnabled={true}
        onLoadStart={syntheticEvent => {
          logEvent('Page Load Start', syntheticEvent.nativeEvent);
        }}
        onLoadEnd={syntheticEvent => {
          logEvent('Page Load End', syntheticEvent.nativeEvent);
        }}
        onError={syntheticEvent => {
          logEvent('Page Error', syntheticEvent.nativeEvent);
        }}
        onHttpError={syntheticEvent => {
          logEvent('HTTP Error', syntheticEvent.nativeEvent);
        }}
        onConsoleMessage={syntheticEvent => {
          logEvent('Console Message', syntheticEvent.nativeEvent);
        }}
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
