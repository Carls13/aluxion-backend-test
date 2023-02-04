const { createApi } = require('unsplash-js');
const { unsplashAccessKey } = require('../config');

const fetch = require('node-fetch');
global.fetch =fetch;

const unsplashClient = createApi({
    accessKey: unsplashAccessKey,
});

module.exports = unsplashClient;