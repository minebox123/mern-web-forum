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

    const newPost = new Post({
      text: req.body.text,
      theme: req.body.theme,
      name: req.body.name,
      avatar: req.body.avatar,

      user: req.user.id
    });
    if (req.file !== undefined) newPost.file = req.file.path;

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
        const currentPost = post.comments.filter(
          comment => comment._id == req.params.comment_id
        );

        if (
          currentPost[0].likes.filter(like => like.user == req.user.id).length >
          0
        ) {
          const removeItem = post.comments.map(comment =>
            comment._id.toString().indexOf(req.params.comment_id)
          );
          currentPost[0].likes.splice(removeItem, 1);
          post.save().then(post => res.json(post));
        } else {
          if (
            currentPost[0].dislikes.filter(
              dislike => dislike.user == req.user.id
            ).length > 0
          ) {
            // Remove dislike if it exists
            const removeItem = post.comments.map(comment =>
              comment._id.toString().indexOf(req.params.comment_id)
            );
            currentPost[0].dislikes.splice(removeItem, 1);
            // Like the post
            currentPost[0].likes.push({ user: req.user._id });
            post.save().then(post => res.json(post));
          } else {
            currentPost[0].likes.push({ user: req.user._id });
            post.save().then(post => res.json(post));
          }
        }
      });
    });
  }
);

// Dislike post
router.post(
  "/dislike/:post_id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.post_id).then(post => {
        const currentPost = post.comments.filter(
          comment => comment._id == req.params.comment_id
        );
        if (
          currentPost[0].dislikes.filter(like => like.user == req.user.id)
            .length > 0
        ) {
          const removeItem = post.comments.map(comment =>
            comment._id.toString().indexOf(req.params.comment_id)
          );
          currentPost[0].dislikes.splice(removeItem, 1);
          post.save().then(post => res.json(post));
        } else {
          if (
            currentPost[0].likes.filter(like => like.user == req.user.id)
              .length > 0
          ) {
            // Remove like if it exists
            const removeItem = post.comments.map(comment =>
              comment._id.toString().indexOf(req.params.comment_id)
            );
            currentPost[0].likes.splice(removeItem, 1);
            // Dislike the post
            currentPost[0].dislikes.push({ user: req.user._id });
            post.save().then(post => res.json(post));
          } else {
            currentPost[0].dislikes.push({ user: req.user._id });
            post.save().then(post => res.json(post));
          }
        }
      });
    });
  }
);

// Post a comment
router.post(
  "/comment/:id",
  upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
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

// Delete post if you've added it
router.delete(
  "/delete/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.post_id).then(post => {
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({ notauthorized: "User not authorized" });
        }

        post
          .remove()
          .then(() => res.json({ success: true }))
          .catch(err =>
            res.status(404).json({ postnotfound: "No post found" })
          );
      });
    });
  }
);

module.exports = router;
