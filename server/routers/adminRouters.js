const express = require('express');
const adminController = require('../controllers/adminControllers');
const adminRouter = express.Router();

adminRouter.route('/').get(adminController.getAdmin);

module.exports = adminRouter;