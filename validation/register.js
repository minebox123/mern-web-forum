const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegisterInput(value) {
  let errors = {};

  value.username = !isEmpty(value.username) ? value.username : "";
  value.email = !isEmpty(value.email) ? value.email : "";
  value.password = !isEmpty(value.password) ? value.password : "";
  value.password2 = !isEmpty(value.password2) ? value.password2 : "";

  if (!validator.isLength(value.username, { min: 2, max: 30 })) {
    errors.username = "Username must be between 2 and 30 characters";
  }

  if (validator.isEmpty(value.username)) {
    errors.username = "Username field is required";
  }

  if (validator.isEmpty(value.email)) {
    errors.email = "Email field is required";
  }

  if (!validator.isEmail(value.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(value.password)) {
    errors.password = "Password field is required";
  }

  if (!validator.isLength(value.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (validator.isEmpty(value.password2)) {
    errors.password2 = "Confirm field is required";
  }

  if (!validator.equals(value.password, value.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
