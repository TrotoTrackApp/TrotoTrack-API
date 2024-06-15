const { JobServicesInterface } = require("../entity/interface");
const {
  ValidationError,
  NotFoundError,
} = require("../../../utils/helper/response");
const validator = require("validator");
const { message } = require("../../../utils/constanta/constanta");
const { mod } = require("@tensorflow/tfjs-node");

class JobService extends JobServicesInterface {
  constructor() {
    super(jobRepo);
    this.jobRepo = jobRepo;
  }

  async createJob(data, file) {
    if (!data.name || !data.nik || !data.address || !data.phone || !file) {
      throw new ValidationError(message.ERROR_REQUIRED_FIELD);
    }

    if (data.nik.length < 16) {
      throw new ValidationError("NIK must be at least 16 characters long");
    }

    if (data.phone.length < 10) {
      throw new ValidationError("Phone must be at least 10 characters long");
    }

    const nikExist = await this.jobRepo.getJobByNik(data.nik);
    if (nikExist) {
      throw new ValidationError("NIK already exist");
    }

    if (file > 10 * 1024 * 1024) {
      throw new ValidationError("File size must not be greater than 10MB");
    }

    const allowedFileTypes = ["application/pdf"];
    if (!allowedFileTypes.includes(file.mimetype)) {
      throw new ValidationError(message.ERROR_INVALID_FILE_TYPE);
    }

    const job = await this.jobRepo.createJob(data, file);
    return job;
  }

  async getJobById(id) {
    if (!id) {
      throw new ValidationError("Id is required");
    }

    if (!validator.isUUID(id)) {
      throw new ValidationError(message.ERROT_ID_INVALID);
    }

    const job = await this.jobRepo.getJobById(id);
    return job;
  }

  async getAllJob() {
    const jobs = await this.jobRepo.getAllJob();
    if (article.length === 0) {
      throw new ValidationError("No article found");
    }
    return jobs;
  }

  async updateJobById(id, updatedData, file) {
    if (!id) {
      throw new ValidationError("Id is required");
    }

    if (!validator.isUUID(id)) {
      throw new ValidationError(message.ERROT_ID_INVALID);
    }

    const job = await this.jobRepo.getJobById(id);
    if (!job) {
      throw new NotFoundError("Job not found");
    }

    // Validate NIK if provided
    if (updatedData.nik) {
      if (updatedData.nik.length < 16) {
        throw new ValidationError("NIK must be at least 16 characters long");
      }

      const nikExist = await this.jobRepo.getJobByNik(updatedData.nik);
      if (nikExist && nikExist.id !== id) {
        throw new ValidationError("NIK already exists for another job");
      }
    }

    // Validate phone number if provided
    if (updatedData.phone) {
      if (updatedData.phone.length < 10) {
        throw new ValidationError("Phone must be at least 10 characters long");
      }
    }

    // Validate file if provided
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        // File size should not exceed 10MB
        throw new ValidationError("File size must not be greater than 10MB");
      }

      const allowedFileTypes = ["application/pdf"];
      if (!allowedFileTypes.includes(file.mimetype)) {
        // File must be a PDF
        throw new ValidationError("Invalid file type. Only PDF is allowed.");
      }
    }

    const updatedJob = await this.jobRepo.updateJobById(id, updatedData, file);
    return updatedJob;
  }

  async deleteJobById(id) {
    if (!id) {
      throw new ValidationError("Id is required");
    }

    if (!validator.isUUID(id)) {
      throw new ValidationError(message.ERROT_ID_INVALID);
    }

    const deletedJob = await this.jobRepo.deleteJobById(id);
    if (!deletedJob) {
      throw new NotFoundError("Job not found");
    }
    return deletedJob;
  }
}

module.exports = JobService;