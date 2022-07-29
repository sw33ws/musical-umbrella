const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { Post } = require('../models');
const { Comment } = require('../models');
const { signToken } = require('../utils/auth');
// const { Auth if needed } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find({})
            // .populate('posts')
            // .populate('comments');
        },
        user: async () => {
            return await User.findOne({ username})
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
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user};
        },
        login: async (parent, { email, password}) => {
            const user = await User.findOne({ email});
            if (!user) {
                throw new AuthenticationError('No user with this email adress!')
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect Credentials');
            }
            const token = signToken(user);
            return { token, user};
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