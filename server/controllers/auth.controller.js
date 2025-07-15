/*
--- 4. controllers/auth.controller.js ---
This file should be placed inside the /server/controllers/ folder.
*/

const jwt = require('jsonwebtoken');
const User = require('../models/user.model'); // We now use the real User model

// @desc    Register a new user
const registerUser = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const userExists = await User.findOne({ username });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            username,
            password, // The hashing is handled by the pre-save hook in the model
            role,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                role: user.role,
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Authenticate user & get token
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user && (await user.matchPassword(password))) {
            // Create a token
            const token = jwt.sign(
                { id: user._id, role: user.role },
                process.env.JWT_SECRET, 
                { expiresIn: '1d' }
            );

            res.json({
                _id: user._id,
                username: user.username,
                role: user.role,
                token: token,
            });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { registerUser, loginUser };
