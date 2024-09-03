const express = require('express');
const router = express.Router();

const genres = [
    {id: 1, name: 'genre1'}
]

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(genre);
}

//getting all the genres
router.get('/', (req, res) => {
    res.send(genres);
}); 

//create a new genre
router.post('/', (req, res) => {
    const { error } = validateGenre(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre);
    res.send(genre);
});

//update an existing genre
router.put('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The Genre with the given ID was not found');

    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);
});

//delete an existing genre
router.delete('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The Genre with the given ID was not found');

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
})

//get a specific genre
router.get('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The Genre with the given ID was not found');
    res.send(genre);
})

module.exports = router;