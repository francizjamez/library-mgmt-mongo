const express = require("express");
const { addUser, loginUser } = require("../controllers/user.controller");
const authRouter = express.Router();
const multer = require("multer");
const { requestNewToken } = require("../controllers/token.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "static/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const multipart = multer({ storage });

authRouter
  .route("/signup")
  .post(multipart.single("image"), async (req, res) => {
    try {
      const user = req.body;
      const file = req.file;
      const userRes = await addUser(
        user.name,
        user.email,
        user.password,
        file.filename
      );
      res.send(userRes);
    } catch (err) {
      res.status(400).send(err);
    }
  });

authRouter.route("/login").post(loginUser);

authRouter.route("/refresh_token").post(requestNewToken);

module.exports = authRouter;
