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

module.exports = function(io) {
  // write a message
  router.post(
    "/:recipientId",
    upload.single("file"),
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      //
      if (!req.params.recipientId) {
        res.status(422).json("User with this id doesn't exist");
      } else {
        // check for conversation existence
        Conversation.find({
          participants: { $all: [req.user._id, req.params.recipientId] }
        }).then(response => {
          if (response.length === 0) {
            const conversation = new Conversation({
              participants: [req.user._id, req.params.recipientId]
            });

            conversation.save((err, newConversation) => {
              if (err) {
                res.send({ error: err });
              } else {
                const message = new Message({
                  conversationId: newConversation._id,
                  body: req.body.text,
                  user: req.user._id,
                  recipient: req.params.recipientId
                });
                if (req.file !== undefined) message.file = req.file.path;

                message.save().then(message => res.json(message));
              }
            });
          } else {
            const reply = new Message({
              conversationId: response[0]._id,
              body: req.body.text,
              user: req.user._id,
              recipient: req.params.recipientId
            });
            if (req.file !== undefined) reply.file = req.file.path;

            // reply.save().then(reply => res.json(reply));
            io.on("connection", server => {
              console.log("connected");
            });
          }
        });
      }
    }
  );

  return router;
};

// router.delete(
//   "/conversations/:conversationId",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     console.log(req.params);
//     Conversation.findOneAndRemove({
//       conversationId: req.params.conversationId
//     }).then(conversation => {
//       res.status(200).json({ message: "Conversation removed" });
//     });
//   }
// );
// module.exports = router(io);
