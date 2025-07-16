/*
--- 1. server.js (Corrected & Improved) ---
This file should be placed in the root of your /server folder.
*/

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose'); // Import mongoose

const authRoutes = require('./routes/auth.routes');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- API Routes ---
app.get('/', (req, res) => {
  res.send('MyFlav Foods API is running...');
});

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

// --- Database Connection & Server Start ---
const startServer = async () => {
  try {
    // process.env.MONGO_URI is the variable you set on Render
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Only start listening for requests AFTER the database connection is successful
    app.listen(PORT, console.log(`Server running on port ${PORT}`));

  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

// Start the server
startServer();
