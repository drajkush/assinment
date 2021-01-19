const mongoose = require("mongoose");
let db = process.env.DB;

mongoose.connect(db, {
  useNewUrlParser: "true",
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.connection.on("error", (err) => {
  console.log("err", err);
});
mongoose.connection.on("connected", (err, res) => {
  console.log("db is connected");
});
