const cors = require('cors');
const express = require('express');

require('dotenv').config();
const room = require('./routes/room')

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/' , room)

module.exports = app;
