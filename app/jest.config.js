module.exports = {
  moduleFileExtensions: ['js', 'json', 'vue'],
  verbose: true,
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.js$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: [
    '**/src/modules/**/*.spec.(js|ts)',
    '**/src/helpers/**/*.spec.(js|ts)',
    '**/src/components/**/*.spec.(js|ts)'
  ],
  testURL: 'http://localhost/'
}
