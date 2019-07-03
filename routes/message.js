const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");

// Models
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

// router.get("/", (req, res) => {
//   res.json({
//     msg: "hello"
//   });
// });

// Get all conversations
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Conversation.find({ participants: req.user._id })
      .then(conversations => {
        let allConversations = [];
        if (conversations) {
          conversations.forEach(conversation => {
            Message.find({ conversationId: conversation._id })
              .sort({ date: -1 })
              .limit(1)
              .populate("user", ["username", "avatar"])
              .then(message => {
                allConversations.push(message);
                if (allConversations.length === conversations.length) {
                  return res
                    .status(200)
                    .json({ conversations: allConversations });
                }
              });
          });
        } else {
          res.status(404).json({ notfound: "Conversations not found" });
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

// Get a current message
router.get(
  "/:conversationId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Message.find({ conversationId: req.params.conversationId })
      .populate("user", ["username", "avatar"])
      .then(messages => {
        if (messages) {
          res.status(200).json({ conversation: messages });
        } else {
          res.status(404).json({ notfound: "No messages found" });
        }
      });
  }
);

// Write a message
router.post(
  "/createConv/:recipientId",
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

router.delete(
  "/conversations/:conversationId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.params);
    Conversation.findOneAndRemove({
      conversationId: req.params.conversationId
    }).then(conversation => {
      res.status(200).json({ message: "Conversation removed" });
    });
  }
);
module.exports = router;
