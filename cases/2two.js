const { showAlert, delay } = require("./utilities");
const readLineSync = require("readline-sync");
const { addCategory } = require("../controllers/category.controller");

async function two() {
  showAlert("Add a category: ");
  await delay(0.5);
  const categoryName = readLineSync.question("Enter category name: ");

  try {
    let res = await addCategory({ name: categoryName });
    showAlert(`Created Category\n${res}`);
  } catch (err) {
    if (err.code === "11000") {
      showAlert("!!!Category already exists!!!");
    } else {
      console.log(err);
    }
  }
}

module.exports = two;
