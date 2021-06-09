const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
  name: { type: "String", required: true },
  count: { type: Number, default: 0 },
});

let Counters = new mongoose.model("Counter", CounterSchema);

module.exports = Counters;
