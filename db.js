const mongoose = require('mongoose');
const { dbUrl, dbUser, dbPassword } = require('./config');

const connect = async () => {
    try {
        await mongoose.connect(dbUrl, { user: dbUser, pass: dbPassword });
        console.log("Connection with DB made successfully!");
    } catch (error) {
        console.error(error);
        setTimeout(() => {
            connect();
        }, 3000);
    }
}

module.exports = connect;