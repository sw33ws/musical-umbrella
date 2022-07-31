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
            .populate('posts');
        },
        user: async () => {
            return await User.findOne({ username})
            .populate('posts');
        },
        posts: async () => {
            return await Post.find({})
            .populate('comments');
        },
        comments: async () => {
            return await Comment.find({})
        }
    },
    Mutation: {
        // adding a new user
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user};
        },
        // creating a login session with verification
        login: async (parent, { email, password}) => {
            const user = await User.findOne({ email});
            // checking for email, you will need the email for the login, not the username
            if (!user) {
                throw new AuthenticationError('No user with this email adress!')
            }
            // checking if the password is correct
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect Credentials');
            }
            // creating a session token, so that as long as the page is open, you'll said signed in
            const token = signToken(user);
            return { token, user};
        },
        // creating a new post and comment
        addPost: async (parent, { title, post }) => {
            return await Post.create({ title, post });
        },
        addComment: async (parent, { comment }) => {
            return await Comment.create({ comment });
        },
        // removing posts and comments
        removePost: async (parent, { postId }) => {
            return Post.findOneAndDelete({ _id: postId });
        },
        removeComment: async (parent, { commentId }) => {
            return Comment.findOneAndDelete({ _id: commentId });
        },
        //updating posts and comments
        updatePost: async (parent, { id, title, post }) => {
            // finding the matching post
            return await Post.findOneAndUpdate(
                { _id: id},
                { title, post },
                // This returns the new object, indead of the original
                { new: true}
            );
        },
        updateComment: async (parent, { id, comment }) => {
            // finding the matching comment
            return await Comment.findOneAndUpdate(
                { _id: id},
                { comment },
                // This returns the new object, indead of the original
                { new: true}
            );
        }
    }
};

module.exports = resolvers;