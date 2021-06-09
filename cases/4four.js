const { getAllBooks } = require("../controllers/book.controller");
const { showAlert, delay } = require("./utilities");

async function four() {
  showAlert("Books: ");
  await delay(0.5);
  const books = await getAllBooks();
  books.forEach(({ title }) => console.log(`-${title}-`));
}

module.exports = four;
