const ReportController = require("../../feature/report/controller/controller");
const ReportService = require("../../feature/report/service/service");
const ReportRepository = require("../../feature/report/repository/repository");

const db = require("../database/mysql")
const { jwtMiddleware } = require("../../utils/jwt/jwt");
const upload = require("../../utils/storage/multer");
const express = require('express');

const router = express.Router();

const reportRepository = new ReportRepository(db);
const reportService = new ReportService(reportRepository);
const reportController = new ReportController(reportService);

router.post('/reports', jwtMiddleware, upload.single('file'), reportController.createReport.bind(reportController));

module.exports = router;