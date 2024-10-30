const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();


// create new user
router.post('/', async (req, res)=>{
    
    // validate input
    const { error } = validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    // make sure the user is not already registered
    const userDB = await User.findOne({ email: req.body.email });

    if (userDB) return res.status(400).send('User already registered');

    // create a new user from the request body data
    const user = new User(_.pick(req.body, ['name', 'email', 'password']));
    
    // hashing the password before saving to DB
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // save the user to the DB
    await user.save();

    // retrn the result
    res.send(_.pick(user, ['_id', 'name', 'email']));
});


module.exports = router;
