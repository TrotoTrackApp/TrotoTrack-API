class UserCore {
    constructor(id, name, username, email, password, confirmPassword, role) {
      this.id = id;
      this.name = name;
      this.username = username;
      this.email = email;
      this.password = password;
      this.confirmPassword = confirmPassword;
      this.role = role;
    }
  }
  
  module.exports = UserCore;
  