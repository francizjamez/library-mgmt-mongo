const express = require("express");
const router = express.Router();
const { getAllBooks, addBook } = require("../controllers/book.controller");

router
  .route("/")
  .get(async (req, res) => {
    const books = await getAllBooks();
    console.log(books);
    res.send(books);
    // res.render("books", { books });
  })
  .post(async (req, res) => {
    // res.redirect("/");
    try {
      addBook(req.body);
      res.redirect("/");
    } catch (err) {
      res.send("error in adding book");
    }
  })
  .delete(async (req, res) => {
    try {
      addBook(req.body);
      res.redirect("/");
    } catch (err) {
      res.send("error in adding book");
    }
  });

router.route("/:bookID").get((req, res) => {
  res.send(`Book requested  :${req.params.bookID}`);
});
module.exports = router;
