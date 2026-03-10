const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection
mongoose.connect("mongodb+srv://kavindya20010511_db_user:wyXdPnd8t47qSO4S@cluster0.wdrnr6n.mongodb.net/?appName=Cluster0")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log("MongoDB Connection Error:", err);
});

// Test Route
app.get("/", (req, res) => {
    res.send("Lost & Found API Running");
});

// Server Port
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

//wyXdPnd8t47qSO4S