const express = require("express");
const router = express.Router();
const passport = require("passport");

// Validation
const validatePostInput = require("../validation/post");

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
    Profile.findOne({ username: req.username.id })
      .populate("username", ["username"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(erros);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
