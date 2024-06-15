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
const e = require("cors");

class JobController {
  constructor(jobService) {
    this.jobService = jobService;
  }

  async createJob(req, res) {
    try {
      const data = jobRequest(req.body);
      const file = req.file;
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
      const job = await this.jobService.getJobById(id);
      const response = jobResponse(job);
      return res
        .status(200)
        .json(successWithDataResponse(message.SUCCESS_GET, response));
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

  async getAllJob(req, res) {
    try {
      const jobs = await this.jobService.getAllJob();
      const response = listJobResponse(jobs);
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

  async updateJobById(req, res) {
    const id = req.params.id;
    try {
      const data = jobRequest(req.body);
      const file = req.file;
      await this.jobService.updateJobById(id, data, file);
      return res.status(200).json(successResponse(message.SUCCESS_UPDATED));
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
      await this.jobService.deleteJobById(id);
      return res.status(200).json(successResponse(message.SUCCESS_DELETED));
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