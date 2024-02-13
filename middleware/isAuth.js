const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "somes super secret secret");
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
  //If the token is not valid or expired
  if (!decodedToken) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId; //This is how you can access the userId in the routes
  next();
};

module.exports = isAuth;
