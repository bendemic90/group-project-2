const { Model, DataTypes } = require('sequelize');

const bcrypt = require('bcrypt');

const sequelize = require('../config/connection.js');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },  
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

User.beforeCreate((user, options) => {
  return bcrypt.hash(user.password, 10)
      .then(hash => {
          user.password = hash;
      })
      .catch(err => { 
          throw new Error(); 
      });
});

module.exports = User;
