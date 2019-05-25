const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateUsersPostInput(data) {
  let warnings = {};

  data.text = !isEmpty(data.text) ? data.text : '';

  if (!Validator.isLength(data.text, { min: 9, max: 345 })) {
    warnings.text = 'Skelbimas turi būti mažiausiai 9 simbolių';
  }

  if (Validator.isEmpty(data.text)) {
    warnings.text = 'Teksto laukas yra privalomas';
  }

  return {
    warnings,
    isValid: isEmpty(warnings)
  };
};
