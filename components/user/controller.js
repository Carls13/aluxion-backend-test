/* eslint-disable no-async-promise-executor */
const userStore = require('./store');

const bcrypt = require('bcryptjs');
const { getToken } = require('../../utils/token');

const passwordGenerator = require('generate-password');
const { sendMail } = require('../../utils/mail');

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

const forgotPassword = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userWithEmail = await userStore.findUserByEmail(email);

            if (!userWithEmail) {
                reject(`User with email ${email} doesn't exist`);
                return;
            };

            const newPassword = passwordGenerator.generate({
                length: 10,
                numbers: true,
            });

            await userStore.saveNewPassword(email, newPassword);

            await sendMail(email, newPassword);

            resolve("Your new password has been sent to your mail inbox");
        } catch (e) {
            reject(e.message);
        } 
    })
  
}

module.exports = {
    registerUser,
    login,
    forgotPassword,
};