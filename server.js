const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const GridFsStorage = require("multer-gridfs-storage");
const multer = require("multer");
const Grid = require("gridfs-stream");
const crypto = require("crypto");
const path = require("path");

const users = require("./routes/users");
const profile = require("./routes/profile");
const post = require("./routes/post");

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

const conn = mongoose.createConnection(db);

let gfs;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

// Create storage engine
const storage = new GridFsStorage({
  url: db,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads"
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

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
app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ file: req.file });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server runs on port ${port}`));
