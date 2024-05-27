const { reportRequest } = require("../dto/request");
const { extractToken } = require("../../../utils/jwt/jwt");
const { message } = require("../../../utils/constanta/constanta");
const { successResponse } = require("../../../utils/helper/response");

class ReportController {
  constructor(userService) {
    this.userService = userService;
  }

  async createReport(req, res, next) {
    try {
      const request = reportRequest(req.body);
      const file = req.file;

      const { id, role } = extractToken(req);
      request.userId = id;
      console.log("Request:", request);
      console.log("user id:", request.userId);

      await this.userService.createReport(request, file);
      return res.status(201).json(successResponse(message.SUCCESS_CREATED));
    } catch (error) {
      console.log("Error:", error);
      next(error);
    }
  }
}

module.exports = ReportController;
