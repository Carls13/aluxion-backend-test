/* eslint-disable no-async-promise-executor */
const unsplashClient = require('../../../utils/unsplash');

const listImages = (page = 1, limit = 10, search) => {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await unsplashClient.search.getPhotos({
                page,
                perPage: limit,
                query: search
            });

            const images = request.response.results;

            resolve({ images });
           
        } catch (e) {
            reject(e.message);
        }
    });
};

module.exports = listImages;