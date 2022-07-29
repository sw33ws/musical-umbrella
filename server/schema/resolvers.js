const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { Post } = require('../models');
const { Comment } = require('../models');
// const { Auth if needed } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async () => {
            return await User.find({})
            // .populate('posts')
            // .populate('comments');
        },
        post: async () => {
            return await Post.find({})
            // .populate('comments');
        },
        comment: async () => {
            return await Comment.find({})
        }
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            return await User.create({ username, email, password });
        },
        addPost: async (parent, { title, post }) => {
            return await Post.create({ title, post });
        },
        addComment: async (parent, { comment }) => {
            return await Comment.create({ comment });
        }
    }
};

module.exports = resolvers;