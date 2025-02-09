const express = require("express");
const cors = require('cors');
const { status } = require("http-status");

const ApiError = require("./utils/ApiError");
const { errorHandler, errorConverter } = require("./middlewares/error");
const roomRouter = require("./routes/room.route");
const userRouter = require("./routes/user.route");
const config = require("./config/config");

const app = express();

app.use(cors({
	origin: config.clientUrl,
	methods: ['GET', 'POST'],
	allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json());
app.use(roomRouter);
app.use(userRouter);
app.use((req, res, next) => {
	next(new ApiError(status.NOT_FOUND, "Not found"));
});
app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
