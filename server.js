const express = require("express");
const connectDB = require("./config/db");

connectDB();

const app = express();

//Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Api running"));
// Define Routes
app.use('/api/auth', require("./routes/api/auth"))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
