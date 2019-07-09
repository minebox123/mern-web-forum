const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageAttachmentsSchema = new Schema({
  conversationId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  files: [String]
});

module.exports = MessageAttachments = mongoose.model(
  "messageAttachments",
  MessageAttachmentsSchema
);
