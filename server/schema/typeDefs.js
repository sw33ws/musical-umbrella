const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    password: String
    posts: [Post]!
}
type Post {
    _id: ID
    title: String
    post: String
    user: User
    comments: [Comment]!
}
type Comment {
    _id: ID
    comment: String
    post: Post
}
type Auth {
    token: ID!
    user: User
  }
type Query {
    users: [User]!
    user(username: String!): User
    posts: [Post]!
    post(postId: ID!): Post
    comments: [Comment]!
    comment(commentId: ID!): Comment
}
type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addPost(title: String!, post: String!): Post
    addComment(comment: String!): Comment

    removePost(postId: ID!, title: String!, post: String!): Post
    removeComment(commentId: ID!, comment: String!): Comment

    updatePost(id: ID!, title: String!, post: String!): Post
    updateComment(id: ID!, comment: String): Comment
}`;


module.exports = typeDefs;