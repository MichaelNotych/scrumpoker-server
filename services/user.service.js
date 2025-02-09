const { status } = require("http-status");
const { User } = require("../models");
const ApiError = require("../utils/ApiError");

const createUser = async (body) => {
	const user = await User.create(body);
	return user;
};

const getUserById = async (id) => {
	const user = await User.findById(id);
	if (!user) {
		throw new ApiError(status.NOT_FOUND, "User not found");
	}
	return user;
};

const deleteById = async (id) => {
	return await User.findByIdAndDelete(id);
};

const deleteUsersInRoom = async (roomId) => {
	return await User.deleteMany({ roomId });
};

module.exports = { createUser, getUserById, deleteById, deleteUsersInRoom };
