const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model.js");
const generateToken = require("../utils/generateToken.js");

const signin = async (req, res) => {
    try {
        const {userName, password} = req.body;
        
        const user = await User.findOne({ userName });
        if(!user) {
            return res.status(400).json("User doesn't exist!!!");
        }

        const passMatch = await bcrypt.compare(password, user.password);      // Matching password.
        if(!passMatch) {
            return res.status(400).json("Incorrect Password");
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            userName: user.userName,
            name: user.name
        });

    } catch (error) {
        console.log("Error Internal Signin Server!!!", error.message);
        res.status(500).json("Error!!! Internal Server");
    }
};

const signup = async (req, res) => {
    try {
        const { name, userName, password, confirmPassword } = req.body;

        // matching passwords.
        if (password !== confirmPassword) {
            return res.status(400).json("Passwords doesn't match.");
        }

        // searching username in database, if found then it not unique
        const user = await User.findOne({ userName });
        if (user) {
            return res.status(400).json("User Already Exists.");
        }

        // Hash Passwords here
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // profile picture
        const nameArr = name.split(" ");
        if (nameArr[1] === undefined) profName = nameArr[0];
        else profName = nameArr[0] + "+" + nameArr[1];

        // creating new user.
        const newUser = new User({
            name: name,
            userName: userName,
            password: hashedPassword
        });

        if (newUser) {
            // Generate JWT 
            generateToken(newUser._id, res);

            await newUser.save();       // saving new user

            res.status(201).json({
                _id: newUser.id,
                userName: newUser.userName,
                name: newUser.name
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (error) {
        console.log("Error Internal Signup Server!!!", error.message);
        res.status(500).json("Error!!! Internal Server");
    }
};

const signout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});     // deleting cookie
        res.status(200).json("logged out sucessfully.");
    } catch (error) {
        console.log("Error Internal Signout Server!!!", error.message);
        res.status(500).json("Error!!! Internal Server");
    }
};

module.exports = { signin, signup, signout };
