const {
  successCreateResponse,
  successGetResponse,
  serverErrorResponse,
} = require("../../../utils/helper/response");
const {
  ValidationError,
  DuplicateError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenResponse,
} = require("../../../utils/helper/response");
const { message } = require("../../../utils/constanta/constanta");
const { userRequest, loginRequest, userUpdateRequest} = require("../dto/request");
const {
  loginResponse,
  userResponse,
  userListResponse,
} = require("../dto/response");
const { extractToken } = require("../../../utils/jwt/jwt");

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async createUser(req, res) {
    try {
      const user = userRequest(req.body);
      await this.userService.createUser(user);
      return successCreateResponse(res, message.SUCCESS_CREATED);
    } catch (error) {
      if (error instanceof ValidationError || error instanceof DuplicateError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        return serverErrorResponse(res, "Internal server error");
      }
    }
  }

  async login(req, res) {
    try {
      const login = loginRequest(req.body);
      const { user, token } = await this.userService.login(
        login.email,
        login.password
      );
      return loginResponse(res, user, token);
    } catch (error) {
      if (error instanceof ValidationError || error instanceof NotFoundError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        return serverErrorResponse(res, "Internal server error");
      }
    }
  }

  async getUserById(req, res) {
    const userId = req.params.id;
    try {
      const { id, role } = extractToken(req);
      if (role === "admin" || id === userId) {
        const user = await this.userService.getUserById(userId);
        return userResponse(res, user);
      } else {
        ForbiddenResponse.sendUnauthorized(res);
      }
    } catch (error) {
      if (
        error instanceof NotFoundError ||
        error instanceof ValidationError ||
        error instanceof UnauthorizedError
      ) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.log(error);
        return serverErrorResponse(res, "Internal server error");
      }
    }
  }

  async getAllUsers(req, res) {
    try {
      const { role } = extractToken(req);
      console.log("role", role);
      if (role === "admin") {
        const users = await this.userService.getAllUser();
        return userListResponse(res, users);
      } else {
        ForbiddenResponse.sendUnauthorized(res);
      }
    } catch (error) {
      if (
        error instanceof NotFoundError ||
        error instanceof UnauthorizedError
      ) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        return serverErrorResponse(res, "Internal server error");
      }
    }
  }

  async updateUserById(req, res) {
    const userId = req.params.id;
    const user = userUpdateRequest(req.body);

    try {
      const { id, role } = extractToken(req);
      if (role === "admin" || id === userId) {
        await this.userService.updateUserById(userId, user);
        return successGetResponse(res, "User updated successfully");
      } else {
        ForbiddenResponse.sendUnauthorized(res);
      }
    } catch (error) {
      if (
        error instanceof NotFoundError ||
        error instanceof ValidationError ||
        error instanceof DuplicateError ||
        error instanceof UnauthorizedError
      ) {
        res.status(error.statusCode).json({ message: error.message });
      }
      console.log(error);
      return serverErrorResponse(res, "Internal server error");
    }
  }

  async deleteUserById(req, res) {
    const userId = req.params.id;
    try {
      const { role } = extractToken(req);
      if (role === "admin") {
        await this.userService.delete(userId);
        return successGetResponse(res, "User deleted successfully");
      } else {
        ForbiddenResponse.sendUnauthorized(res);
      }
    } catch (error) {
      if (
        error instanceof NotFoundError ||
        error instanceof ValidationError ||
        error instanceof UnauthorizedError
      ) {
        res.status(error.statusCode).json({ message: error.message });
      }
      return serverErrorResponse(res, "Internal server error");
    }
  }
}

module.exports = UserController;
