import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation/RootNavigator';
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
        theme={navigationTheme}
        onReady={() => BootSplash.hide({ fade: true })}>
        <RootNavigator />
      </NavigationContainer>
    </>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
