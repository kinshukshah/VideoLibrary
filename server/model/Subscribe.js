const mongoose = require("mongoose");
const { Schema } = mongoose;

const SubscribeSchema = new Schema(
  {
    userTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Subscribe = mongoose.model("Subscribe", SubscribeSchema);

module.exports = { Subscribe };
