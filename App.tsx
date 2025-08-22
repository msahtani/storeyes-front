import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, AppState, StatusBar, Platform } from 'react-native';
import './src/i18n';
import { AppNavigator } from './src/navigation/AppNavigator';
import { SseContext } from './src/sse/sse-context';
import { SseProvider } from './src/sse/sse-provider';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

 
  // Au démarrage, on voit si on a déjà un token valide
  useEffect(() => {
    (async () => {
      try {
        // Retrieve token and expiry time
        const token = await SecureStore.getItemAsync('access_token');
        const tokenExpiryStr = await SecureStore.getItemAsync('token_expiry');

        // Check if token exists and is not expired
        if (token && tokenExpiryStr) {
          const tokenExpiry = parseInt(tokenExpiryStr, 10);
          const now = Date.now();

          // If token exists and is not expired, user is logged in
          // Otherwise, user needs to log in again
          if (now < tokenExpiry) {
            setIsLoggedIn(true);
          } else {
            // Clear expired tokens
            await Promise.all([
              SecureStore.deleteItemAsync('access_token'),
              SecureStore.deleteItemAsync('refresh_token'),
              SecureStore.deleteItemAsync('token_expiry'),
            ]);
            setIsLoggedIn(false);
          }
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsLoggedIn(false);
      }
    })();
  }, []);

  if (isLoggedIn === null) {
    // Chargement initial
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#2691A3" barStyle="light-content" translucent={false} />
      
      {/* Custom status bar background for Android */}
      {Platform.OS === 'android' && (
        <View style={{
          height: StatusBar.currentHeight || 0,
          backgroundColor: '#2691A3',
        }} />
      )}
      
      <SseProvider>
        <NavigationContainer>
        <AppNavigator
          isLoggedIn={isLoggedIn}
          onLogin={() => setIsLoggedIn(true)}
          onLogout={() => setIsLoggedIn(false)}
        />
        </NavigationContainer>
      </SseProvider>
    </View>
  );
}
