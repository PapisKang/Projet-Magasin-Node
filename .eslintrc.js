module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: [
    'standard',
    "plugin:jsdoc/recommended"
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ["jsdoc"],
  rules: {
  }
}
