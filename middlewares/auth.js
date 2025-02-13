const { jwtSecret } = require("../config/config");
const ApiError = require("../utils/ApiError");
const { status } = require("http-status");
const logger = require("../config/logger");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
	return new Promise((resolve, reject) => {
		const token = req.headers.authorization?.split(" ")[1];
		if (!token)
			return reject(
				new ApiError(status['UNAUTHORIZED'], "Invalid authorization credits")
			);
		let decoded = null;
		try {
			decoded = jwt.verify(token, jwtSecret);
		} catch (error) {
			decoded = null;
		}
		if (!decoded || !decoded.userId)
			return reject(
				new ApiError(status['UNAUTHORIZED'], "Invalid authorization credits")
			);
		req.userId = decoded.userId;
		resolve();
	})
		.then(() => next())
		.catch((error) => next(error));
};

const sseAuth = async (req, res, next) => {
	const token = req.params.token;
	req.headers.authorization = `Bearer ${token}`;

	return auth(req, res, next);
}

module.exports = {
	auth,
	sseAuth
};