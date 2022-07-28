const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    password: String
    posts: [Post]
    comments: [Comment]
}
type Post {
    _id: ID
    title: String
    post: String
    comments: [Comment]
}
type Comment {
    _id: ID
    comment: String
}
type Query {
    user: [User]
    post: [Post]
    comment: [Comment]
}`;

module.exports = typeDefs;