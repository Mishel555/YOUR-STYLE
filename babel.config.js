module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module-resolver', {
      root: ['./src'],
      extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
      alias: {
        '@assets': './assets',
        '@constants': './src/constants',
        '@components': './src/components',
        '@contexts': './src/contexts',
        '@providers': './src/providers',
        '@screens': './src/screens',
        '@services': './src/services',
        '@utils': './src/utils',
        '@hooks': './src/hooks',
        '@hocs': './src/hocs',
        '@types': './src/constants/types'
      }
    }],
    ['module:react-native-dotenv', {
      'moduleName': '@env',
      'path': '.env',
      'blacklist': null,
      'whitelist': null,
      'safe': false,
      'allowUndefined': true
    }]
  ]
};
