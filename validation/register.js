const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateNewUserInput(data) {
  let warnings = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.name, { min: 3, max: 27 })) {
    warnings.name = 'Vardą privalo sudaryti mažiausiai 3 raidės';
  };

  if (Validator.isEmpty(data.name)) {
    warnings.name = 'Vardas yra privalomas';
  };

  if (Validator.isEmpty(data.email)) {
    warnings.email = 'El. paštas yra privalomas';
  };

  if (!Validator.isEmail(data.email)) {
    warnings.email = 'Neteisingai įvestas el.paštas';
  };

  if (Validator.isEmpty(data.password)) {
    warnings.password = 'Slaptažodis yra privalomas';
  };

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    warnings.password = 'Slaptažodį turi sudaryti mažiausiai 6 simboliai';
  };

  if (Validator.isEmpty(data.password2)) {
    warnings.password2 = 'Pakartotinis slaptažodis yra privalomas';
  };

  if (!Validator.equals(data.password, data.password2)) {
    warnings.password2 = 'Slaptažodžiai privalo sutapti';
  };

  return {
    warnings,
    isValid: isEmpty(warnings)
  };
};
