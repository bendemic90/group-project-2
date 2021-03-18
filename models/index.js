// import models
const User = require('./User');
const Page = require('./Page');
const PageData = require('./PageData');

Page.hasMany(PageData, { foreignKey: "page_id" });
PageData.belongsTo(Page);

PageData.hasOne(User);

module.exports = {
  User,
  Page,
  PageData,
};
