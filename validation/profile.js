const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateUsersProfileInput(data) {
  let warnings = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    warnings.handle = '';//handle needs to between 2 and 4 characters
  }

  if (Validator.isEmpty(data.handle)) {
    warnings.handle = 'Profile handle is required';
  }

  if (Validator.isEmpty(data.status)) {
    warnings.status = 'Status field is required';
  }

  if (Validator.isEmpty(data.skills)) {
    warnings.skills = 'Įgūdžiai yra privalomi';
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      warnings.website = 'Blogas adresas';
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      warnings.youtube = 'Blogas adresas';
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      warnings.twitter = 'Blogas adresas';
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      warnings.facebook = 'Blogas adresas';
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      warnings.linkedin = 'Blogas adresas';
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      warnings.instagram = 'Blogas adresas';
    }
  }

  return {
    warnings,
    isValid: isEmpty(warnings)
  };
};
