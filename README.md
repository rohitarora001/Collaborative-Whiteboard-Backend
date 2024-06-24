# Whiteboard Backend

This is the backend service for the Whiteboard application, built with Node.js, Express, and MongoDB. This service provides RESTful APIs to manage whiteboard rooms.

## Features

- Create a new room
- Retrieve a specific room
- Retrieve all rooms
- Real-time collaboration with Socket.io

## Getting Started

Follow these instructions to set up and run the backend server on your local machine.

### Prerequisites

Make sure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/whiteboard-backend.git
    cd whiteboard-backend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

    or if you prefer using yarn:

    ```bash
    yarn install
    ```

3. Create a `.env` file in the root of the project and add your MongoDB connection string and the port:

    ```env
    MONGODB_CONNECTION=mongodb://localhost:27017/whiteboard
    PORT=4000
    ```

### Running the Application

Start the backend server:

```bash
npm start
or if you prefer using yarn:

yarn start
The server will run on the port specified in your .env file (default is 4000).

Project Structure
controllers/: Contains controller logic for handling requests
    room.js: Controller for room-related operations
db/: Contains database connection logic
    connection.js: Establishes connection to MongoDB
models/: Contains Mongoose schemas and models
    room.js: Mongoose schema for room
routes/: Contains route definitions
    room.js: Defines API routes for room operations
.env: Environment configuration file
app.js: Initializes Express app and middleware
server.js: Sets up and starts the HTTP server
socket.js: Sets up socket.io for real-time communication
package.json: Project metadata and scripts
README.md: Project documentation
API Endpoints
    
Create a Room
    URL: /create-room/
    Method: POST

    Request Body:
        {
            "roomName": "exampleRoomName"
        }
    Success Response:
        Status: 201 Created
        Body:
        {
            "_id": "60c72b2f9b1e8a001c8e4c8b",
            "roomName": "exampleRoomName",
            "data": ""
        }
    Error Response:
        Status: 500 Internal Server Error
        Body: "Can not create room, please try again later"

Get a Room
    URL: /get-room/:roomid
    Method: GET

    Success Response:
        Status: 200 OK
        Body:
        {
            "_id": "60c72b2f9b1e8a001c8e4c8b",
            "data": ""
        }
    Error Response:
        Status: 404 Not Found
        Body: "Room not found"

        Status: 500 Internal Server Error
        Body: "Can not retrieve room, please try again later"
    
Get All Rooms
    URL: /get-all-rooms
    Method: GET
    Success Response:
    Status: 200 OK
    Body:
        [
            {
                "_id": "60c72b2f9b1e8a001c8e4c8b",
                "roomName": "exampleRoomName"
            }
        ]
    Error Response:
        Status: 500 Internal Server Error
        Body: "Can not retrieve rooms, please try again later"


Socket.io Setup for Real-time Communication

This Node.js project utilizes Socket.io for real-time communication between clients. Below is an overview of how the socket server is set up and its functionality.

Installation
Make sure you have Node.js installed. Then, install the necessary packages:

npm install socket.io mongoose
Overview
server.js
This file (server.js) sets up the Socket.io server and handles socket events for user registration, drawing updates, and disconnection.

Dependencies
socket.io: Manages real-time bidirectional event-based communication between clients and server.
mongoose: MongoDB object modeling tool to interact with MongoDB databases.

Setup
Socket.io Server Initialization

const socketIo = require('socket.io');
const Room = require('./models/room');
const rooms = new Map(); // Map to store userId to socketId

let io;

const setupSocketIo = (server) => {
    io = socketIo(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    // Socket event listeners are defined within this setup function.
    // See `server.js` for details.
};

module.exports = { setupSocketIo, rooms, getIo: () => io };
Events
register: Registers a new user in a specific room and emits an updateAvatar event to update avatars of all users in the room.
drawing: Broadcasts drawing data to all users in the same room and updates the database with the latest drawing data.
disconnect: Removes the disconnected user from the room and emits an updateAvatar event to notify all remaining users.
Room Management
rooms: Map object storing room IDs mapped to arrays of users (with socketId and personName).
Database Integration
Uses Mongoose for interacting with a MongoDB database (Room model) to store and retrieve drawing data.



Contributing
Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or bug fixes.

License
This project is licensed under the MIT License. See the LICENSE file for more details.

Happy coding! 🎨

This `README.md` file includes instructions on how to set up and run the backend server, as well as detailed explanations of the project's structure and individual files. Adjust the repository URL and other project-specific details as needed.

