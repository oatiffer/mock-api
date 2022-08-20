const express = require('express');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

// Express App wrapper

const app = express();

// Express App Middlewares

app.use(express.json());
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

module.exports = app;
