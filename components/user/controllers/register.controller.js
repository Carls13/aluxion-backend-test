/* eslint-disable no-async-promise-executor */
const userStore = require('./../store');

const { getToken } = require('../../../utils/token');

const registerUser = (userData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userWithEmail = await userStore.findUserByEmail(userData.email);

            if (userWithEmail) {
                reject("Email already used");
                return;
            }
        
            await userStore.addUser(userData);

            const tokenRequest = await getToken();

            const token = tokenRequest.data.access_token;

            resolve({ token });
        } catch (e) {
            reject(e.message);
        }
    });
};

module.exports = registerUser;