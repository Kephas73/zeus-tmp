import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{uri: 'https://example.likeness-online.com'}}
        style={styles.webview}
        media
        allowsFullscreenVideo={false}
        javaScriptEnabled={true}
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
