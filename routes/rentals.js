const { Rental, validate } = require('../models/rental');
const express = require('express');
const router = express.Router();

// get all available rentals - GET request 
router.get('/', async (req, res)=>{
    // load rentals from DB
    const rentals = await Rental.find();

    // return rentals
    res.send(rentals);
});

// get rental by id - GET request
router.get('/:id', async (req, res)=>{
    // retrieve rental from DB
    const rental = await Rental.findById(req.params.id);

    // check if the rental was not found
    if (!rental) return res.status(404).send(`Sorry, the rental with id ${req.params.id} was not found`);
    
    // return the rental
    res.send(rental);
});

// add new rental - POST request
router.post('/', async (req, res)=>{

    // validate data
    const { error } = validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    // create new rental
    let rental = new Rental({
        // to do for the user ....
        tool : req.body.tool,
        returnDate : req.body.returnDate,
        rentalFee : req.body.rentalFee
      });

    // save the new rental to DB
    rental = await rental.save();

    // return the newly created rental
    res.send(rental);
});

// update existing rental - PUT request
router.put('/:id', async (req, res)=>{
    // validate data
    const { error } = validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    // get the rental and update it
    const rental = await Rental.findByIdAndUpdate(req.params.id,
        {
            // to do for the user ....
            tool : req.body.tool,
            returnDate : req.body.returnDate,
            rentalFee : req.body.rentalFee
        }, {
            new : true
        }
    );

    // check if the rental was not found
    if (!rental) return res.status(404).send(`Sorry, the rental with id ${req.params.id} was not found`);
    
    // return the updated rental
    res.send(rental);
});

// delete  rental - DELETE request
router.delete('/:id', async (req, res)=>{

    // get the rental and update it
    const rental = await Rental.findByIdAndDelete(req.params.id);

    // check if the rental was not found
    if (!rental) return res.status(404).send(`Sorry, the rental with id ${req.params.id} was not found`);
    
    // return the updated rental
    res.send(rental);
});


module.exports = router;
