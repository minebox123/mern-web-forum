const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const socket = require("socket.io");
const port = process.env.PORT || 5000;

const server = app.listen(port, () =>
  console.log(`Server runs on port ${port}`)
);

const io = socket(server);

// const newConnection = socket => {
//   console.log(`new connection ${socket.id}`);
// };
// io.sockets.on("connection", newConnection);

app.set("socket", io);

const users = require("./routes/users");
const profiles = require("./routes/profiles");
const posts = require("./routes/posts");
const messages = require("./routes/messages");
const conversations = require("./routes/conversations");

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
app.use("/profile", profiles);
app.use("/post", posts);
app.use("/conversations", conversations);
app.use("/mes", messages);
