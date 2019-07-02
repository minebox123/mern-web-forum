const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");

// Models
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

router.get("/", (req, res) => {
  res.json({
    msg: "hello"
  });
});

// Get all conversations
router.get(
  "/",
  passport.authenticate("jst", { session: false }),
  (req, res, next) => {
    Conversation.find({ participants: req.user._id })
      .select("_id")
      .exec((err, conversations) => {
        if (err) {
          res.send({ error: err });
          return next(err);
        } else {
          let fullConversations = [];
          conversations.forEach(conversation => {
            Message.find({ conversationsId: conversation._id })
              .sort({ date: -1 })
              .limit(1)
              .populate("user", ["username", "avatar"])
              .exec((err, message) => {
                if (err) {
                  res.send({ error: err });
                  return next(err);
                } else {
                  fullConversations.push(message);
                  if (fullConversations.length === conversation.length) {
                    return res
                      .status(200)
                      .json({ conversation: fullConversations });
                  }
                }
              });
          });
        }
      });
  }
);

// Get a current message
router.get(
  "/:conversationId",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Message.find({ conversationId: req.params.conversationId })
      .sort({ date: -1 })
      .populate("user", ["username", "avatar"])
      .exec((err, messages) => {
        if (err) {
          res.send({ error: err });
          return next(err);
        } else {
          res.status(200).json({ conversation: messages });
        }
      });
  }
);

// Write a message
router.post(
  "/:recipientId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.params.recipientId) {
      res
        .status(422)
        .send({ error: "Please choose a valid recipient for your message" });
    }
    const conversation = new Conversation({
      participants: [req.user._id, req.params.recipientId]
    });
    conversation.save((err, newConversation) => {
      if (err) {
        res.send({ error: err });
      }
      const message = new Message({
        conversationId: newConversation._id,
        body: req.body.text,
        user: req.user._id
      });
      message.save((err, newMessage) => {
        if (err) {
          res.send({ error: err });
        }
        res.status(200).json({
          message: "conversation started",
          conversationId: conversation._id
        });
      });
    });
  }
);

// Send reply
router.post(
  "/:conversationId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const reply = new Message({
      conversationId: req.params.conversationId,
      body: req.body.text,
      user: req.user._id
    });

    reply.save((err, sentReply) => {
      if (err) {
        res.send({ error: err });
      }
      res.status(200).json({ message: "reply successfully sent" });
    });
  }
);

module.exports = router;
