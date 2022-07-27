const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
// const { Auth if needed } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async () => {
            return await User.find({});
        }
    }
};

module.exports = resolvers;