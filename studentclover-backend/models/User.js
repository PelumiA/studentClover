// models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Student', 'Sponsor'],
        required: true
    },
    profile: {
        name: String,
        school: String,
        typeOfSchool: String,
        amountNeeded: String,
        bio: String,
        age: String,
        race: String,
        gender: String,
        profilePic: String
    },
    acceptedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    rejectedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;