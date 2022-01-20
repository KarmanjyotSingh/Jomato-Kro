const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function check_register_data(data) {
  // replace the empty with null strings for the validator to be able to work
  // required field
  let flag = false;
  if (isEmpty(data.name) == false) {
    data.name = "";
  }
  // required
  if (isEmpty(data.email) == false) {
    data.email = "";
  }
  // required
  if (isEmpty(data.contact_number) == false) {
    data.contact_number = "";
  }
  // required
  if (isEmpty(data.batch_name) == false) {
    data.batch_name = "";
  }
  // required
  if (isEmpty(data.password) == false) {
    data.password = "";
  }
  if (isEmpty(data.confirm_password) == false) {
    data.confirm_password = "";
  }
  // required
  if (isEmpty(data.age) == false) {
    data.age = "";
  }

  // Create a variable to store errors
  let errors = {};

  if (validator.isEmpty(data.name)) {
    flag = true;
    errors.name = "Name Field Empty";
  }

  if (validator.isEmpty(data.email)) {
    flag = true;
    errors.email = "Email Field Empty";
  } else if (validator.isEmail(data.email) == false) {
    flag = true;
    errors.email = "Enter a valid Email address";
  }

  if (validator.isEmpty(data.batch_name)) {
    flag = true;
    errors.batch_name = "Batch-Name Field Empty";
  }
  if (validator.isEmpty(data.contact_number)) {
    flag = true;
    errors.contact_number = "Contact-Number Field Empty";
  }
  if (validator.isEmpty(data.age)) {
    flag = true;
    errors.age = "Age Field Empty";
  }
  if (validator.isEmpty(data.password)) {
    flag = true;
    errors.password = "Password Field Empty";
  }
  if (validator.isEmpty(data.confirm_password)) {
    flag = true;
    errors.confirm_password = "Field can't be Empty";
  } else if (validator.isEqual(data.password, data.confirm_password) == false) {
    flag = true;
    errors.confirm_password = "Both Passwords should be the same";
  }

  return { errors, ret: !flag };
};
