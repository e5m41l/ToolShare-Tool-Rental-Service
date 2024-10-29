const { Tool, validate } = require('../models/tool');
const express = require('express');
const router = express.Router();



// get all available tools - GET request 
router.get('/', async (req, res)=>{
    // load categories from DB
    const categories = await Tool.find();

    // return categories
    res.send(categories);
});

// get tool by id - GET request
router.get('/:id', async (req, res)=>{
    // retrieve tool from DB
    const tool = await Tool.findById(req.params.id);

    // check if the tool was not found
    if (!tool) return res.status(404).send(`Sorry, the tool with id ${req.params.id} was not found`);
    
    // return the tool
    res.send(tool);
});

// add new tool - POST request
router.post('/', async (req, res)=>{

    // validate data
    const { error } = validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    // create new tool
    let tool = new Tool({
        name : req.body.name,
        description : req.body.description
      });

    // save the new tool to DB
    tool = await tool.save();

    // return the newly created tool
    res.send(tool);
});

// update existing tool - PUT request
router.put('/:id', async (req, res)=>{
    // validate data
    const { error } = validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    // get the tool and update it
    const tool = await Tool.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            description : req.body.description
        }, {
            new : true
        }
    );

    // check if the tool was not found
    if (!tool) return res.status(404).send(`Sorry, the tool with id ${req.params.id} was not found`);
    
    // return the updated tool
    res.send(tool);
});

// delete  tool - DELETE request
router.delete('/:id', async (req, res)=>{

    // get the tool and update it
    const tool = await Tool.findByIdAndDelete(req.params.id);

    // check if the tool was not found
    if (!tool) return res.status(404).send(`Sorry, the tool with id ${req.params.id} was not found`);
    
    // return the updated tool
    res.send(tool);
});

module.exports = router;
