const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  conversationId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  file: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Message = mongoose.model("message", MessageSchema);
