const sequelize = require('../config/connection');
const { User, Page, PageData } = require('../models');

const userData = require('./users.json');
const postData = require('./posts.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
    try {
        const users = await User.bulkCreate(userData);
        console.log(users)
        const posts = await Post.bulkCreate(postData);
        console.log(posts)
    } catch (err) {
        throw new Error;
    }
  process.exit(0);
};

seedDatabase();