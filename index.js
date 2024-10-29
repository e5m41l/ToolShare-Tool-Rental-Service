const express = require('express');
const app = express();
const mongoose = require('mongoose');
const auth = require('./routes/auth');
const categories = require('./routes/categories');
const rentals = require('./routes/rentals');
const tools = require('./routes/tools');
const users = require('./routes/users');

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/toolshareDB')
    .then(()=>console.log('Connected to MongoDB'))
    .catch(()=>console.log('Failed to Connect to MongoDB'));



app.use('/api/auth', auth);
app.use('/api/categories', categories);
app.use('/api/rentals', rentals);
app.use('/api/tools', tools);
app.use('/api/users', users);


const PORT = process.env.PORT || 7000

app.listen(PORT, ()=>console.log(`Application started on PORT: ${PORT}...`));
