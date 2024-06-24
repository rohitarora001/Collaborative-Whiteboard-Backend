const express = require('express');
const router = express.Router();
const room = require('../controllers/room')

router.post('/create-room/', room.createRoom);
router.get('/get-room/:roomid', room.getRoom);
router.get('/get-all-rooms', room.getAllRoom);

module.exports = router;
