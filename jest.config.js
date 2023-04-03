module.exports = {
  preset: 'react-native',
  setupFiles: [
    '<rootDir>/node_modules/react-native/jest/setup.js',
    'dotenv/config',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/test/setup.ts',
    '@testing-library/jest-native/extend-expect',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/e2e',
    'test/utils/test.ts',
    '/node_modules/@PaackEng',
    '/node_modules/rollbar-react-native',
    'app/infrastructure/api/api.ts',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@react-navigation|@storybook|@PaackEng|rollbar-react-native|@react-native-community|expo-localization|@unimodules|mobx-flipper|react-native-flipper|axios)',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|svg)$': '<rootDir>/test/assetsTransformer.js',
    '^~/test/(.*)$': '<rootDir>/test/$1',
    '^~/storybook/(.*)$': '<rootDir>/storybook/$1',
    '^~/(.*)$': '<rootDir>/app/$1',
  },
  testMatch: ['**/*.test.(ts|tsx)'],
  collectCoverageFrom: [
    'app/**/*.{js,ts,tsx}',
    '!<rootDir>/app/**/*.story.tsx',
  ],
  coveragePathIgnorePatterns: [
    '.mock.ts',
    '.interface.ts',
    '.styles.ts',
    'App.tsx',
    'auth-test.ts',
    'api.ts',
    'application.ts',
    'index.ts',
  ],
  globals: {
    __TEST__: true,
  },
};
