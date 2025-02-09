const mongoose = require("mongoose");
const config = require("./../config/config");
const ApiError = require("./../utils/ApiError");
const { status } = require("http-status");
const logger = require("../config/logger");
const errorConverter = (err, req, res, next) => {
	let error = err;
	if (!(error instanceof ApiError)) {
		const statusCode =
			error.statusCode || error instanceof mongoose.Error
				? status.BAD_REQUEST
				: status.INTERNAL_SERVER_ERROR;
		const message = error.message || status[`${statusCode}_MESSAGE`];
		error = new ApiError(statusCode, message, false, error.stack);
	}
	next(error);
};

const errorHandler = (err, req, res, next) => {
	let { statusCode, message } = err;
	if (config.env === "production" && !err.isOperational) {
		statusCode = status.INTERNAL_SERVER_ERROR;
		message = status[`${statusCode}_MESSAGE`];
	}
	const response = {
		success: false,
		error: true,
		code: statusCode,
		message,
		...(config.env === "development" && { stack: err.stack }),
	};
	res.locals.errorMessage = message;
	if (config.env === "development") {
		logger.error(err);
	}
	res.status(statusCode).send(response);
};

module.exports = {
	errorHandler,
	errorConverter,
};
