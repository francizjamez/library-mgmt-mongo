const {
  getAllCategories,
  removeCategory,
} = require("../controllers/category.controller");
const { showAlert, delay } = require("./utilities");
const readLineSync = require("readline-sync");

async function three() {
  showAlert("Remove a category: ");
  await delay(0.5);
  const categories = await getAllCategories();
  categories.forEach(({ name }) => console.log(`-${name}-`));
  await delay(1);
  const categoryToRemove = readLineSync.question("Enter category to remove: ");

  try {
    let res = await removeCategory(categoryToRemove);
    if (res.deletedCount) {
      showAlert(`Successfully removed category '${categoryToRemove}'`);
    } else if (!res.deletedCount) {
      showAlert(`${categoryToRemove} category does not exist`);
    } else {
      showAlert("Cannot process remove query");
    }
  } catch (e) {
    throw e;
  }
}

module.exports = three;
