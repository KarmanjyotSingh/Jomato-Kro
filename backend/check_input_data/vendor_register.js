const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function check_register_data(data) {
  // replace the empty with null strings for the validator to be able to work
  // required field
  let flag = false;
  if (isEmpty(data.manager_name) == false) {
    data.manager_name = "";
  }
  // required
  if (isEmpty(data.email) == false) {
    data.email = "";
  }
  // required
  if (isEmpty(data.shop_name) == false) {
    data.shop_name = "";
  }
  // required
  if (isEmpty(data.contact_number) == false) {
    data.contact_number = "";
  }
  // required
  if (isEmpty(data.open_time) == false) {
    data.open_time = "";
  }
  // required
  if (isEmpty(data.password) == false) {
    data.password = "";
  }
  if (isEmpty(data.confirm_password) == false) {
    data.confirm_password = "";
  }
  // required
  if (isEmpty(data.close_time) == false) {
    data.close_time = "";
  }

  // Create a variable to store errors
  let errors = {};

  if (validator.isEmpty(data.manager_name)) {
    flag = true;
    errors.manager_name = "Manager-Name Field Empty";
  }

  if (validator.isEmpty(data.email)) {
    flag = true;
    errors.email = "Email Field Empty";
  } else if (validator.isEmail(data.email) == false) {
    flag = true;
    errors.email = "Enter a valid Email address";
  }

  if (validator.isEmpty(data.shop_name)) {
    flag = true;
    errors.shop_name = "Shop-Name Field Empty";
  }

  if (validator.isEmpty(data.contact_number)) {
    flag = true;
    errors.contact_number = "Contact-Number Field Empty";
  }
  if (validator.isEmpty(data.open_time)) {
    flag = true;
    errors.open_time = "Open-Time Field Empty";
  }
  if (validator.isEmpty(data.close_time)) {
    flag = true;
    errors.close_time = "Close-Time Field Empty";
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
