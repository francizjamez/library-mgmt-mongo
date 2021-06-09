const Category = require("../models/category.model");

let getAllCategories = async () => {
  let categories = await Category.find();
  return categories;
};

let addCategory = async (data) => {
  let newCategory = new Category(data);
  try {
    let response = await newCategory.save();
    return response;
  } catch (err) {
    throw err;
  }
};

let removeCategory = async (name) => {
  const res = await Category.deleteOne({ name: name });
  return res;
};

const findCategory = async (name) => {
  const res = await Category.findOne({ name: name });
  return res;
};

const toExport = {
  getAllCategories,
  addCategory,
  removeCategory,
  findCategory,
};

module.exports = toExport;
