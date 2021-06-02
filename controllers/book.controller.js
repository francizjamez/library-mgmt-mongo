const Book = require("../models/book.model");
const Category = require("../models/category.model");

const showAllBooks = async () => {
  let books = await Book.find();
  if (!books.length) {
    console.log("No books yet, add a book with option 5");
  } else {
    books.forEach((book) => console.log(book.title));
  }
  console.log("");
};

const addBook = async ({ bookTitle, bookCategory, bookAuthors }) => {
  let category = await Category.findOne({ name: bookCategory });
  console.log("");
  if (!category) {
    console.log("Category not found!");
  } else {
    try {
      let newBook = new Book({
        title: bookTitle,
        category: category._id,
        authors: bookAuthors.split(","),
      });
      await newBook.save();
      console.log("Successfully added book");
    } catch (err) {
      if (err.code === 11000) {
        console.log("!!!Book already exists!!!");
      } else {
        throw err;
      }
    }
  }

  console.log("");
};

const removeBook = async (title) => {
  let res = await Book.deleteOne({ title });
  console.log();
  if (res.deletedCount === 0) {
    console.log("The book does not exist");
  } else {
    console.log("Book successfully deleted");
  }
  console.log();
};

const findBook = async (title) => {
  const books = await Book.find({ title });

  console.log();
  if (books.length) {
    books.forEach((book) => console.log(book));
  } else {
    console.log("No books match");
  }
  console.log();
};

module.exports = { showAllBooks, addBook, removeBook, findBook };
