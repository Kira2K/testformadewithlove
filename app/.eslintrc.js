module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'array-callback-return': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-v-text-v-html-on-component': 'off',
    'multiline-ternary': 'off'
  },
  overrides: [
    {
      files: [
        'src/**/*.{j,t}s?(x)'
      ],
      parserOptions: {
        parser: '@typescript-eslint/parser'
      },
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/prefer-namespace-keyword': 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-unused-vars': 'off'
      },
      extends: [
        '@vue/typescript/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'],
      plugins: [
        '@typescript-eslint'
      ]
    },
    {
      files: [
        'src/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
