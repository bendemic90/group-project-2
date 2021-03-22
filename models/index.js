// import models
const User = require('./User');
const Page = require('./Page');
const PageData = require('./PageData');

Page.hasMany(PageData);
PageData.belongsTo(Page);

module.exports = {
  User,
  Page,
  PageData,
};
