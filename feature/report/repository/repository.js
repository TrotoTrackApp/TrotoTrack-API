const { ReportRepositoryInterface } = require("../entity/interface");
const {
  reportCoreToReportModel,
  reportModelToReportCore,
  listReportModelToListReportCore,
} = require("../entity/mapping");
const Report = require("../model/model");
const { uploadFileToGCS } = require("../../../utils/storage/gcp_storage");
const { NotFoundError } = require("../../../utils/helper/response");

class ReportRepository extends ReportRepositoryInterface {
  constructor() {
    super();
    this.report = Report;
  }

  async createReport(data, file) {
    const report = reportCoreToReportModel(data);
    console.log("Repository data before creating report:", report);

    if (file) {
      const imageUrl = await uploadFileToGCS(file.path);
      report.image = imageUrl;
    }

    const createReport = await this.report.create({
      ...report,
      id_user: data.userId
    });
    const result = reportModelToReportCore(createReport);
    return result;
  }

  async updateReport(id, data, file) {
    const report = reportCoreToReportModel(data);

    if (file) {
      const imageUrl = await uploadFileToGCS(file.path);
      report.image = imageUrl;
    }

    const upadateReport = await this.report.update(report, {
      where: {
        id: id,
      },
    });

    if (upadateReport === 0) {
      throw new NotFoundError("User task not found");
    }

    const result = reportModelToReportCore(upadateReport);
    return result;
  }

  async deleteReport(id) {
    const deleteReport = await this.report.destroy({
      where: {
        id: id,
      },
    });

    if (deleteReport === 0) {
      throw new NotFoundError("User task not found");
    }

    const result = reportModelToReportCore(deleteReport);
    return result;
  }

  async getReportById(id) {
    const report = await this.report.findByPk(id);

    if (!report) {
      throw new NotFoundError("User task not found");
    }

    const result = reportModelToReportCore(report);
    return result;
  }

  async getAllReport() {
    const reports = await this.report.findAll();
    const result = listReportModelToListReportCore(reports);
    return result;
  }

  async getReportProfile(userId) {
    const reports = await this.report.findAll({
      where: {
        id_user: userId,
      },
    });

    const result = listReportModelToListReportCore(reports);
    return result;
  }
}

module.exports = ReportRepository;