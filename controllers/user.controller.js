const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function getAllUsers() {
  const users = await User.find();
  return users;
}

async function addUser(name, email, password, image = "") {
  try {
    if (!/.+@.+\..+/.test(email)) {
      throw "invalid email";
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = await new User({ name, email, password: hash, image });
    let res = await newUser.save();
    return res;
  } catch (err) {
    throw err;
  }
}

async function removeUser(id) {
  const res = await User.deleteOne({ _id: id });
  return res;
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    res.status(403).send({ err: "User not found" });
  }

  try {
    const passwordMatch = await bcrypt.compare(password, foundUser.password);

    if (passwordMatch) {
      const token = jwt.sign(
        { email: foundUser.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME }
      );

      const refreshToken = jwt.sign(
        { email: foundUser.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME }
      );

      res
        .status(202)
        .send({ access_token: token, refresh_token: refreshToken });
    } else {
      res.status(403).send({ err: "Wrong password" });
    }
  } catch (err) {
    res.status(403).send(err);
  }
}

const toExport = { getAllUsers, addUser, removeUser, loginUser };
module.exports = toExport;
