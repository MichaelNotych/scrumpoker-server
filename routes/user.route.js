const express = require('express');
const router = express.Router();
const { userController } = require('../controllers');
const { userValidation } = require('../validations');
const validate = require("../middlewares/validate");

router.post('/user/auth', validate(userValidation.authUserSchema), userController.authUser)

module.exports = router;