const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  createdAt: { type: Date, default: Date.now() },
});

let Category = new mongoose.model("Category", categorySchema);

module.exports = Category;
