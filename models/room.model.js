const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	status: {
		type: String,
		enum: ['reveal', null],
		default: null
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	median: {
		type: Number,
		default: null
	},
	average: {
		type: Number,
		default: null
	},
}, { versionKey: false });

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
