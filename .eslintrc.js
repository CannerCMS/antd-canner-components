module.exports = {
  "extends": [
    "prettier",
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "plugins": [
    "react",
    "prettier"
  ],
  "env": {
    "browser": true
  },
  "rules": {
    "prettier/prettier": "error",
    "new-cap": [2, {"capIsNewExceptions": ["CSSModules", "List"]}],
    "max-len": 0,
    "require-jsdoc": 0,
    "no-return-assign": 0,
    "no-alert": 0,
    "no-implicit-coercion": 0,
    "radix": 0
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
      "modules": true
    }
  },
  globals: {
    defaultProps: true,
    otherProps: true
  }
};