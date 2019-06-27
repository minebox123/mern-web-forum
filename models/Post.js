const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  text: {
    type: String,
    required: true
  },
  theme: {
    type: String,
    required: true
  },
  file: {
    type: [String]
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },

  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      comment: {
        type: String,
        required: true
      },
      username: {
        type: String
      },
      avatar: {
        type: String
      },
      file: {
        type: [String]
      },
      likes: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "users"
          }
        }
      ],
      dislikes: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "users"
          }
        }
      ],
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("post", PostSchema);
