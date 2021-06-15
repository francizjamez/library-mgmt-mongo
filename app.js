const express = require("express");
// const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 3001;
const jwt = require("jsonwebtoken");

const { getAllCategories } = require("./controllers/category.controller");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const app = express();
app.set("view engine", "pug");
app.use(express.json());
app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  const { method, url } = req;
  const { statusCode } = res;
  console.log(`${method} ${url} ${statusCode}`);
  next();
});

const validateRequest = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(404).send("No token provided");
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    const verify = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (err) {
    res.status(401).send(err);
  }
};

//Route imports
const bookRouter = require("./routes/books");
const authRouter = require("./routes/auth.route");

//Routes
app.get("/", async (req, res) => {
  res.render("index");
});

app.get("/add", async (req, res) => {
  const categories = await getAllCategories();
  res.render("add", { categories: categories });
});

app.use("/books", validateRequest, bookRouter);
app.use("/auth", authRouter);

app.get("*", (req, res) => {
  res.send("You are lost bb boi");
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
