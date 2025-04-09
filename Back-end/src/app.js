require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database.config');
const userRoutes = require('./routes/user.routes');
const logger = require('./logs/logger');


const app = express();

// Connect to MongoDB
connectDB();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cookieParser = require('cookie-parser');
const cors = require('cors');
// Thêm vào sau các middleware cơ bản
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true, // Cho phép gửi cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
// Routes
app.use('/api/users', userRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to E-Commerce API' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  logger.info({
    message: 'Server is running on port',
    PORT: PORT,
    timestamp: new Date().toISOString()
  });
});