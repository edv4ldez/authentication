const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = (req, res, next) => {
  const { email, password } = req.body;
  let loadedUser;
  if (!(email && password)) {
    const error = new Error("Email and password could not be found");
    error.statusCode = 401;
    throw error;
  }
  loadedUser = user; //User comes from the model, I'm just using it as an example

  //This helps to compare the password from the request with the password from the database
  bcrypt.compare(password, loadedUser.password).then((isEqual) => {
    if (!isEqual) {
      const error = new Error("Wrong password");
      error.statusCode = 401;
      throw error;
    }
    //Synchronously sign the given payload into a JSON Web Token string payload
    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString(),
      },
      "somes super secret secret", //keep this in a .env file
      { expiresIn: "1h" }
    );
    res.status(200).json({ token: token, userId: loadedUser._id.toString() });
  });
};

module.exports = {
  login,
};
