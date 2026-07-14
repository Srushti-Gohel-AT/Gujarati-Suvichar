import { useMemo } from 'react';
import { Share, Text, View } from 'react-native';
import { SettingsRow } from '../components/SettingsRow';
import { SettingsToggle } from '../components/SettingsToggle';
import {
  ChevronRightIcon,
  MoonIcon,
  ShareIcon,
  StarIcon,
} from '../components/icons';
import { getPlayStoreShareUrl, openPlayStore } from '../config/app';
import { strings } from '../i18n';
import { createThemedStyles, useTheme } from '../theme';

export function SettingsScreen() {
  const { isDark, setColorScheme, theme } = useTheme();
  const styles = useMemo(() => createSettingsStyles(theme), [theme]);

  const handleDarkModeToggle = (value: boolean) => {
    setColorScheme(value ? 'dark' : 'light');
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${strings.settings.shareMessage}\n${getPlayStoreShareUrl()}`,
        title: strings.settings.shareTitle,
      });
    } catch {
      // User dismissed share sheet
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.listSection}>
        <View style={styles.itemsGroup}>
          <SettingsRow
            label={strings.settings.darkTheme}
            icon={
              <MoonIcon
                color={theme.colors.settingsIcon}
                backgroundColor={theme.colors.iconCircleBg}
              />
            }
            rightElement={
              <SettingsToggle
                value={isDark}
                onValueChange={handleDarkModeToggle}
              />
            }
          />

          <SettingsRow
            label={strings.settings.shareApp}
            icon={
              <ShareIcon
                color={theme.colors.settingsIcon}
                backgroundColor={theme.colors.iconCircleBg}
              />
            }
            rightElement={<ChevronRightIcon color={theme.colors.textMuted} />}
            onPress={handleShare}
          />

          <SettingsRow
            label={strings.settings.rateApp}
            icon={
              <StarIcon
                color={theme.colors.settingsIcon}
                backgroundColor={theme.colors.iconCircleBg}
              />
            }
            rightElement={<ChevronRightIcon color={theme.colors.textMuted} />}
            onPress={openPlayStore}
          />
        </View>
      </View>

      <View style={styles.versionWrapper}>
        <Text style={styles.version}>{strings.settings.version}</Text>
      </View>
    </View>
  );
}

function createSettingsStyles(theme: ReturnType<typeof useTheme>['theme']) {
  const { settings: settingsLayout } = theme.components;

  return createThemedStyles(theme, t => ({
    container: {
      flex: 1,
      backgroundColor: t.colors.surface,
    },
    listSection: {
      paddingHorizontal: settingsLayout.listHorizontalPadding,
      paddingTop: settingsLayout.listTopPadding,
    },
    itemsGroup: {
      gap: settingsLayout.rowGap,
      width: '100%',
      maxWidth: 388,
      alignSelf: 'center',
    },
    versionWrapper: {
      marginTop: 'auto',
      marginBottom: settingsLayout.versionBottomMargin,
      paddingHorizontal: settingsLayout.listHorizontalPadding,
    },
    version: {
      ...t.typography.versionLabel,
      color: t.colors.textMuted,
      textAlign: 'center',
      includeFontPadding: false,
    },
  }));
}
