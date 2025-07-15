/*
--- 1. server.js (Main Entry Point) ---
This file should be placed in the root of your /server folder.
*/

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
// const connectDB = require('./config/db'); // We will define this later

const authRoutes = require('./routes/auth.routes');

// Load environment variables from .env file
dotenv.config();

// --- Database Connection (Example) ---
/*
// To connect to a real database like MongoDB Atlas (free tier available)
// you would have a file like this:
// config/db.js
const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
module.exports = connectDB;
// And then you would call connectDB(); here before starting the server.
*/


const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing for your frontend
app.use(express.json()); // To accept JSON data in the request body

// --- API Routes ---
app.get('/', (req, res) => {
  res.send('MyFlav Foods API is running...');
});

// This tells the server to use the routes defined in auth.routes.js
// for any URL that starts with /api/auth
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
