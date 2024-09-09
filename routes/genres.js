const {Genre, validate} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//getting all the genres
router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
}); 

//create a new genre
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();

    res.send(genre);
});

//update an existing genre
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    })

    if(!genre) return res.status(404).send('The Genre with the given ID was not found');

    res.send(genre);
});

//delete an existing genre
router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id);

    if(!genre) return res.status(404).send('The Genre with the given ID was not found');

    res.send(genre);
});

//get a specific genre
router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if(!genre) return res.status(404).send('The Genre with the given ID was not found');

    res.send(genre);
});

module.exports = router;
