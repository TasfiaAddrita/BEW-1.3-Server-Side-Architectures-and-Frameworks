const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Add your models here.
const MessageSchema = new Schema({
    createdAt: { type: Date },
    updatedAt: { type: Date },
    message: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref:"User", required: true },
})

MessageSchema.pre("save", function (next) {
    // SET createdAt AND updatedAt
    const now = new Date();
    this.updatedAt = now;

    if (!this.createdAt) {
        this.createdAt = now;
    }

    next();
});

const Message = mongoose.model("Message", MessageSchema)

module.exports = Message