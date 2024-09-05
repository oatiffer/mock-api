require('dotenv/config');

const mongoose = require('mongoose');
const app = require('./app');

// Define options object for DB connection

const options = {
  dbName: process.env.DB_DATABASE,
  user: process.env.DB_USERNAME,
  pass: process.env.DB_PASSWORD,
};

// Connect to DB

mongoose
  .connect(process.env.DB_URI, options)
  .then(() => console.log('Connected to DB...'))
  .catch((err) => console.log(err));

// Listen for error events after DB connection

mongoose.connection.on('error', (err) => console.log(err));

// Instruct the server to listen on the specified port

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
