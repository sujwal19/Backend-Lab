const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json()); // Allows us to read JSON bodies

// Mock Database (In a real app, use MongoDB or PostgreSQL)
const users = [];
const SECRET = process.env.SECRET;

// --- SIGN UP ---
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // Hash the password
  const hashedPw = await bcrypt.hash(password, 10);

  users.push({ username, password: hashedPw });
  res.status(201).send("User registered!");
});

// --- LOGIN ---
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send("Invalid username or password");
  }

  // Create the Token
  const token = jwt.sign({ name: user.username }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// --- PROTECTED ROUTE (Middleware) ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Format: "Bearer <token>"

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Token expired or fake
    req.user = user;
    next();
  });
};

app.get("/profile", authenticateToken, (req, res) => {
  res.send(`This is private data for ${req.user.name}`);
});

app.listen(3000, () => console.log("Server running on port 3000"));
