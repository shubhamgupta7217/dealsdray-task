const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes.js");
const employeeRoutes = require("./routes/employee.routes.js");
const connectToDB = require("./db/connectToMongoDB.js");

const app = express();  // starting the express server.

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse the incoming requests with JSON payloads
app.use(cookieParser()); // to extract and parse cookies from HTTP requests.
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your frontend origin
    res.header('Access-Control-Allow-Headers',   
   'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


app.get('/', (req, res) => {
    // root route http://localhost:5000/
    res.send("Hello");
});

// auth routes 
app.use("/api/auth/", authRoutes); 

// employee routes
app.use("/api/emp/", employeeRoutes); 

app.listen(PORT, () => {
    connectToDB();
    console.log(`server running on port: ${PORT}`);
});