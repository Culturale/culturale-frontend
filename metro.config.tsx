const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig(__dirname);

  return {
    resolver: {
      extraNodeModules: {
        'react-native-svg': 'react-native-svg',
      },
      sourceExts,
      assetExts,
    },
  };
})();
