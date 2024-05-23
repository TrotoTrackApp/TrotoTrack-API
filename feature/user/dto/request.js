const UserCore = require("../entity/entity");

function userRequest(body) {
  const { name, username, email, password, confirm_password } = body;
  return { name, username, email, password, confirmPassword: confirm_password };
}

function userUpdateRequest(body) {
  const { name, username, email} = body;
  return { name, username, email};
}

function loginRequest(body) {
  const { email, password } = body;
  return { email, password };
}

module.exports = { userRequest, loginRequest, userUpdateRequest };
