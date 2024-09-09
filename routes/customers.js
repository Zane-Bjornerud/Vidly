const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    },
    isGold: {
        type: Boolean,
        defualt: false
    },
    phone: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    }
}));

//getting all the customers
router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
}); 

//create a new customer
router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({ 
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    customer = await customer.save();

    res.send(customer);
});

//update an existing customer
router.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, 
        { 
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold,
         }, { new: true});

    if(!customer) return res.status(404).send('The customer with the given ID was not found');

    res.send(customer);
});

//delete an existing customer
router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if(!customer) return res.status(404).send('The customer with the given ID was not found');

    res.send(customer);
});

//get a specific customer
router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if(!customer) return res.status(404).send('The customer with the given ID was not found');

    res.send(customer);
});

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean
    });

    return schema.validate(customer);
}

module.exports = router;