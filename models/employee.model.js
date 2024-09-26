const mongoose = require("mongoose");

// Schema for Employees
const empSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    mobile: {
        type: String,
        required: true,
    },
    designation: {
        type: String
    },
    gender: {
        type: String
    },
    course: {
        type: String
    },
    img: {
        type: String
    },
    createDate: {
        type: Date,
        default: Date.now
    }
});

const Employee = mongoose.model("Employee", empSchema);

module.exports = Employee;