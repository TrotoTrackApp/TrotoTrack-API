const { jobRequest } = require("../dto/request");
const { jobResponse, listJobResponse } = require("../dto/response");
const {
  successResponse,
  errorResponse,
  successWithDataResponse,
} = require("../../../utils/helper/response");
const {
  ValidationError,
  DuplicateError,
  NotFoundError,
  UnauthorizedError,
} = require("../../../utils/helper/response");
const { message } = require("../../../utils/constanta/constanta");
const { extractToken } = require("../../../utils/jwt/jwt");

class JobController {
  constructor(jobService) {
    this.jobService = jobService;
  }

  async createJob(req, res) {
    try {
      const { id } = extractToken(req);
      const data = jobRequest(req.body);
      const file = req.file;
      data.id_user = id;
      await this.jobService.createJob(data, file);
      return res.status(201).json(successResponse(message.SUCCESS_CREATED));
    } catch (error) {
      if (
        error instanceof ValidationError ||
        error instanceof UnauthorizedError ||
        error instanceof DuplicateError
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

  async getJobById(req, res) {
    const id = req.params.id;
    try {
      const { role } = extractToken(req);
      if (role === "admin") {
        const job = await this.jobService.getJobById(id);
        const response = jobResponse(job);
        return res
          .status(200)
          .json(successWithDataResponse(message.SUCCESS_GET, response));
      } else {
        return res.status(403).json(errorResponse(message.ERROR_FORBIDDEN));
      }
    } catch (error) {
      if (
        error instanceof NotFoundError ||
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

  async getJobByUserId(req, res) {
    try {
      const { id } = extractToken(req);
      const job = this.jobService.getJobProfile(id);
      const response = jobResponse(job);
      return res
        .status(200)
        .json(successWithDataResponse(message.SUCCESS_GET, response));
    } catch (error) {
      if (
        error instanceof NotFoundError ||
        error instanceof UnauthorizedError ||
        error instanceof ValidationError
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

  async getAllJob(req, res) {
    try {
      if (role === "admin") {
        const jobs = await this.jobService.getAllJob();
        const response = listJobResponse(jobs);
        return res
          .status(200)
          .json(successWithDataResponse(message.SUCCESS_GET, response));
      } else {
        return res.status(403).json(errorResponse(message.ERROR_FORBIDDEN));
      }
    } catch (error) {
      if (
        error instanceof NotFoundError ||
        error instanceof UnauthorizedError ||
        error instanceof ValidationError
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

  async updateJobById(req, res) {
    const id = req.params.id;
    try {
      const { id: idUser, role } = extractToken(req);
      const data = jobRequest(req.body);
      const file = req.file;
      const job = await this.userService.getJobById(id);
      if (role === "admin" || idUser === job.idUser) {
        await this.jobService.updateJobById(id, data, file);
        return res.status(200).json(successResponse(message.SUCCESS_UPDATED));
      } else {
        return res.status(403).json(errorResponse(message.ERROR_FORBIDDEN));
      }
    } catch (error) {
      if (
        error instanceof ValidationError ||
        error instanceof UnauthorizedError ||
        error instanceof NotFoundError ||
        error instanceof DuplicateError
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

  async deleteJobById(req, res) {
    const id = req.params.id;
    try {
      const { role } = extractToken(req);
      if (role === "admin") {
        await this.jobService.deleteJobById(id);
        return res.status(200).json(successResponse(message.SUCCESS_DELETED));
      } else {
        return res.status(403).json(errorResponse(message.ERROR_FORBIDDEN));
      }
    } catch (error) {
      if (
        error instanceof NotFoundError ||
        error instanceof UnauthorizedError ||
        error instanceof ValidationError
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

module.exports = JobController;
