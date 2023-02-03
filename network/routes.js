const userRouter = require("../components/user/network");

const routes = (server) => {
    server.use('/user', userRouter);
};

module.exports = routes;