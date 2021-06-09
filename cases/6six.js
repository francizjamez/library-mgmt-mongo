const { showAlert, delay } = require("./utilities");
const readLineSync = require("readline-sync");
const {
  getAllBooks,
  removeBook,
  findBook,
} = require("../controllers/book.controller");

async function six() {
  showAlert("Remove a book: ");
  await delay(0.5);
  const books = await getAllBooks();
  books.forEach(({ title }) => console.log(`-${title}-`));
  await delay(1);
  const bookToRemove = readLineSync.question("Enter book to remove: ");

  console.log();
  try {
    let res = await findBook(bookToRemove);
    if (res) {
      removeBook(res);
      showAlert(`Successfully removed book '${bookToRemove}'`);
    } else {
      showAlert("Book does not exist");
    }
  } catch (e) {
    throw e;
  }
}

module.exports = six;
