const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Populate = require("../utils/autopopulate");

const PostSchema = new Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },
  title: { type: String, required: true },
  url: { type: String, required: true },
  author : { type: Schema.Types.ObjectId, ref: "User", required: true },
  summary: { type: String, required: true },
  comments: [{ type:Schema.Types.ObjectId, ref: "Comment" }],
  subreddit: { type: String, required: true },
});

PostSchema.pre("save", function (next) {
  // SET createdAt AND updatedAt
  const now = new Date();
  this.updatedAt = now;

  if (!this.createdAt) {
    this.createdAt = now;
  }

  next();
});

PostSchema
    .pre("findOne", Populate("author"))
    .pre("find", Populate("author"));

module.exports = mongoose.model("Post", PostSchema);
