const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class PageData extends Model {}

PageData.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    page_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    heading: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    data: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_reply: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    reply_user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'page_data',
  }
);

module.exports = PageData;
