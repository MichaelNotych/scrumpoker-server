const express = require("express");
const router = express.Router();
const { roomController } = require("../controllers");
const { roomValidation } = require("../validations");
const validate = require("../middlewares/validate");
const { sseAuth, auth } = require("../middlewares/auth");

router.post(
	"/room",
	auth,
	validate(roomValidation.createRoomSchema),
	roomController.createRoom
);
router.post(
	"/room/vote",
	auth,
	validate(roomValidation.submitRoomVote),
	roomController.submitVote
);
router.post(
	"/room/reveal",
	auth,
	validate(roomValidation.revealRoomResults),
	roomController.revealRoomResults
);
router.post(
	"/room/reset",
	auth,
	validate(roomValidation.resetRoomResults),
	roomController.resetRoomResults
);
router.post(
	"/room/leave",
	auth,
	validate(roomValidation.leaveRoom),
	roomController.leaveRoom
);
router.get("/room/:id", auth, roomController.getRoomById);
router.get("/room/enter/:id/:token", sseAuth, roomController.enterRoom);

module.exports = router;
