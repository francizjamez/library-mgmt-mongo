const jwt = require("jsonwebtoken");

const requestNewToken = async (req, res) => {
  const refreshToken = req.body.refresh_token;
  console.log(refreshToken);
  console.log("requesting new token");

  try {
    const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    console.log(user);
    const newToken = jwt.sign(
      { email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
      }
    );

    console.log(newToken, "new token requested");
    res.status(201).send({ access_token: newToken });
  } catch (err) {
    console.log(err);
    res.status(403).send("INVALID REFRESH TOKEN");
  }
};

module.exports = { requestNewToken };
