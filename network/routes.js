const userRouter = require("../components/user/network");
const imageRouter = require("../components/image/network");

const routes = (server) => {
    server.use('/user', userRouter);
    server.use('/image', imageRouter);
};

module.exports = routes;