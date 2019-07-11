const express = require("express");
const router = express.Router();
const passport = require("passport");

// Models
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

router.get(
  "/:recipientId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Conversation.find({
      participants: { $all: [req.user._id, req.params.recipientId] }
    }).then(response => {
      if (response === null || response === undefined) {
        res.status(404).json({
          noconversation: "You haven't started a conversation with this user"
        });
      } else {
        let convId = [];
        response.map(item => {
          if (item._id) {
            convId.push(item._id);
            // res.status(200).json({ convId: convId });
            Message.find({ conversationId: convId[0] })
              .populate("user", ["username", "avatar"])
              .populate("recipient", ["username", "avatar"])
              .then(messages => {
                if (messages) {
                  res.status(200).json({ conversation: messages });
                } else {
                  res.status(404).json({ notfound: "No messages found" });
                }
              });
          }
        });
      }
    });
  }
);

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
              .populate("recipient", ["username", "avatar"])
              .then(messages => {
                allConversations.push(messages);
                if (allConversations.length === conversations.length) {
                  return res.status(200).json({
                    conversations: allConversations
                  });
                }
                // res.status(200).json({ conversations: messages });
                // console.log(messages.length);
              });
          });
        } else {
          res.status(404).json({ notfound: "Conversations not found" });
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

// Delet a conversation
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
