/* eslint-disable no-async-promise-executor */
const userStore = require('./../store');

const bcrypt = require('bcryptjs');
const { getToken } = require('../../../utils/token');

const login = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userWithEmail = await userStore.findUserByEmail(email);
            if (!userWithEmail) {
                reject("Invalid credentials");
                return;
            }

            const isPasswordCorrect = bcrypt.compareSync(password, userWithEmail.password); 
            if (!isPasswordCorrect) {
                reject("Invalid credentials");
                return;
            }

            const tokenRequest = await getToken();

            const token = tokenRequest.data.access_token;

            resolve({ token });
        } catch (e) {
            reject(e.message);
        }
    });
}

module.exports = login;