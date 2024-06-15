const { JobServicesInterface } = require("../entity/interface");
const {
  ValidationError,
  NotFoundError,
} = require("../../../utils/helper/response");
const validator = require("validator");
const { message } = require("../../../utils/constanta/constanta");

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
}
