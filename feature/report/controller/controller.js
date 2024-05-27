const { reportRequest } = require("../dto/request");
const { extractToken } = require("../../../utils/jwt/jwt");
const { message } = require("../../../utils/constanta/constanta");
const {
  ValidationError,
  UnauthorizedError,
} = require("../../../utils/helper/response");
const {
  successResponse,
  errorResponse,
  successWithDataResponse,
} = require("../../../utils/helper/response");
const { reportResponse, reportListResponse } = require("../dto/response");

class ReportController {
  constructor(userService) {
    this.userService = userService;
  }

  async createReport(req, res, next) {
    try {
      const request = reportRequest(req.body);
      const file = req.file;

      const { id } = extractToken(req);
      request.userId = id;
      console.log("Request:", request);
      console.log("user id:", request.userId);

      await this.userService.createReport(request, file);
      return res.status(201).json(successResponse(message.SUCCESS_CREATED));
    } catch (error) {
      if (
        error instanceof ValidationError ||
        error instanceof UnauthorizedError
      ) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      } else {
        return res
          .status(500)
          .json(errorResponse(message.ERROR_INTERNAL_SERVER));
      }
    }
  }

  async updateReport(req, res) {
    try {
      const request = reportRequest(req.body);
      const file = req.file;
      const { id } = extractToken(req);

      await this.userService.updateReport(id, request, file);
      return res.status(200).json(successResponse(message.SUCCESS_UPDATED));
    } catch (error) {
      if (
        error instanceof ValidationError ||
        error instanceof UnauthorizedError
      ) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      } else {
        console.log(error);
        return res
          .status(500)
          .json(errorResponse(message.ERROR_INTERNAL_SERVER));
      }
    }
  }

  async deleteReport(req, res) {
    try {
      const userId = req.params.id;
      const { role } = extractToken(req);
      if (role === "admin") {
        await this.userService.deleteReport(userId);
        return res.status(200).json(successResponse(message.SUCCESS_DELETED));
      } else {
        return res.status(403).json(errorResponse(message.ERROR_FORBIDDEN));
      }
    } catch (error) {
      if (
        error instanceof ValidationError ||
        error instanceof UnauthorizedError
      ) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      } else {
        return res
          .status(500)
          .json(errorResponse(message.ERROR_INTERNAL_SERVER));
      }
    }
  }

  async getReportById(req, res) {
    try {
      const id = req.params.id;
      const { role } = extractToken(req);
      if (role === "admin") {
        const data = await this.userService.getReportById(id);
        const response = reportResponse(data);
        return res
          .status(200)
          .json(successWithDataResponse(message.SUCCESS_GET, response));
      } else {
        return res.status(403).json(errorResponse(message.ERROR_FORBIDDEN));
      }
    } catch (error) {
      if (
        error instanceof ValidationError ||
        error instanceof UnauthorizedError
      ) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      } else {
        return res
          .status(500)
          .json(errorResponse(message.ERROR_INTERNAL_SERVER));
      }
    }
  }

  async getAllReport(req, res) {
    try {
      const data = await this.userService.getAllReport();
      const response = reportListResponse(data);
      return res
        .status(200)
        .json(successWithDataResponse(message.SUCCESS_GET_ALL, response));
    } catch (error) {
      if (
        error instanceof ValidationError ||
        error instanceof UnauthorizedError
      ) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      } else {
        console.log(error);
        return res
          .status(500)
          .json(errorResponse(message.ERROR_INTERNAL_SERVER));
      }
    }
  }

  async getReportProfile(req, res) {
    try {
      const { id } = extractToken(req);
      const data = await this.userService.getReportProfile(id);
      const response = reportListResponse(data);
      return res
        .status(200)
        .json(successWithDataResponse(message.SUCCESS_GET, response));
    } catch (error) {
      if (
        error instanceof ValidationError ||
        error instanceof UnauthorizedError
      ) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      } else {
        console.log(error);
        return res
          .status(500)
          .json(errorResponse(message.ERROR_INTERNAL_SERVER));
      }
    }
  }
}

module.exports = ReportController;
