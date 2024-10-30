const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const _ = require('lodash');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();


// create new user
router.post('/', async (req, res)=>{
    
    // validate input
    const { error } = validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    // make sure the user is not already registered
    const userDB = await User.findOne({ email: req.body.email });

    if (!userDB) return res.status(400).send('Invalid email or password.');


    // check if password is valid..
    const validPassword = bcrypt.compare(req.body.password, userDB.password);
    
    // password not correct!
    if (!userDB) return res.status(400).send('Invalid email or password.');

    const token = jwt.sign({ _id: userDB._id }, config.get('jwtPrivateKey'));

    res.send(token);


    // // return the result
    // res.send(_.pick(user, ['_id', 'name', 'email']));
});



function validate (req) {

    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(1024).required()
    }

    return Joi.validate(req, schema);
}

module.exports = router;