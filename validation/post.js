const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validatePostInput(value) {
  let errors = {};

  value.text = !isEmpty(value.text) ? value.text : "";
  value.theme = !isEmpty(value.theme) ? value.theme : "";

  if (!validator.isLength(value.text, { min: 2, max: 300 })) {
    errors.text = "Post must be between 2 and 300 characters";
  }

  if (validator.isEmpty(value.text)) {
    errors.text = "Text field is required";
  }

  if (!validator.isLength(value.theme, { min: 2, max: 20 })) {
    errors.theme = "Theme must be between 2 and 20 characters";
  }

  if (validator.isEmpty(value.theme)) {
    errors.theme = "Theme field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
