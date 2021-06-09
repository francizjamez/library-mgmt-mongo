const { findBooks } = require("../controllers/book.controller");
const { findCategory } = require("../controllers/category.controller");
const one = require("./1one");
const { delay, showAlert } = require("./utilities");
const readLineSync = require("readline-sync");

async function eight() {
  showAlert("Get all books by category");
  await delay(0.5);
  await one();
  console.log();

  const categoryToSearch = readLineSync.question("Enter category to search: ");
  console.log();
  try {
    let category = await findCategory(categoryToSearch);

    if (category) {
      const books = await findBooks({ category: category._id });

      if (books.length) {
        books.forEach((book) => console.log(`-${book.title}-`));
      } else {
        showAlert("No books found in this category add one via #5");
      }
    } else {
      showAlert("Category does not exist");
    }
  } catch (e) {}
}

module.exports = eight;
