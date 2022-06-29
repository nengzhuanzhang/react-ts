module.exports = {
  // extends: ["react-app"],
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    // 'prettier/@typescript-eslint',
    "plugin:prettier/recommended",
  ],
  plugins: ["prettier", "@typescript-eslint"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parser: "@typescript-eslint/parser",
  },
  rules: {
    "prettier/prettier": "error",
  },
};
