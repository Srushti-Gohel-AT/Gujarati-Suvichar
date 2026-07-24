import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation/RootNavigator';
import { navigationRef } from './src/navigation/rootNavigation';
import { ThemeProvider, useNavigationTheme, useTheme } from './src/theme';

function AppContent() {
  const { isDark, theme } = useTheme();
  const navigationTheme = useNavigationTheme();

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.header.background}
        translucent={false}
      />
      <NavigationContainer
        ref={navigationRef}
        theme={navigationTheme}
        onReady={() => BootSplash.hide({ fade: true })}>
        <RootNavigator />
      </NavigationContainer>
    </>
  );
}

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
