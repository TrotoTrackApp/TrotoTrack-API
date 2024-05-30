const userRoute = require('./route_user');
const reportRoute = require('./route_report');
const articleRoute = require('./route_article');
const express = require('express');


const router = express.Router();

router.use(userRoute);
router.use(reportRoute);
router.user(articleRoute)

module.exports = router;