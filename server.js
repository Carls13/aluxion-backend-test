const express = require("express");
const app = express();
const server = require("http").Server(app);

const cors = require("cors");
const router = require('./network/routes');
const db = require('./db');
const config = require("./config");

app.use(cors());

app.use(express.json());
router(app);

db();

server.listen(config.port, () => {
    console.log('Escuchando en puerto ' + config.port);
});