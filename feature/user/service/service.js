const { UserServicesInterface } = require("../entity/interface");
const {
  ValidationError,
  NotFoundError,
} = require("../../../utils/helper/response");
const { createToken } = require("../../../utils/jwt/jwt");
const validator = require("validator");
const {
  generatePasswordHash,
  comparePasswordHash,
} = require("../../../utils/helper/bcrypt");
const e = require("express");

class UserService extends UserServicesInterface {
  constructor(userRepo) {
    super();
    this.userRepo = userRepo;
  }

  async createUser(data) {
    // Validate required fields
    if (
      !data.name ||
      !data.username ||
      !data.email ||
      !data.password ||
      !data.confirmPassword
    ) {
      throw new ValidationError("Please fill all required fields");
    }

    // Validate password length
    if (data.password.length < 8) {
      throw new ValidationError("Password must be at least 8 characters long");
    }

    // Validate password and confirm password
    if (data.password !== data.confirmPassword) {
      throw new ValidationError(
        "Password and Confirm Password must be the same"
      );
    }

    // Validate email
    if (!validator.isEmail(data.email)) {
      throw new ValidationError("Email is not valid");
    }

    // Check if email is already registered
    const exitingUser = await this.userRepo.getUserByEmail(data.email);
    if (exitingUser) {
      throw new ValidationError("Email already registered");
    }

    // Check if username is already registered
    const existingUserByUsername = await this.userRepo.getUserByUsername(
      data.username
    );
    if (existingUserByUsername) {
      throw new ValidationError("Username already exists");
    }

    // Hash password
    const hashedPassword = await generatePasswordHash(data.password);
    data.password = hashedPassword;
    data.role = "user";
    const user = await this.userRepo.createUser(data);
    return user;
  }

  async getUserById(id) {
    if (!id) {
      throw new ValidationError("Please provide user id");
    }

    if (!validator.isUUID(id)) {
      throw new ValidationError("User id is not valid");
    }

    const user = await this.userRepo.getUserById(id);
    return user;
  }

  async getAllUser() {
    const users = await this.userRepo.getAllUser();
    if (users.length === 0) {
      throw new ValidationError("No user found");
    }
    return users;
  }

  async updateUserById(id, updatedData) {
    if (!id) {
      throw new ValidationError("Please provide user id");
    }

    if (!validator.isUUID(id)) {
      throw new ValidationError("User id is not valid");
    }

    // Periksa apakah ada data email yang disediakan
    if (updatedData.email) {
      // Validasi email jika disediakan
      if (!validator.isEmail(updatedData.email)) {
        throw new ValidationError("Email is not valid");
      }

      // Cek apakah email sudah terdaftar untuk pengguna lain
      const existingEmail = await this.userRepo.getUserByEmail(
        updatedData.email
      );
      if (existingEmail && existingEmail.id !== id) {
        throw new ValidationError("Email already registered");
      }
    }

    const user = await this.userRepo.updateUserById(id, updatedData);
    return user;
  }

  async deleteUserById(id) {
    if (!id) {
      throw new ValidationError("Please provide user id");
    }

    if (!validator.isUUID(id)) {
      throw new ValidationError("User id is not valid");
    }

    const user = await this.userRepo.deleteUserById(id);
    return user;
  }

  async login(email, password) {
    if (!email || !password) {
      throw new ValidationError("Please provide email and password");
    }

    if (!validator.isEmail(email)) {
      throw new ValidationError("Email is not valid");
    }

    const user = await this.userRepo.getUserByEmail(email);
    if (!user) {
      throw new NotFoundError("Email not registered");
    }
    console.log("user", user);
    const isValidPassword = await comparePasswordHash(password, user.password);
    if (!isValidPassword) {
      throw new ValidationError("Password is incorrect");
    }

    const token = createToken(user.id, user.role);
    console.log("id", user.id, "role", user.role);
    return { user, token };
  }

  async updatePassword(id, oldPassword, newPassword, confirmPassword) {
    if (!id) {
      throw new ValidationError("Please provide user id");
    }

    if (!validator.isUUID(id)) {
      throw new ValidationError("User id is not valid");
    }
    
    if (!oldPassword || !newPassword || !confirmPassword) {
      throw new ValidationError("Please fill all required fields");
    }

    if (newPassword.length < 8) {
      throw new ValidationError("Password must be at least 8 characters long");
    }

    if (newPassword !== confirmPassword) {
      throw new ValidationError(
        "Password and Confirm Password must be the same"
      );
    }

    const user = await this.userRepo.getUserById(id);
    const isValidPassword = await comparePasswordHash(
      oldPassword,
      user.password
    );
    if (!isValidPassword) {
      throw new ValidationError("Old password is incorrect");
    }

    const hashedPassword = await generatePasswordHash(newPassword);
    const updatedUser = await this.userRepo.updateUserById(id, {
      password: hashedPassword,
    });

    return updatedUser;
  }
}

module.exports = UserService;
