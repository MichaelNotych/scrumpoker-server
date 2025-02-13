const joi = require("joi");

const createRoomSchema = {
	body: joi.object().keys({
		name: joi.string().required(),
		owner: joi.string().required(),
	}),
};

const submitRoomVote = {
	body: joi.object().keys({
		value: joi.string().allow(null),
		roomId: joi.string().required(),
		userId: joi.string().required(),
	}),
};

const revealRoomResults = {
	body: joi.object().keys({
		roomId: joi.string().required(),
	}),
};

const resetRoomResults = {
	body: joi.object().keys({
		roomId: joi.string().required(),
	}),
};

const leaveRoom = {
	body: joi.object().keys({
		userId: joi.string().required(),
		roomId: joi.string().required(),
	}),
};

module.exports = {
	createRoomSchema,
	submitRoomVote,
	revealRoomResults,
	resetRoomResults,
	leaveRoom,
};
