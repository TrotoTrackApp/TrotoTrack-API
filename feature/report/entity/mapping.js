const ReportCore = require("./entity");

function reportCoreToReportModel(report) {
  return {
    id: report.id,
    location: report.location,
    reference_location: report.referenceLocation,
    latitude: report.latitude,
    longitude: report.longitude,
    image: report.image,
    description: report.description,
    user_id: report.userId,
    status: report.status,
    created_at: report.createdAt,
  };
}

function reportModelToReportCore(report) {
  const reportCore = new ReportCore(
    report.id,
    report.location,
    report.reference_location,
    report.latitude,
    report.longitude,
    report.image,
    report.description,
    report.user_id,
    report.status,
    report.created_at
  );
  return reportCore;
}

function listReportCoreToListReportModel(report) {
  const listReport = [];
  for (const data of report) {
    const reportModel = reportCoreToReportModel(data);
    listReport.push(reportModel);
  }
  return listReport;
}

function listReportModelToListReportCore(report) {
  const listReport = [];
  for (const data of report) {
    const reportCore = reportModelToReportCore(data);
    listReport.push(reportCore);
  }
  return listReport;
}

module.exports = {
  reportCoreToReportModel,
  reportModelToReportCore,
  listReportCoreToListReportModel,
  listReportModelToListReportCore,
};
