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
    const getPeople = (roomId) => {
        if(rooms.get(roomId)) {
            let people = rooms.get(roomId).map(person => person.personName)
            return people.filter(el => el)
        }
    }
    io.on('connection', (socket) => {
        socket.on('register', (data) => {
            const peopleInRoom = rooms.get(data.roomId) || [];
            peopleInRoom.push({ socketId: socket.id, personName: data.personName });
            rooms.set(data.roomId, peopleInRoom); // Store the socket ID with the room ID
            socket.join(data.roomId); // Join the room for broadcasting events
            socket.to(data.roomId).emit('updateAvatar' , getPeople(data.roomId))
        });

        socket.on('drawing', async (data) => {
            // Broadcast drawing data to others in the same room
            socket.to(data.roomId).emit('drawing', data.drawing);
            try{
                await Room.findOneAndUpdate({ _id: data.roomId }, {
                    data: data.drawing
                })
            } catch(e) {
            }
        });

        socket.on('disconnect', () => {
            let roomIdFetched;
            rooms.forEach((peopleInRoom, roomId) => {
                const index = peopleInRoom.findIndex(person => person.socketId === socket.id);
                if (index !== -1) {
                    peopleInRoom.splice(index, 1);
                    rooms.set(roomId, peopleInRoom);
                    roomIdFetched = roomId;
                }
            });
            socket.to(roomIdFetched).emit('updateAvatar' , getPeople(roomIdFetched))
        });
    });
};

module.exports = { setupSocketIo, rooms, getIo: () => io };
