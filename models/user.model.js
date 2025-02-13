const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	roomId: {
		type: String,
	},
}, { versionKey: false });

const User = mongoose.model("User", userSchema);

module.exports = User;