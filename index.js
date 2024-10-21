const express = require('express');
const app = express();

const auth = require('./routes/auth');
const categories = require('./routes/categories');
const rentals = require('./routes/rentals');
const tools = require('./routes/tools');
const users = require('./routes/users');

app.use(express.json());

// app.use('/api/users', );