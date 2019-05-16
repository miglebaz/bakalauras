const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let warnings = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    warnings.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    warnings.email = 'Email field is required';
  }

  if (Validator.isEmpty(data.password)) {
    warnings.password = 'Password field is required';
  }

  return {
    warnings,
    isValid: isEmpty(warnings)
  };
};
