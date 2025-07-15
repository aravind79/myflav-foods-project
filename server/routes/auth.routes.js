/*
--- 3. routes/auth.routes.js ---
This file should be placed inside the /server/routes/ folder.
*/

const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/auth.controller');

// @route   POST /api/auth/register
// @desc    Register a new user (typically done by an Admin)
// @access  Public (for now, would be Admin-only later)
router.post('/register', registerUser);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', loginUser);

module.exports = router;
