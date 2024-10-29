const mongoose = require('mongoose');
const Joi = require('joi');


const Tool = mongoose.model("Tool", new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    brand: String,
    description: String,
    rentalRate: {
      type: Number,
      required: true,
      min: 0,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    condition: {
      type: String,
      enum: ['New', 'Excellent', 'Good', 'Fair', 'Poor'],
      default: 'Good',
    },
    imageUrl: String,
    addedDate: {
      type: Date,
      default: Date.now,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 3,
    },
    rentedTimes: {
      type: Number,
      default: 0,
    },
}));


function validateTool (tool) {

    const schema = {
        name : Joi.string().min(3).max(50).required(),
        description: Joi.string().max(255)
    };

    return Joi.validate(schema, tool);
}

exports.Tool = Tool;
exports.validate = validateTool;