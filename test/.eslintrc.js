module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['react-hooks', 'chai-expect', 'chai-friendly'],
  rules: {
    'no-use-before-define': ['error', { functions: false, classes: true }],
    'react/prop-types': ['off'],
    'react/jsx-one-expression-per-line': ['off'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'chai-expect/missing-assertion': 'error',
    'chai-expect/terminating-properties': 'error',
    'chai-expect/no-inner-compare': 'error',
    'no-unused-expressions': 'off',
    'chai-friendly/no-unused-expressions': 'error',
  },
  env: {
    browser: true,
    mocha: true,
  },
  overrides: [
    {
      files: '*.test.js',
      globals: { testUtils: 'readonly' },
    },
  ],
};
