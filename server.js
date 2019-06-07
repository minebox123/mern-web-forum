const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/users");
const profile = require("./routes/profile");
// const posts = require("./routes/posts");

const app = express();

// body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB config
const db = require("./config/mongoDB").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log(`MongoDB Connected`))
  .catch(err => console.log(err));

// Intialize the passport config
app.use(passport.initialize());
// Imports out configuration file which holds our
// verification callbacks and things like the secret for signing
require("./config/passport")(passport);

// Routes
app.get("/", (req, res) => {
  res.json({
    msg: "works"
  });
});
app.use("/", users);
app.use("/profile", profile);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server runs on port ${port}`));
