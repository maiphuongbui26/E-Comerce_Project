require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/database.config');

const app = express();

// Connect to MongoDB
connectDB();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to E-Commerce API' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});