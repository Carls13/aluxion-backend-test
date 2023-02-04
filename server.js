const server = require("http").Server(app);

const router = require('./network/routes');
const config = require("./config");
const app = require("./app");

router(app);

db();

server.listen(config.port, () => {
    console.log('Escuchando en puerto ' + config.port);
});
