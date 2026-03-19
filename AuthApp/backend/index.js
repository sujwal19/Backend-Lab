const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./models/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

connectDB();

app.use("/ping", (req, res) => {
  res.send("PONG");
});

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", authRoutes);
app.use("/products", productRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port localhost:${PORT}`.yellow.bold);
});
