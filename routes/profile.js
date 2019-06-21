const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/avatars");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  }
  cb(null, false);
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 },
  fileFilter: fileFilter
});

// Validation
const validateProfileInput = require("../validation/profile");

//Load profile model
const Profile = require("../models/Profile");
const User = require("../models/User");

// test
router.get("/test", (req, res) => {
  res.json({
    msg: "profile"
  });
});

// Get profile
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    // console.log(req.user);
    Profile.findOne({ user: req.user._id })
      .populate("user", ["username", "email"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        } else {
          return res.json(profile);
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

// Get all profiles
router.get("/all", (req, res) => {
  Profile.find()
    .then(profile => {
      if (!profile) {
        res.status(404).json({ noprofile: "There are not any pofiles" });
      } else {
        res.json(profile);
      }
    })
    .catch(err => res.status(404).json(err));
});

// Post profile information
router.post(
  "/",
  upload.single("avatar"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    userInput = {};
    userInput.user = req.user._id;
    if (req.body.experience) userInput.experience = req.body.experience;
    if (req.body.location) userInput.location = req.body.location;
    if (req.body.bio) userInput.bio = req.body.bio;
    if (req.file.path) userInput.avatar = req.file.path;

    Profile.findOne({ user: req.user._id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user._id },
          { $set: userInput },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create
        new Profile(userInput).save().then(profile => res.json(profile));
      }
    });
  }
);

// Delete user and profile
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user._id }).then(() => {
      User.findOneAndRemove({ _id: req.user._id }).then(() => {
        res.json({ success: true });
      });
    });
  }
);

module.exports = router;
