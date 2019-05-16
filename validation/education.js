const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
  let warnings = {};

  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  if (Validator.isEmpty(data.school)) {
    warnings.school = 'School field is required';
  }

  if (Validator.isEmpty(data.degree)) {
    warnings.degree = 'Degree field is required';
  }

  if (Validator.isEmpty(data.fieldofstudy)) {
    warnings.fieldofstudy = 'Field of study field is required';
  }

  if (Validator.isEmpty(data.from)) {
    warnings.from = 'From date field is required';
  }

  return {
    warnings,
    isValid: isEmpty(warnings)
  };
};
