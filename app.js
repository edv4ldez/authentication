const bodyParser = require("body-parser");
const express = require("express");
const isAuth = require("./middleware/isAuth");

const app = express();
//to parse the body of the request
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //to allow access to any origin
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); //to allow access to any method
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); //to allow access to any headers
  next();
});

app.use("/", (req, res, next) => {
  next();
});

app.listen(8088);
