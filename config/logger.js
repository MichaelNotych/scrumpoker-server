const winston = require("winston");
const { format, createLogger, transports } = winston;
const { printf, combine, timestamp, colorize, uncolorize } = format;
const config = require("./config");

const winstonFormat = printf((obj) => {
	const { level, message, timestamp, stack } = obj;
	return `${timestamp}: ${level}: ${message} ${stack || ""}`;
});

const logger = createLogger({
	level: config.env === "development" ? "debug" : "info", // max level of logging (accept only info, warn, error)
	format: combine(
		timestamp(),
		winstonFormat,
		config.env === "development" ? colorize() : uncolorize()
	),
	transports: [new transports.Console()],
});

module.exports = logger;
