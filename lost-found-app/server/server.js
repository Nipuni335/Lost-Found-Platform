const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/admin", adminRoutes);

mongoose.connect("mongodb+srv://kavindya20010511_db_user:wyXdPnd8t47qSO4S@cluster0.wdrnr6n.mongodb.net/?appName=Cluster0")
.then(()=>console.log("MongoDB Connected"));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/items", require("./routes/itemRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.listen(5000, () => console.log("Server running"));

//wyXdPnd8t47qSO4S

//cd lost-found-app
//cd server
//node server.js