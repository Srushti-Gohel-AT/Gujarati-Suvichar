export const strings = {
  app: {
    title: 'ગુજરાતી સુવિચાર',
    headerAccessibilityLabel: 'મનપસંદ સુવિચાર',
  },
  tabs: {
    home: 'હોમ',
    categories: 'શ્રેણીઓ',
    posts: 'પોસ્ટ ફીડ',
    settings: 'સેટિંગ્સ',
  },
  screens: {
    home: {
      title: 'સુવિચાર',
      subtitle: 'Welcome to Gujarati Suvichar',
    },
    categories: {
      title: 'શ્રેણીઓ',
      subtitle: 'Browse quote categories',
    },
    posts: {
      title: 'પોસ્ટ ફીડ',
      subtitle: 'Browse posts',
    },
    likedQuotes: {
      title: 'મનપસંદ સુવિચાર',
      subtitle: 'Your liked quotes will appear here',
    },
  },
  navigation: {
    likedQuotesTitle: 'મનપસંદ સુવિચાર',
  },
  settings: {
    darkTheme: 'ડાર્ક થીમ',
    shareApp: 'એપ શેર કરો',
    rateApp: 'એપને રેટિંગ આપો',
    shareMessage:
      'ગુજરાતી સુવિચાર એપ ડાઉનલોડ કરો — રોજ નવા સુવિચાર વાંચો!',
    shareTitle: 'ગુજરાતી સુવિચાર',
    version: 'વર્ઝન 1.0.0',
  },
  rating: {
    title: 'તમને અમારી એપનો અનુભવ કેવો લાગ્યો?',
    submit: 'સબમિટ કરો',
    dismiss: 'હાલ નહીં, આભાર!',
    starAccessibilityLabel: (value: number) => `${value} સ્ટાર`,
  },
} as const;
