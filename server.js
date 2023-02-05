const config = require("./config");
const app = require("./app");
const server = require("http").Server(app);

const db = require('./db');

db();

server.listen(config.port, () => {
    console.log('Escuchando en puerto ' + config.port);
});
