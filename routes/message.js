const express = require("express");
const router = express.Router();
const passport = require("passport");
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

// Models
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

// Get a conversation's id
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

// Get messages from a conversation
// router.get(
//   "/:conversationId",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Message.find({ conversationId: req.params.conversationId })
//       .populate("user", ["username", "avatar"])
//       .then(messages => {
//         if (messages) {
//           res.status(200).json({ conversation: messages });
//         } else {
//           res.status(404).json({ notfound: "No messages found" });
//         }
//       });
//   }
// );

// create a conversation
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
  upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const reply = new Message({
      conversationId: req.params.conversationId,
      body: req.body.text,
      user: req.user._id
    });
    if (req.file !== undefined) reply.file = req.file.path;

    reply.save().then(reply => res.json(reply));
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
