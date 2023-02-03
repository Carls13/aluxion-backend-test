const nodemailer = require("nodemailer");
const config = require("../config");

async function sendMail(email, newPassword) {
    const transporter = nodemailer.createTransport({
        pool: true,
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: config.gmailEmail,
            pass: config.gmailPassword
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    await new Promise((resolve, reject) => {
        // verify connection configuration
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log("Server is ready to take our messages");
                resolve(success);
            }
        });
    });


    const mailOptions = {
        from: `Test User${config.gmailEmail}`,
        to: email,
        subject: `Nueva contraseña`,
        html: `<p>Greetings. Your new password is:</p>
        
        <span><b>${newPassword}</b></span><br/>
        `
    };

    await new Promise((resolve, reject) => {
        // send mail
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log(info);
                resolve(info);
            }
        });
    });
}

module.exports = {
    sendMail
};