const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db")
require("dotenv").config();
const authRoutes = require("./routes/authRoutes")


connectDb();

const app = express();

app.use(cors());
app.use(express.json())

app.use("/api/auth" , authRoutes)

app.get("/" , (req , res) => {
    res.json("Hello world")
})

const PORT = process.env.PORT;

app.listen(PORT , () => {
    console.log("Server is running on PORT " , 5000);
})