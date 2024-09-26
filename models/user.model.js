const mongoose = require("mongoose");

// Schema for users.
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;