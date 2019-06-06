const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateLoginInput(value) {
  let errors = {};

  value.email = !isEmpty(value.email) ? value.email : "";
  value.password = !isEmpty(value.password) ? value.password : "";

  if (!validator.isEmail(value.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(value.email)) {
    errors.email = "Email field is required";
  }

  if (validator.isEmpty(value.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
