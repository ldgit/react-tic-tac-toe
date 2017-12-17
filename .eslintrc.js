module.exports = {
    "extends": "airbnb",
    "rules": {
      "no-use-before-define": ["error", { "functions": false, "classes": true }],
      "react/prop-types": ["off"] ,
    },
    "env": {
        "browser": true,
        "mocha": true,
    }
};
