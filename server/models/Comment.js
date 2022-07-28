const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema(
    {
        comment: {
            type: String,
            required: true,
        },
    } 
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;