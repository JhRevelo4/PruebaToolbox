/**
 * Toolbox Mobile - Code Challenge React Native
 * Clean Architecture + Redux para estado global de auth.
 */
import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './src/store';
import AppContent from './src/presentation/AppContent';

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
        <AppContent />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
