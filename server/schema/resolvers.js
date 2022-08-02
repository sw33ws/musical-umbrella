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
        user: async (parent, { username }) => {
            return await User.findOne({ username})
            .populate('posts');
        },
        posts: async (parents, { username }) => {
            // return await Post.find({})
            const params = username ? { username } : {};
            return Post.find(params)
            .populate('comments');
        },
        comments: async (parents, { poster }) => {
            const params = poster ? { poster } : {};
            return Comment.find(params);
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
        addPost: async (parent, { poster, title, post, link }) => {
            const postE = await Post.create({ poster, title, post, link });
            // finding a username matching username, and adding the newly made post to it
            await User.findOneAndUpdate(
                { username: poster },
                { $addToSet: { posts: postE._id } }
              );
              return postE;
        },
        addComment: async (parent, { commentPost, comment }) => {
            const commentE = await Comment.create({ commentPost, comment });
            // finding a post with a matching poster
            await Post.findOneAndUpdate(
                { _id: commentPost },
                { $addToSet: { comments: commentE._id } }
            );
            return commentE;
        },
        // removing posts and comments
        removePost: async (parent, { postId }) => {
            return Post.findOneAndDelete({ _id: postId });
        },
        removeComment: async (parent, { commentId }) => {
            return Comment.findOneAndDelete({ _id: commentId });
        },
        //updating posts and comments
        updatePost: async (parent, { id, title, post, link }) => {
            // finding the matching post
            return await Post.findOneAndUpdate(
                { _id: id },
                { title, post, link },
                // This returns the new object, indead of the original
                { new: true }
            );
        },
        updateComment: async (parent, { id, comment }) => {
            // finding the matching comment
            return await Comment.findOneAndUpdate(
                { _id: id },
                { comment },
                // This returns the new object, indead of the original
                { new: true }
            );
        }
    }
};

module.exports = resolvers;