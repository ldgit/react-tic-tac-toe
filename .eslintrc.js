module.exports = {
    "extends": "airbnb",
    "plugins": ["react-hooks"],
    "rules": {
      "no-use-before-define": ["error", { "functions": false, "classes": true }],
      "react/prop-types": ["off"] ,
      "react/jsx-one-expression-per-line": ["off"],
      'max-len': ['warn', 120, 2, {
        'ignoreUrls': false,
        'ignoreComments': false,
      }],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
    "env": {
        "browser": true,
        "mocha": true,
    }
};
