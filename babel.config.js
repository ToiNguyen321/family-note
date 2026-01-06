module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.jsx',
          '.json',
          '.tsx',
          '.ts',
        ],
        alias: {
          '@': './src',
          '@/types': './src/types',
          '@/services': './src/services',
          '@/hooks': './src/hooks',
          '@/presentation': './src/presentation',
          '@/components': './src/presentation/components',
          '@/screens': './src/presentation/screens',
          '@/navigation': './src/presentation/navigation',
        },
      },
    ],
  ],
};
