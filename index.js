//create a service for managing the list of genres, action, horror
//have an endpoint for getting the list of genres
//be able to create a new genre
//update an existing genre
//delete an existing genre
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDB... '))
    .catch(err => console.error('Could not connect to MongoDB... '));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/custoemrs', customers);

app.use(function(req,res, next) {
    console.log('Logging... ');
    next();
});

app.use(function(req,res, next) {
    console.log('Authenticating... ');
    next();
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));