require('express-async-errors');
const winston = require('winston'); //logger
require('winston-mongodb');
const error = require('./middleware/error');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const app = express();

process.on('uncaughtException', (ex) => {
    winston.error(ex.message, ex);
    process.exit(1);
});

process.on('unhandledRejection', (ex) => {
    console.log('We got an unhandled promise rejection');
    winston.error(ex.message, ex);
    process.exit(1);
});

winston.exceptions.handle(new winston.transports.File({ filename: 'uncaughtExceptions.log'}))

winston.add(new winston.transports.File({ filename: 'logfile.log' }));
//winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/vidly', level: 'error'}));

//const p = Promise.reject(new Error('Something failed miserably'))

if(!config.get('jwtPrivateKey')){
    console.log('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1); //exit(1) to exit because of error
}

mongoose.connect('mongodb://localhost/vidly') //, {useUnifiedTopology: true}
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error);//all the logic for handling errors in our application

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));