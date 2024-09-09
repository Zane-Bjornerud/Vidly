const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre'); //loaded from genre model

const Movie = mongoose.model('Movies', new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true, //to get rid of any paddings around the title of the movie
        minLength: 5,
        maxLength: 255
    }, 
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0, //dont want a negative number here
        max: 255 //don't want malicious client to send a large number to break application
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
}));

function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    });

    return schema.validate(movie);
}