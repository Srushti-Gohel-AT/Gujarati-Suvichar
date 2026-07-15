export const shadows = {
  tabBar: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0x29 / 0xff,
    shadowRadius: 6,
    elevation: 2,
  },
  tabBarActivePill: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  headerBottom: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0x24 / 0xff,
    shadowRadius: 16,
    elevation: 6,
  },
  ratingBadge: {
    shadowColor: '#FFFAE3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 8,
  },
} as const;
