const { reportRequest } = require("../dto/request");
const { extractToken } = require("../../../utils/jwt/jwt");
const { message } = require("../../../utils/constanta/constanta");
const { ValidationError, UnauthorizedError } = require("../../../utils/helper/response");
const {
  successResponse,
  errorResponse,
} = require("../../../utils/helper/response");

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
      if (error instanceof ValidationError || error instanceof UnauthorizedError) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      } else {
        return res
          .status(500)
          .json(errorResponse(message.ERROR_INTERNAL_SERVER));
      }
    }
  }
}

module.exports = ReportController;
