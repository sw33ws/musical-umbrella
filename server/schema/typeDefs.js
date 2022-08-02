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
    poster: String
    title: String
    post: String
    link: String
    comments: [Comment]!
}
type Comment {
    _id: ID
    comment: String
    commentPost: String
}
type Auth {
    token: ID!
    user: User
  }
type Query {
    users: [User]!
    user(username: String!): User

    posts(username: String): [Post]!
    post(postId: ID!): Post
    
    comments(postId: ID): [Comment]!
    comment(commentId: ID!): Comment
}
type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addPost(poster: String!, title: String!, post: String!, link: String!): Post
    addComment(commentPost: String!, comment: String!): Comment

    removePost(postId: ID!, title: String!, post: String!, link: String!): Post
    removeComment(commentId: ID!, comment: String!): Comment

    updatePost(id: ID!, title: String!, post: String!, link: String!): Post
    updateComment(id: ID!, comment: String): Comment
}`;


module.exports = typeDefs;