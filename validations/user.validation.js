const joi = require("joi");

const authUserSchema = {
	body: joi.object().keys({
		name: joi.string().required(),
	}),
};

module.exports = {
	authUserSchema,
};
