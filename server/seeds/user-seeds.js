const { User } = require('./../models');

const userData = [
    {
        username: 'user123',
        email: 'user123@gmail.com',
        password: '1234567890',
    },
    {
        username: '12345678ABC',
        email: 'email@gmail.com',
        password: '12345678910',
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;