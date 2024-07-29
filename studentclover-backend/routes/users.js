// routes/users.js

const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// User sign-up
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            console.log('User already exists');
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        console.log('User registered successfully');
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error('Error in /signup:', err.message);
        res.status(500).send('Server error');
    }
});

// Create or update profile
router.post('/profile', async (req, res) => {
    const { email, profile } = req.body;
    console.log('Received email:', email);
    console.log('Received profile:', profile);

    try {
        let user = await User.findOne({ email });
        if (!user) {
            console.log('User not found for email:', email);
            return res.status(404).json({ msg: 'User not found' });
        }

        user.profile = profile;
        await user.save();

        console.log('Profile updated successfully');
        res.status(200).json({ msg: 'Profile updated successfully' });
    } catch (err) {
        console.error('Error in /profile:', err.message);
        res.status(500).send('Server error');
    }
});

// Get all users with optional search and dynamic ordering
router.get('/all', async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};

        if (search) {
            query = {
                $or: [
                    { 'profile.name': { $regex: search, $options: 'i' } },
                    { 'profile.school': { $regex: search, $options: 'i' } },
                    { 'profile.typeOfSchool': { $regex: search, $options: 'i' } },
                    { 'profile.race': { $regex: search, $options: 'i' } },
                    { 'profile.gender': { $regex: search, $options: 'i' } }
                ]
            };
        }

        let users = await User.find(query);

        // Shuffle users for dynamic ordering
        users = users.sort(() => 0.5 - Math.random());

        res.status(200).json(users);
    } catch (err) {
        console.error('Error in /all:', err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
