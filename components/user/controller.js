/* eslint-disable no-async-promise-executor */
const registerUser = require('./controllers/register.controller');
const login = require('./controllers/login.controller');
const forgotPassword = require('./controllers/forgot-password.controller');

module.exports = {
    registerUser,
    login,
    forgotPassword,
};