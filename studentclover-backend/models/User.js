// models/User.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        email: String,
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
    subscriptionActive: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('User', UserSchema);
