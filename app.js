const express = require('express');
const cors = require('cors');
const defaultRoute = require('./routes/defaultRoute');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

// Express App wrapper

const app = express();

// Express App Middlewares

app.use(cors());
app.use(express.json());
app.use('/', defaultRoute);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

module.exports = app;
