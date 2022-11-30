module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    '@babel/preset-env'
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-class-properties',
    '@babel/plugin-proposal-private-methods',
    '@babel/plugin-proposal-nullish-coalescing-operator'
  ]
}
