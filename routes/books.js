const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  addBook,
  removeBook,
} = require("../controllers/book.controller");

router
  .route("/")
  .get(async (req, res) => {
    const books = await getAllBooks();
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
  });

router.route("/:bookID").get((req, res) => {
  res.send(`Book requested  :${req.params.bookID}`);
});
router.route("/:bookID").delete(async (req, res) => {
  try {
    let bookRes = await removeBook(req.params.bookID);
    res.status(203).send(bookRes);
  } catch (err) {
    console.log(err);
    res.sendStatus(401);
  }
});
module.exports = router;
