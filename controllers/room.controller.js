const { roomService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const { status } = require("http-status");

const createRoom = catchAsync(async (req, res) => {
	const room = await roomService.createRoom(req.body);

	res.status(status.CREATED).send({
		success: true,
		data: {
			room,
		},
	});
});

const getRoomById = catchAsync(async (req, res) => {
	const room = await roomService.getRoomById(req.params.id);

	res.status(status.OK).send({
		success: true,
		data: {
			room,
		},
	});
});

const enterRoom = catchAsync(async (req, res) => {
	// find the room
	const room = await roomService.getRoomById(req.roomId);

	// send joinRoom event
	// with room data
	const joinRoomData = {
		name: room.name,
		median: room.median,
		average: room.average,
		status: room.status,
	};

	// update response type
	res.writeHead(status.OK, {
		"Content-Type": "text/event-stream",
		"Cache-Control": "no-cache",
		Connection: "keep-alive",
	});
	res.flushHeaders();

	res.write("\n");
	res.write(`event: joinRoom\ndata: ${JSON.stringify(joinRoomData)}\n\n`);

	roomService.enterRoom(req.roomId, req.userId, res);

	// handle room leave
	req.on("close", async () => {
		roomService.proccessUserLeave(req.userId, req.roomId);
	});
});

const submitVote = catchAsync(async (req, res) => {
	const { value, roomId, userId } = req.body;

	// udpate vote
	await roomService.submitVote(value, roomId, userId);

	res.status(status.OK).send({
		success: true,
		data: {},
	});
});

const revealRoomResults = catchAsync(async (req, res) => {
	const roomId = req.body.roomId;
	await roomService.revealRoomResults(roomId);

	res.status(status.OK).send({
		success: true,
		data: {},
	});
});

const resetRoomResults = catchAsync(async (req, res) => {
	const roomId = req.body.roomId;
	await roomService.resetRoomResults(roomId);

	res.status(status.OK).send({
		success: true,
		data: {},
	});
});

const leaveRoom = catchAsync(async (req, res) => {
	const { roomId, userId } = req.body;
	await roomService.leaveRoom(roomId, userId);

	res.status(status.OK).send({
		success: true,
		data: {},
	});
});

module.exports = {
	createRoom,
	getRoomById,
	enterRoom,
	submitVote,
	revealRoomResults,
	resetRoomResults,
	leaveRoom,
};
