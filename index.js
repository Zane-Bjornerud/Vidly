const winston = require('winston');
const express = require('express');
const config = require('config');
const app = express();

require('./startup/logging')(); //put first so that if other routes fail, will be logged
require('./startup/routes')(app); //get a function returned so call it with input of app 
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;