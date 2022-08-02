const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        post: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            required: true,
        },
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    } 
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;