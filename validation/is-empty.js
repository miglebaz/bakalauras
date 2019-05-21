const isEmpty = value =>
  value === undefined ||
  value === null ||
  //check if this an object and if an empty object
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

module.exports = isEmpty;
