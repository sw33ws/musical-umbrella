const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { Post } = require('../models');
const { Comment } = require('../models');
// const { Auth if needed } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async () => {
            return await User.find({});
        },
        post: async () => {
            return await Post.find({})
        },
        comment: async () => {
            return await Comment.find({})
        }
    }
};

module.exports = resolvers;