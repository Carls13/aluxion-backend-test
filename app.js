const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

app.use(cors());

app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({limit: '500mb'}));

app.use('/static', express.static(path.join(__dirname + '/static')));

module.exports = app;