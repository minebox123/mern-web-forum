const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const port = process.env.PORT || 5000;

const server = app.listen(port, () =>
  console.log(`Server runs on port ${port}`)
);

const io = require("socket.io").listen(server);

// listen to messages
// io.on("connection", socket => {
//   console.log("user connected");
//   socket.on("disconnect", () => console.log("Client disconnected"));
//   socket.on("SEND_MESSAGE", data => {
//     console.log(data);
//     io.emit("RECEIVE_MESSAGE", data);
//   });
// });

const users = require("./routes/users");
const profiles = require("./routes/profiles");
const posts = require("./routes/posts");
const messages = require("./routes/messages")(io);
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
