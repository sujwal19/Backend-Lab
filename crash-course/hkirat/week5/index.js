import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/", (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/add", (req, res) => {
  let a = parseInt(req.query.a);
  let b = parseInt(req.query.b);
  res.json(a + b);
});

const PORT = 3000;
app.listen(3000, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
