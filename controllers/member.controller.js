const Member = require("../models/member.model");
const Counters = require("../models/counters.model");

const addMember = async (name) => {
  let counter = await Counters.findOne({ name: "member" });

  let { count } = counter;
  let id = "";
  for (let i = 0; i < 6 - count.toString().length; i++) {
    id += 0;
  }
  id += count;
  await Counters.updateOne({ name: "member" }, { $inc: { count: 1 } });
  let newMember = new Member({ name, memberID: id });
  await newMember.save();
};

module.exports = { addMember };
