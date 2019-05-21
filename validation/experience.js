const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateUsersExpInput(data) {
  let warnings = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  if (Validator.isEmpty(data.title)) {
    warnings.title = 'Darbo arba veiklos pavadinimas yra privalomas';
  }

  if (Validator.isEmpty(data.company)) {
    warnings.company = 'Kompanijos arba įstaigos pavadinimas yra privalomas';
  }

  if (Validator.isEmpty(data.from)) {
    warnings.from = 'Pradžios data yra privaloma';
  }

  return {
    warnings,
    isValid: isEmpty(warnings)
  };
};
