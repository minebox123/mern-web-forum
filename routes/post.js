const express = require("express");
const passport = require("passport");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
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
const validationPostInput = require("../validation/post");

// Models
const Profile = require("../models/Profile");
const Post = require("../models/Post");

// test
router.get("/", (req, res) => {
  res.send("post");
});

// Get all posts
router.get("/all", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => {
      res.status(404).json({ nopostfound: "No posts found" });
    });
});

// Get created posts
router.get(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Post.findById(req.params.post_id)

      .then(post => res.json(post))
      .catch(err =>
        res.status(404).json({ nopostfound: "No post found with that id" })
      );
  }
);

// Create a post
router.post(
  "/",
  upload.single("file"),
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    const { errors, isValid } = validationPostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    console.log(req.file);

    const newPost = new Post({
      text: req.body.text,
      theme: req.body.theme,
      name: req.body.name,
      avatar: req.body.avatar,

      user: req.user.id
    });
    if (req.file !== undefined) newPost.file = req.file.path;
    console.log(newPost);
    newPost.save().then(post => res.json(post));
  }
);

// Like post
router.post(
  "/like/:post_id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user._id }).then(profile => {
      Post.findById(req.params.post_id).then(post => {
        post.comments.filter(comment => {
          if (
            (comment._id == req.params.comment_id).likes.filter(
              like => like.user == req.user._id
            ).length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "You have already liked this comment" });
          } else {
            comment.likes.push({ user: req.user._id });
            comment.save().then(post => res.json(comment));
          }
        });
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
        console.log(req.body);
        const newComment = {
          comment: req.body.comment,
          username: req.body.username,
          user: req.user.id,
          avatar: req.body.avatar
        };
        if (req.file !== undefined) newComment.file = req.file.path;

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
