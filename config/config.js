require("dotenv").config();
const { envValidation } = require("./../validations");
const { value: envVars, error } = envValidation.validate(process.env);

if (error) {
	console.log(error);
}

module.exports = {
	port: envVars.PORT,
	dbConnection: envVars.DB_CONNECTION_LOCAL || envVars.DB_CONNECTION,
	env: envVars.NODE_ENV,
	jwtSecret: envVars.JWT_SECRET,
	clientUrl: envVars.CLIENT_URL,
};
