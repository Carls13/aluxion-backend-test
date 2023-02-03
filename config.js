require('dotenv').config();

const config = {
    dbUrl: process.env.DB_URL,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    port: parseInt(process.env.PORT),
    tokenKey: process.env.TOKEN_KEY,
    auth0Name: process.env.AUTH0_NAME,
    auth0Domain: process.env.AUTH0_DOMAIN,
    auth0ClientID: process.env.AUTH0_CLIENT_ID,
    auth0ClientSecret: process.env.AUTH0_CLIENT_SECRET,
    gmailEmail: process.env.GMAIL_EMAIL,
    gmailPassword: process.env.GMAIL_PASSWORD,
}

module.exports = config;