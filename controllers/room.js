const Room = require('../models/room')

exports.createRoom = async (req, res) => {
    try {
        const newRoom = new Room({
            roomName: req.body.roomName
        })
        const response = await newRoom.save();
        res.status(201).send(response)
    } catch (error) {
        res.status(500).send('Can not create room, please try again later')
    }
}
exports.getRoom = async (req, res) => {
    try {
        const response = await Room.findById(req.params.roomid).select('data');
        if (response)
            return res.status(200).send(response)
        return res.status(404).send('Room not found')
    } catch (error) {
        res.status(500).send('Can not create room, please try again later')
    }
}
exports.getAllRoom = async (req, res) => {
    try {
        const response = await Room.find().select('roomName');
        return res.status(200).send(response)
    } catch (error) {
        res.status(500).send('Can not create room, please try again later')
    }
}