const mongoose = require("mongoose");

const voteSchema = mongoose.Schema({
	value: {
		type: String,
		required: true,
	},
	roomId: {
		type: String,
		required: true,
	},
	userId: {
		type: String,
		required: true,
	}
}, { versionKey: false });

const Vote = mongoose.model("Vote", voteSchema);

module.exports = Vote;