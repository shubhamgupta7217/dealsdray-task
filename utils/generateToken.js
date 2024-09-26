const jwt = require("jsonwebtoken");

const generatetoken = (userId, res) => {
    // generating web token
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });

    // Set Cookie.
    res.cookie("jwt", token, {
        maxAge: 1 * 11 * 59 * 59 * 999, // dd hh mm ss ms (milisecond format).
        httpOnly: true,     // prevent XXS attacks and cross-site scripting attacks
        sameSite: "strict",     // prevent CSRF attacks and cross-site forgery attacks.
        secure: process.env.NODE_ENV !== "development"
    });
}

module.exports = generatetoken;