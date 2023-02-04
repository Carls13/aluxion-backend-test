const { default: axios } = require("axios");
const { auth } = require("express-oauth2-jwt-bearer");
const { auth0ClientSecret, auth0Domain, auth0ClientID } = require("../config");

const getToken = () => {
  const requestBody = {
    client_id: auth0ClientID,
    client_secret: auth0ClientSecret,
    audience: `${auth0Domain}/api/v2/`,
    grant_type: "client_credentials",
  };

  const headers = {
   'content-type': 'application/json'
  };

  const requestURL = `${auth0Domain}/oauth/token`

  return axios.post(requestURL, requestBody, { headers });
};

const verifyToken = (next) => {
  if (process.env.NODE_END === "test") next();
  auth({
    issuerBaseURL: auth0Domain,
    audience: `${auth0Domain}/api/v2/`
  });
};

module.exports = { getToken, verifyToken };
