// routes/users.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// User sign-up
router.post('/signup', async (req, res) => {
    const { email, password, role } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ email, password, role });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error('Error in /signup:', err.message);
        res.status(500).send('Server error');
    }
});

// User sign-in
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error('Error in /signin:', err.message);
        res.status(500).send('Server error');
    }
});

// Protected route example (get user profile)
router.get('/profile', async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error('Error in /profile:', err.message);
        res.status(500).send('Server error');
    }
});

// Get a random user
router.get('/random', async (req, res) => {
    try {
        const count = await User.countDocuments({ role: 'Student' });
        const random = Math.floor(Math.random() * count);
        const user = await User.findOne({ role: 'Student' }).skip(random);

        res.status(200).json(user);
    } catch (err) {
        console.error('Error in /random:', err.message);
        res.status(500).send('Server error');
    }
});

// Get all students (excluding sponsors)
router.get('/all', async (req, res) => {
    try {
        const { search } = req.query;
        let query = { role: 'Student' };

        if (search) {
            query = {
                ...query,
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
