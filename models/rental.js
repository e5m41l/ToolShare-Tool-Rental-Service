const mongoose = require('mongoose');
const Joi = require('joi');

const Rental = mongoose.model("Rental", new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tool: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tool',
      required: true,
    },
    rentalDate: {
      type: Date,
      default: Date.now,
    },
    returnDate: {
      type: Date,
    },
    rentalFee: {
      type: Number,
      min: 0,
    },
}));

function validateRental (rental) {

    const schema = {
        name : Joi.string().min(3).max(50).required(),
        description: Joi.string().max(255)
    };

    return Joi.validate(schema, rental);
}

exports.Rental = Rental;
exports.validate = validateRental;