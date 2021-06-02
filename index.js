const readLineSync = require("readline-sync");
const mongoose = require("mongoose");
const {
  showAllCategories,
  addCategory,
  removeCategory,
} = require("./controllers/category.controller");
const {
  showAllBooks,
  addBook,
  removeBook,
  findBook,
} = require("./controllers/book.controller");

mongoose.connect("mongodb://127.0.0.1:27017/library", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

mongoose.connection.on("open", async () => {
  showMenu();
});

async function showMenu() {
  console.log("----------------------Choose an option------------------------");
  console.log("1-Show all categories   2-Add a category   3-Remove a category");
  console.log("4-Show all books        5-Add book         6-Remove a book");
  console.log("7-Search a book\n");
  let question = readLineSync.question("Choice: ");

  switch (question) {
    case "1":
      showAlert("Categories: ");
      delay(showAllCategories, 0.75);
      delay(showMenu, 1.5);
      break;
    case "2":
      showAlert("Add a category");
      delay(async () => {
        let categoryName = readLineSync.question("Enter category name: ");
        await addCategory({ name: categoryName });
        delay(showMenu, 1);
      }, 0.75);

      break;
    case "3":
      showAlert("Select category to remove");
      delay(showAllCategories, 0.75);
      delay(async () => {
        let categoryToRemove = readLineSync.question("Enter category name: ");
        await removeCategory(categoryToRemove);
        delay(showMenu, 1.5);
      }, 1.5);
      break;
    case "4":
      showAlert("Books: ");
      delay(showAllBooks, 0.75);
      delay(showMenu, 1.5);
      break;
    case "5":
      showAlert("Add a book");

      delay(async () => {
        let bookTitle = readLineSync.question("Enter book Title: ");
        showAlert("Categories: ");
        await showAllCategories();
        let bookCategory = readLineSync.question("Enter book Category: ");
        let bookAuthors = readLineSync.question(
          "Enter authors(separated by commas): "
        );
        await addBook({ bookTitle, bookAuthors, bookCategory });
        delay(showMenu, 1.5);
      }, 1.5);
      break;
    case "6":
      showAlert("Remove a book");

      delay(async () => {
        showAlert("Books: ");
        await showAllBooks();
        let bookTitle = readLineSync.question("Enter book Title: ");
        await removeBook(bookTitle);
        delay(showMenu, 1.5);
      }, 1);
      break;
    case "7":
      showAlert("Find a book");
      delay(async () => {
        let bookTitle = readLineSync.question("Enter book Title: ");
        await findBook(bookTitle);
        delay(showMenu, 1.5);
      }, 1);
      break;
    default:
      showAlert("INVALID INPUT");
      delay(showMenu, 0.75);
      break;
  }
}

function showAlert(message) {
  let dashes = new Array(message.length).fill("-").join("");
  console.log(`\n${dashes}`);
  console.log(message);
  console.log(`${dashes}\n`);
}

function delay(func, time) {
  setTimeout(() => func(), time * 1000);
}
