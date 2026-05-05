//
const express = require("express");
const { urlencoded } = require("express");
const jwt = require("jsonwebtoken");
const verify = require("jsonwebtoken/verify");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: false }));


const dbUrl = process.env.DB_URL;
const PORT = process.env.PORT || 5000;



mongoose.connect(dbUrl)
    .then(() => {
        app.listen(PORT);
        console.log("Connected Successfully");
    })
    .catch((err) => {
        console.log("Failed to connect to MongoDB", err);
    });



app.get("/", (req, res) => {
    res.send("Hello World!");
});


// ROUTES
app.use("/api/user", require("./routes/user"));