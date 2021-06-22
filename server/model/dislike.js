const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Video } = require("./video");
const { Comment } = require("./comment");
const DislikeSchema = new Schema(
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

const Dislike = mongoose.model("Dislike", DislikeSchema);

module.exports = { Dislike };
