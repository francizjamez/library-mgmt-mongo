const Book = require("../models/book.model");
const Category = require("../models/category.model");

const getAllBooks = async () => {
  const books = await Book.find();
  return books;
};

const addBook = async ({ bookTitle, bookCategory, bookAuthors }) => {
  const newBook = new Book({
    title: bookTitle,
    category: bookCategory,
    authors: bookAuthors.split(","),
  });

  let res = await newBook.save();
  return res;
};

const removeBook = async (id) => {
  // let res = await Book.deleteOne({ title });
  let res = await Book.deleteOne({ _id: id });
  return res;
};

const findBook = async (title) => {
  const book = await Book.findOne({ title });
  return book;
};

const findBooks = async (data) => {
  const books = await Book.find(data);
  return books;
};

const toExport = {
  getAllBooks,
  addBook,
  removeBook,
  findBooks,
  findBook,
};

module.exports = toExport;
