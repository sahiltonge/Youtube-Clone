const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    channelName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // So the same email can't register twice
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema);
