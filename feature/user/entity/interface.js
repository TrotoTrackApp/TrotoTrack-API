class UserRepositoryInterface {
  async createUser(user) {
    throw new Error("Method not implemented");
  }

  async getUserById(id) {
    throw new Error("Method not implemented");
  }

  async getAllUser() {
    throw new Error("Method not implemented");
  }

  async updateUserById(id, user) {
    throw new Error("Method not implemented");
  }

  async deleteUserById(id) {
    throw new Error("Method not implemented");
  }

  async getUserByEmail(email) {
    throw new Error("Method not implemented");
  }

  async getUserByUsername(username) {
    throw new Error("Method not implemented");
  }

  async sendOtpEmail(email, otp, otpExpired) {
    throw new Error("Method not implemented");
  }
}

class UserServicesInterface {
  async createUser(user) {
    throw new Error("Method not implemented");
  }

  async getUserById(id) {
    throw new Error("Method not implemented");
  }

  async getAllUser() {
    throw new Error("Method not implemented");
  }

  async updateUserById(id, user) {
    throw new Error("Method not implemented");
  }

  async deleteUserById(id) {
    throw new Error("Method not implemented");
  }

  async getUserByEmail(email) {
    throw new Error("Method not implemented");
  }

  async login(email, password) {
    throw new Error("Method not implemented");
  }

  async updatePassword(id, oldPassword, newPassword, confirmPassword) {
    throw new Error("Method not implemented");
  }

  async sendOtpEmail(email) {
    throw new Error("Method not implemented");
  }
}

module.exports = { UserRepositoryInterface, UserServicesInterface };
