const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateProfileInput(value) {
  let errors = {};

  value.experience = !isEmpty(value.experience) ? value.experience : "";

  if (validator.isEmpty(value.experience)) {
    errors.experience = "Experience field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
