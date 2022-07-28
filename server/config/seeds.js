const db = require('./connection');
const { User, Post, Comment } = require('../models');

db.once('open', async () => {
  // User Seeds
  await User.deleteMany();

  await User.insertMany([
    {
        username: "Test1",
        email: "Test1@gmail.com",
        password: "Password1234"
    },
    {
        username: "Test2",
        email: "Test2@gmail.com",
        password: "Password1234"
    },
    {
        username: "Test3",
        email: "Test3@gmail.com",
        password: "Password1234"
    },
  ]);

  console.log('users seeded');

  // Posts Seeds
  await Post.deleteMany();

  await Post.insertMany([
    {
        title: "Title1",
        post: "test1"
    },
    {
      title: "Title2",
      post: "test2"
    },
    {
      title: "Title3",
      post: "test3"
    },
  ]);

  console.log('Post seeded');

  // Posts Comment
  await Comment.deleteMany();

  await Comment.insertMany([
    {
      comment: "comment1"
    },
    {
      comment: "comment2"
    },
    {
      comment: "comment3"
    },
  ]);

  console.log('Comment seeded');

  process.exit();
});
