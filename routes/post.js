const express = require("express");
const passport = require("passport");
const router = express.Router();

// Validation
const validationPostInput = require("../validation/post");

// Models
const Profile = require("../models/Profile");
const Post = require("../models/Post");

// test
router.get("/", (req, res) => {
  res.send("post");
});

// Get all posts
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => {
      res.status(404).json({ nopostfound: "No posts found" });
    });
});

// Get created posts
router.get(
  "/my-posts/:user_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Post.findOne({ user: req.params.user_id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "Posts not found";
          res.status(404).json(errors);
        } else {
          res.json(profile);
        }
      })
      .catch(err => res.status(404).json({ profile: "Posts not found" }));
  }
);

// Create a post
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validationPostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const userInput = {};
    userInput.user = req.user._id;
    if (req.body.text) userInput.text = req.body.text;
    if (req.body.theme) userInput.theme = req.body.theme;
    if (req.body.file) userInput.file = req.body.file;

    Post.findOne({ user: req.user._id }).then(profile => {
      if (profile) {
        Post.findOneAndUpdate(
          { user: req.user._id },
          { $set: userInput },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        new Post(userInput).save().then(profile => res.json(profile));
      }
    });

    Post.findOne({});
  }
);

// Like post
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user._id }).then(profile => {
      Post.findById(req.params.id).then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ alreadyLiked: "You already liked this post" });
        } else {
          post.likes.push({ user: req.user._id });
          post.save().then(post => res.json(post));
        }
      });
    });
  }
);

// Dislike post
router.post(
  "/dislike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user._id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            res.status(400).json({ haventliked: "You have not liked yet" });
          } else {
            const removeIndex = post.likes
              .map(item => item.user.toString())
              .indexOf(req.user.id);
            post.likes.splice(removeIndex, 1);
            post.save().then(post => res.json(post));
          }
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

// Post a comment
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          username: req.body.username,
          user: req.user.id
        };

        post.comments.push(newComment);
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.comments.filter(
            com => req.params.comment_id === com._id.toString()
          ).length === 0
        ) {
          res
            .status(400)
            .json({ commentdoestnexist: "Comment does not exist" });
        }
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);
        post.comments.splice(removeIndex, 1);
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);
module.exports = router;
