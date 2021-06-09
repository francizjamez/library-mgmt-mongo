const { showAlert, delay } = require("./utilities");
const readLineSync = require("readline-sync");
const { findBook } = require("../controllers/book.controller");

async function seven() {
  showAlert("Seach a book");
  delay(0.5);

  const bookToSearch = readLineSync.question("Enter book name: ");

  try {
    let res = await findBook(bookToSearch);
    if (res) {
      showAlert(`Book found\n${res}`);
    } else {
      showAlert(`Book does not exist`);
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = seven;
