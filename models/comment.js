import mongoose from "mongoose";
const commentSchema = mongoose.Schema({
    author: String,
    description: String
}, {
    timeStamps: true
});

module.exports = mongoose.model("Comment", commentSchema);