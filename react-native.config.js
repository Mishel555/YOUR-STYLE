module.exports = {
  project: {
    ios: {},
    android: {},
  },
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        // get rid auto linking for manual fonts import
        ios: null,
      },
    },
  },
  assets: ['./assets/fonts/'],
};
