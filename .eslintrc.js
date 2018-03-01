module.exports = {
  parser: 'babel-eslint',
  extends: ['prettier', 'airbnb'],
  rules: {
    "react/forbid-prop-types": 0,
    "react/jsx-filename-extension": 0,
    "no-const-assign": 0,
    "no-return-assign": 0,
  },
  globals: {
    window: true,
  }
};