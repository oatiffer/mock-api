require('dotenv/config');

const cors = require('cors');
const mongoose = require('mongoose');

const app = require('./app');

// Server Middlewares

app.use(cors());

// Define options object for DB connection
console.log(process.env.DB_DATABASE);
console.log(process.env.DB_USERNAME);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_URI);

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
