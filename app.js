const express = require("express");
// const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 3001;
const { getAllCategories } = require("./controllers/category.controller");

mongoose.connect("mongodb://127.0.0.1:27017/library", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const app = express();
app.set("view engine", "pug");
app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  const { method, url } = req;
  const { statusCode } = res;
  console.log(`${method} ${url} ${statusCode}`);
  next();
});

const bookRouter = require("./routes/books");

app.get("/", async (req, res) => {
  res.render("index");
});

app.get("/add", async (req, res) => {
  const categories = await getAllCategories();
  res.render("add", { categories: categories });
});

app.use("/books", bookRouter);

app.get("*", (req, res) => {
  res.send("You are lost bb boi");
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
