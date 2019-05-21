const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateUsersLogInput(data) {
  let warnings = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    warnings.email = 'El. paštas yra neteisingas';
  }

  if (Validator.isEmpty(data.email)) {
    warnings.email = 'El. paštas yra privalomas';
  }

  if (Validator.isEmpty(data.password)) {
    warnings.password = 'Slaptažodis yra  field yra privalomas';
  }

  return {
    warnings,
    isValid: isEmpty(warnings)
  };
};
