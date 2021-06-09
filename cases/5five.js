const { showAlert, delay } = require("./utilities");
const readLineSync = require("readline-sync");
const { addBook } = require("../controllers/book.controller");
const { findCategory } = require("../controllers/category.controller");

async function five() {
  showAlert("Add a book: ");
  await delay(0.5);
  const bookTitle = readLineSync.question("Enter book title: ");
  const bookCategory = readLineSync.question("Enter book category: ");
  const bookAuthors = readLineSync.question(
    "Enter book authors(separated by commas): "
  );

  console.log("");
  try {
    const category = await findCategory(bookCategory);

    if (category) {
      let res = await addBook({
        bookTitle: bookTitle,
        bookCategory: category._id,
        bookAuthors: bookAuthors,
      });
      showAlert(`Created Book\n${res}`);
    } else {
      showAlert(`Category does not exist`);
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = five;
