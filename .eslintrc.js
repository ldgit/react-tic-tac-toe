module.exports = {
    "extends": "airbnb",
    "rules": {
      "no-use-before-define": ["error", { "functions": false, "classes": true }],
      "react/prop-types": ["off"] ,
      "react/jsx-one-expression-per-line": ["off"],
      'max-len': ['warn', 120, 2, {
        'ignoreUrls': false,
        'ignoreComments': false,
      }],
    },
    "env": {
        "browser": true,
        "mocha": true,
    }
};
