const express = require("express");
const app = express();
const server = require("http").Server(app);

const cors = require("cors");
const router = require('./network/routes');
const db = require('./db');
const config = require("./config");
const path = require("path");

app.use(cors());

app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({limit: '500mb'}));

app.use('/static', express.static(path.join(__dirname + '/static')));

router(app);

db();

server.listen(config.port, () => {
    console.log('Escuchando en puerto ' + config.port);
});