const { Category, validate } = require('../model/category');
const express = require('express');
const router = express.Router();

// get all available categories - GET request 
router.get('/', async (req, res)=>{
    // load categories from DB
    const categories = await Category.find();

    // return categories
    res.send(categories);
});

// get category by id - GET request
router.get('/:id', async (req, res)=>{
    // retrieve category from DB
    const category = await Category.findById(req.params.id);

    // check if the category was not found
    if (!category) return res.status(404).send(`Sorry, the category with id ${req.params.id} was not found`);
    
    // return the category
    res.send(category);
});

// add new category - POST request
router.post('/', async (req, res)=>{

    // validate data
    const { error } = validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    // create new category
    let category = new Category({
        name : req.body.name,
        description : req.body.description
      });

    // save the new category to DB
    category = await category.save();

    // return the newly created category
    res.send(category);
});

// update existing category - PUT request
router.put('/:id', async (req, res)=>{
    // validate data
    const { error } = validateCategory(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    // get the category and update it
    const category = await Category.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            description : req.body.description
        }, {
            new : true
        }
    );

    // check if the category was not found
    if (!category) return res.status(404).send(`Sorry, the category with id ${req.params.id} was not found`);
    
    // return the updated category
    res.send(category);
});

// delete  category - DELETE request
router.delete('/:id', async (req, res)=>{

    // get the category and update it
    const category = await Category.findByIdAndDelete(req.params.id);

    // check if the category was not found
    if (!category) return res.status(404).send(`Sorry, the category with id ${req.params.id} was not found`);
    
    // return the updated category
    res.send(category);
});

module.exports = router;
