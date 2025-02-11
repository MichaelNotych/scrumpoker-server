# Scrum Poker Backend
This is the backend service for the Scrum Poker application, built using Node.js and Express.js. It handles user sessions, room management, and real-time communication.

## Features
- Create and manage game rooms
- Handle user connections and voting
- Provide real-time updates using Server-Sent Events (SSE)
- REST API for room and user management

## Tech Stack
- Node.js - JavaScript runtime
- Express.js - Web framework
- MongoDB - Database for storing room and user data
- Mongoose - ODM for MongoDB
- JWT (jsonwebtoken) - Authentication mechanism
- Joi - Schema validation
- Winston - Logging library
- SSE - Real-time updates

## Getting Started
1. Clone the repository:
	```sh
	git clone https://github.com/MichaelNotych/scrumpoker-server.git
	```
2. Install dependencies:
	```sh
	npm install
	```
3. Configure environment variables in a `.env` file:
	```sh
	DB_CONNECTION=<database_url>
	PORT=<preferred_port>
	NODE_ENV=<development | production>
	JWT_SECRET=<your_jwt_secret>
	CLIENT_URL=<your_client_url>
	```
4. Start the server
	```sh
	npm run dev
	```

## API Endpoints
### Room Endpoints
- POST `/api/v1/room` - Create a new room
- POST `/api/v1/room/vote` - Submit a vote (auth required)
- POST `/api/v1/room/reveal` - Reveal room results (auth required)
- POST `/api/v1/room/reset` - Reset room results (auth required)
- POST `/api/v1/room/leave` - Leave a room (auth required)
- GET `/api/v1/room/:id` - Get room details
- GET `/api/v1/room/enter/:id/:token` - Enter a room (SSE authentication required)
### User Endpoints
- POST `/api/v1/user/auth` - Authenticate user


## License
This project is open-source under the MIT License.