const Joi = require('joi');
const mongoose = require('mongoose');

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

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean
    });

    return schema.validate(customer);
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;