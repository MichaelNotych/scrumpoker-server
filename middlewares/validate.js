const joi = require("joi");
const ApiError = require("../utils/ApiError");

/**
 * Validate an express request against a given joi schema.
 *
 * @function validate
 * @param {Object} schema - The joi schema to validate against.
 * @returns {Function} An express middleware function.
 *
 * @example
 * const express = require('express');
 * const router = express.Router();
 * const { object } = require('joi');
 * const validate = require('./validate');
 *
 * router.post(
 *   '/user',
 *   validate(object().keys({
 *     firstName: object().string().required(),
 *     lastName: object().string().required(),
 *     email: object().string().email().required()
 *   })),
 *   (req, res) => {
 *     // req should now contain a valid user object
 *     // with the keys: firstName, lastName, email
 *   }
 * );
 */
const validate = (schema) => (req, res, next) => {
	const keys = Object.keys(schema);
	const object = keys.reduce((obj, key) => {
		if (Object.prototype.hasOwnProperty.call(req, key)) {
			obj[key] = req[key];
		}

		return obj;
	}, {});
	const { error } = joi.compile(schema).validate(object);
	if (error) {
		const errors = error.details.map((detail) => detail.message).join(", ");
		next(new ApiError(400, errors));
	}
	next();
};

module.exports = validate;
