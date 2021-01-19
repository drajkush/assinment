const createError = require("http-errors");
const express = require("express");
require("dotenv").config();
const path = require("path");
const logger = require("morgan");
//DB connection file
const con = require("./db/dbconnection");
const usersRouter = require("./routes/users");
const bodyParser = require("body-parser");
const app = express();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use("/admin", adminRouting);
app.use("/users", usersRouter);
//test route
app.get("/here1", (req, res) => {
  res.send(`here at test route `);
});
//No route found
app.get("***", (req, res) => {
  res.send(`look like you landed on wrong page`);
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
let port = process.env.PORT;
console.log(`port is listning on ${port}`);

module.exports = app;
