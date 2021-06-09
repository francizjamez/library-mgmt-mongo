const Category = require("../models/category.model");

let getAllCategories = async () => {
  let categories = await Category.find();
  categories.forEach((cat) => console.log("- " + cat.name));

  return categories;
  console.log("");
};

let addCategory = async (data) => {
  let newCategory = new Category(data);
  console.log("");
  try {
    await newCategory.save();
    console.log("Successfully added category");
  } catch (err) {
    if (err.code === 11000) {
      console.log("!!!Category already exists!!!");
    } else {
      throw err;
    }
  } finally {
    console.log("");
  }
};

let removeCategory = async (name) => {
  const res = await Category.deleteOne({ name: name });

  console.log("");
  if (res.deletedCount === 0) {
    console.log("No such category exists");
  } else {
    console.log("successfully deleted " + name);
  }

  console.log("");
};

module.exports = { getAllCategories, addCategory, removeCategory };
