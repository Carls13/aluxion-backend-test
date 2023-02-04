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
    unsplashAccessKey: process.env.UNSPLASH_ACCESS_KEY,
    unsplashSecretToken: process.env.UNSPLASH_SECRET_TOKEN,
    s3Key: process.env.AWS_S3_KEY,
    s3Secret: process.env.AWS_S3_SECRET,
    s3Bucket: process.env.AWS_S3_BUCKET,
    backendStaticPath: process.env.BACKEND_STATIC_PATH,
}

module.exports = config;