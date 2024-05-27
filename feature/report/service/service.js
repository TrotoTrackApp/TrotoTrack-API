const { ReportServiceInterface } = require("../entity/interface");
const { ValidationError } = require("../../../utils/helper/response");
const { message } = require("../../../utils/constanta/constanta");
const validator = require("validator");

class ReportService extends ReportServiceInterface {
  constructor(reportRepository) {
    super();
    this.reportRepository = reportRepository;
  }

  async createReport(data, file) {
    if (
      !data.location ||
      !data.latitude ||
      !data.longitude ||
      !data.description ||
      !file
    ) {
      throw new ValidationError(message.ERROR_REQUIRED_FIELD);
    }

    if (data.latitude < -90 || data.latitude > 90) {
      throw new ValidationError("Latitude must be between -90 and 90");
    }

    if (data.longitude < -180 || data.longitude > 180) {
      throw new ValidationError("Longitude must be between -180 and 180");
    }

    if (data.description.length < 10) {
      throw new ValidationError(
        "Description must be at least 10 characters long"
      );
    }

    const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedFileTypes.includes(file.mimetype)) {
      throw new ValidationError(message.ERROR_INVALID_FILE_TYPE);
    }

    const result = await this.reportRepository.createReport(data, file);
    return result;
  }

  async updateReport(id, data, file) {
    if (!id) {
      throw new ValidationError(message.ERROR_ID);
    }

    if (!validator.isUUID(id)) {
      throw new ValidationError(message.ERROT_ID_INVALID);
    }

    if (
      !data.location ||
      !data.latitude ||
      !data.longitude ||
      !data.description ||
      !file
    ) {
      throw new ValidationError(message.ERROR_REQUIRED_FIELD);
    }

    if (data.latitude < -90 || data.latitude > 90) {
      throw new ValidationError("Latitude must be between -90 and 90");
    }

    if (data.longitude < -180 || data.longitude > 180) {
      throw new ValidationError("Longitude must be between -180 and 180");
    }

    if (data.description.length < 10) {
      throw new ValidationError(
        "Description must be at least 10 characters long"
      );
    }

    if (file) {
      const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedFileTypes.includes(file.mimetype)) {
        throw new ValidationError(message.ERROR_INVALID_FILE_TYPE);
      }
    }

    const result = await this.reportRepository.updateReport(id, data, file);
    return result;
  }

  async deleteReport(id) {
    if (!id) {
      throw new ValidationError(message.ERROR_ID);
    }

    if (!validator.isUUID(id)) {
      throw new ValidationError(message.ERROT_ID_INVALID);
    }

    const result = await this.reportRepository.deleteReport(id);
    return result;
  }

  async getReportById(id) {
    if (!id) {
      throw new ValidationError(message.ERROR_ID);
    }

    if (!validator.isUUID(id)) {
      throw new ValidationError(message.ERROT_ID_INVALID);
    }

    const result = await this.reportRepository.getReportById(id);
    return result;
  }

  async getAllReport() {
    const result = await this.reportRepository.getAllReport();
    if (result.length === 0) {
      throw new ValidationError("No report found");
    }

    return result;
  }
}

module.exports = ReportService;
