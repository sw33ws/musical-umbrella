const db = require('./connection');
const { User } = require('../models');

db.once('open', async () => {
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

  process.exit();
});
