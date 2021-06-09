const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    memberID: {
      type: String,
    },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

let Member = new mongoose.model("Member", memberSchema);

module.exports = Member;
