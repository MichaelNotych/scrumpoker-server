const catchAsync = require("../utils/catchAsync");
const { status } = require("http-status");
const { userService, tokenService } = require("../services");

const authUser = catchAsync(async (req, res) => {
	const user = await userService.createUser(req.body);
	const token = tokenService.generateToken(req.body.roomId, user._id);

	res.status(status.CREATED).send({
		success: true,
		data: {
			user,
			token,
		},
	});
});

module.exports = {
	authUser,
};
