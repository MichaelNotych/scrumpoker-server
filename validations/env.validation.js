const joi = require('joi');

const envVarsSchema = joi.object({
	DB_CONNECTION: joi.string().required(),
	PORT: joi.number().required(),
	NODE_ENV: joi.string().required(),
	JWT_SECRET: joi.string().required(),
	CLIENT_URL: joi.string().required(),
}).unknown();

module.exports = envVarsSchema;