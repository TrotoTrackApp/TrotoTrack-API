const userRoute = require('./route_user');
const express = require('express');


const router = express.Router();

router.use(userRoute);

module.exports = router;