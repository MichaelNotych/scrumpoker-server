const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/config");

const generateToken = (roomId, userId) => {
	return jwt.sign(
		{
			roomId,
			userId,
		},
		jwtSecret,
		{
			expiresIn: "2h",
		}
	);
};

const validateToken = (token) => {
	return jwt.verify(token, jwtSecret);
};

module.exports = {
	generateToken,
	validateToken,
};
