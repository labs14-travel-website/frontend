module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    "cypress/globals": true,
  },
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'cypress',
  ],
  rules: {
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions" : "off",
  },
  overrides: [
    {
        files: ["*.spec.js"],
        rules: {
            "react/jsx-filename-extension": "off"
        }
    }
  ]
};
