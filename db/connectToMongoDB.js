const mongoose = require("mongoose");

// MONGODB connection.
const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Successfully connected to DB");
    } catch (error) {
        console.log(`Error connecting in DB ${error}`);
    }
}

module.exports = connectToDB;