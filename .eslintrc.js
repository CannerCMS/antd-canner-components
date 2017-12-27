module.exports = {
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
  plugins: ["react", "flowtype", "prettier"],
  env: {
    browser: true
  },
  rules: {
    "new-cap": [2, { capIsNewExceptions: ["CSSModules", "List"] }],
    "max-len": 0,
    "require-jsdoc": 0,
    "no-return-assign": 0,
    "no-alert": 0,
    "no-implicit-coercion": 0,
    radix: 0
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2017,
    ecmaFeatures: {
      jsx: true,
      modules: true
    }
  },
  globals: {
    process: true,
    defaultProps: true,
    otherProps: true
  }
};
