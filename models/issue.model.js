const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    member: { type: mongoose.Schema.Types.ObjectID, ref: "Member" },
  },
  { timestamps: true }
);

let Issue = new mongoose.model("Issue", issueSchema);

module.exports = Issue;
