module.exports = {
  root: true,

  env: {
    'node': true
  },

  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],

  rules: {
    'vue/no-unused-vars': 'error',
    'no-unexpected-multiline': 'error',
    'no-else-return': 'error',
    'no-multi-spaces': 'error',
    'quotes': [2, 'single'],
    'no-var': 'error'
  },

  parserOptions: {
    'parser': 'babel-eslint'
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
