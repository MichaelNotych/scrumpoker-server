const { Vote } = require("../models");

const updateVote = async (value, roomId, userId) => {
	let vote = await Vote.findOne({
		roomId,
		userId,
	});

	if (value === null) {
		await Vote.deleteOne({
			roomId,
			userId,
		});

		return {};
	}

	if (!vote) {
		vote = await createVote(value, roomId, userId);
	} else if (value) {
		vote.value = value;
		await vote.save();
	}

	return vote;
};

const createVote = async (value, roomId, userId) => {
	const vote = await Vote.create({
		value,
		roomId,
		userId,
	});
	return vote;
};

const getAllRoomVotes = async (roomId) => {
	return Vote.find({
		roomId,
	});
};

const getVotesMedian = (votes) => {
	const sortedVotes = votes.sort((a, b) => a.value - b.value);
	let median;
	if (sortedVotes.length % 2 === 1) {
		median = sortedVotes[Math.floor(sortedVotes.length / 2)].value;
	} else {
		median =
			(
				(parseInt(sortedVotes[sortedVotes.length / 2].value) +
					parseInt(sortedVotes[sortedVotes.length / 2 - 1].value)) /
				2
			).toFixed(1) * 1;
	}

	return median;
};

const getVotesAverage = (votes) => {
	const votesSum = votes.reduce((acc, vote) => acc + parseInt(vote.value), 0);

	return (votesSum / votes.length).toFixed(1) * 1;
}

const deleteAllRoomVotes = async (roomId) => {
	return Vote.deleteMany({
		roomId,
	});
};

const deleteUserVote = async (userId) => {
	await Vote.deleteOne({
		userId
	});
}

module.exports = {
	updateVote,
	getAllRoomVotes,
	deleteAllRoomVotes,
	getVotesMedian,
	getVotesAverage,
	deleteUserVote,
};
