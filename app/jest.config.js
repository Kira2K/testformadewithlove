module.exports = {
  moduleFileExtensions: ['js', 'json', 'vue', 'ts'],
  verbose: true,
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': '@vue/vue2-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: [
    '**/src/modules/**/*.spec.(js|ts)',
    '**/src/helpers/**/*.spec.(js|ts)',
    '**/src/helpers/*/*.spec.(js|ts)',
    '**/src/components/**/*.spec.(js|ts)'
  ],
  testURL: 'http://localhost:3000/'
}
