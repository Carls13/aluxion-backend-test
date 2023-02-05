const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const router = require('./network/routes');

const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');


app.use(cors());

app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({limit: '500mb'}));

app.use('/static', express.static(path.join(__dirname + '/static')));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

router(app);

module.exports = app;