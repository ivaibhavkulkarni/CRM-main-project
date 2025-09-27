require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const ConnectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const app = express();


// Middleware to handle CORS

app.use(
    cors({
        origin: "*",
        methods: ["GET", "PUT", "POST", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);


// Connect Database 
ConnectDB();


// Middleware
app.use(express.json());


// Routes here
app.use("/api/auth", authRoutes)


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));