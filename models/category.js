const mongoose = require('mongoose');
const Joi = require('joi');


const Category = mongoose.model("Category", new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
      },
      description: {
        type: String,
        maxlength: 255,
      },
}));


function validateCategory (category) {

    const schema = {
        name : Joi.string().min(3).max(50).required(),
        description: Joi.string().max(255)
    };

    return Joi.validate(schema, category);
}


exports.Category = Category;
exports.validate = validateCategory;