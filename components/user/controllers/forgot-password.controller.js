/* eslint-disable no-async-promise-executor */
const userStore = require('./../store');

const passwordGenerator = require('generate-password');
const { sendMail } = require('../../../utils/mail');

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

module.exports = forgotPassword;