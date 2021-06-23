const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Video } = require("./video");
const { Comment } = require("./comment");
const LikeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    videoId: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    commenId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  { timestamps: true }
);

const Like = mongoose.model("Like", LikeSchema);

module.exports = { Like };
