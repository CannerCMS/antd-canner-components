module.exports = {
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
  plugins: ["react", "flowtype", "prettier", "jest"],
  env: {
    browser: true,
    jest: true,
    node: true,
    es6: true,
  },
  rules: {
    "new-cap": 0,
    "max-len": 0,
    "require-jsdoc": 0,
    "no-return-assign": 0,
    "no-alert": 0,
    "no-implicit-coercion": 0,
    "react/display-name": 0,
    "react/prop-types": 0,
    radix: 0
  },
  parser: "babel-eslint",
  globals: {
  }
};
