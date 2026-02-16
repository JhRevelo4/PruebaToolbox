module.exports = {
  preset: 'react-native',
  testMatch: ['**/__tests__/**/*.test.(js|tsx)'],
  modulePathIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/__mocks__/SvgMock.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-.*)/)',
  ],
};
