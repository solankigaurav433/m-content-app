module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env'
      }
    ],
    ['nativewind/babel'],
    ['react-native-reanimated/plugin']
  ]
};
