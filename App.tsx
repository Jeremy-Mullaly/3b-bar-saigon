/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {WebView} from 'react-native-webview';

function CustomHeader(): JSX.Element {
  return (
    <View style={styles.headerContainer}>
      <Image 
        source={require('./assets/logo.png')}
        style={styles.logo}
      />
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>3B Bar Saigon</Text>
      </View>
    </View>
  );
}

function App(): JSX.Element {
  const [currentView, setCurrentView] = useState('music'); // 'music' or 'beers'
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <CustomHeader />  {/* The header is here */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[
            styles.button,
            currentView === 'beers' && styles.activeButton
          ]}
          onPress={() => {
            setCurrentView('beers');
          }}
        >
          <Text style={styles.buttonText}>Beers</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.button,
            currentView === 'music' && styles.activeButton
          ]}
          onPress={() => {
            setCurrentView('music');
          }}
        >
          <Text style={styles.buttonText}>Music</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.webviewContainer}>
        {currentView === 'music' ? (
          <WebView 
            source={{uri: 'https://festify.us/party/-OGs-0NO0uyEjTo1UWcJ'}}
            style={styles.webview}
            renderLoading={() => (
              <ActivityIndicator 
                style={styles.loadingIndicator}
                size="large"
              />
            )}
            startInLoadingState={true}
            onError={(syntheticEvent) => {
              const {nativeEvent} = syntheticEvent;
              console.warn('WebView error: ', nativeEvent);
            }}
          />
        ) : (
          <WebView
            source={{ 
              uri: 'https://docs.google.com/presentation/d/1h11bytHRhra_gjpLgOKfW6HtcUgnIm2qxcI2ZwdJ-ws/edit?usp=sharing',
              headers: {
                'Accept': 'text/html'
              }
            }}
            style={styles.webview}
            renderLoading={() => (
              <ActivityIndicator 
                style={styles.loadingIndicator}
                size="large"
              />
            )}
            startInLoadingState={true}
            onError={(syntheticEvent) => {
              const {nativeEvent} = syntheticEvent;
              console.warn('WebView error: ', nativeEvent);
            }}
            allowsBackForwardNavigationGestures={true}
            onShouldStartLoadWithRequest={(request) => {
              return request.url.includes('docs.google.com');
            }}
            injectedJavaScript={`
              (function() {
                const style = document.createElement('style');
                style.textContent = \`
                  .docs-back-container { display: none !important; }
                  .docs-ml-header-item { display: none !important; }
                \`;
                document.head.appendChild(style);
              })();
              true;
            `}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
    backgroundColor: '#000000',
  },
  button: {
    backgroundColor: '#d1c187',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  webviewContainer: {
    flex: 1,  // This is crucial
  },
  webview: {
    flex: 1,  // This is also crucial
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#000000',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',  // Centers the text horizontally
    marginRight: 40,      // Offsets the logo width to ensure true center
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d1c187',
    textShadowColor: 'rgba(209, 193, 135, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  activeButton: {
    backgroundColor: '#b5a76f',
  },
  beersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  beersText: {
    fontSize: 24,
    color: '#000000',
  },
});

export default App;
