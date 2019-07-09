const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: "users"
    }
  ]
});

module.exports = Conversation = mongoose.model(
  "conversations",
  ConversationSchema
);
