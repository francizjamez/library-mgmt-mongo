const { getAllCategories } = require("../controllers/category.controller");
const { showAlert, delay } = require("./utilities");

async function one() {
  showAlert("Categories: ");
  await delay(0.5);
  const categories = await getAllCategories();

  if (categories.length) {
    categories.forEach(({ name }) => console.log(`-${name}-`));
  } else {
    showAlert(`No categories yet, add one via #2`);
  }
}

module.exports = one;
