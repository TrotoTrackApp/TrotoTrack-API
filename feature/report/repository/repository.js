const { ReportRepositoryInterface } = require('../entity/interface');
const Report = require('../model/model');

class ReportRepository extends ReportRepositoryInterface {
    constructor() {
        super();
        this.report = Report;
    }
    
    async createReport(data, file) {
        return await this.report.create(data, file);
    }
    
    async updateReport(id, data, file) {
        return await this.report.update(id, data, file);
    }
    
    async deleteReport(id) {
        return await this.report.delete(id);
    }
    
    async getReportById(id) {
        return await this.report.findById(id);
    }
}