module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['react-hooks'],
  rules: {
    'no-use-before-define': ['error', { functions: false, classes: true }],
    'react/prop-types': ['off'],
    'react/jsx-one-expression-per-line': ['off'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  env: {
    browser: true,
  },
};
