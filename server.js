const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const socketApi = require("./routes/socket");
const io = socketApi.io;

const users = require("./routes/users");
const profile = require("./routes/profile");
const post = require("./routes/post");
const message = require("./routes/message");

const app = express();

app.use("/uploads", express.static("uploads"));
app.use("/uploads/avatars", express.static("avatars"));
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
app.use("/post", post);
app.use("/conversations", message);

const port = process.env.PORT || 5000;

const server = app.listen(port, () =>
  console.log(`Server runs on port ${port}`)
);

io.attach(server);
