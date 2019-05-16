const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
  let warnings = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  if (Validator.isEmpty(data.title)) {
    warnings.title = 'Job title field is required';
  }

  if (Validator.isEmpty(data.company)) {
    warnings.company = 'Company field is required';
  }

  if (Validator.isEmpty(data.from)) {
    warnings.from = 'From date field is required';
  }

  return {
    warnings,
    isValid: isEmpty(warnings)
  };
};
