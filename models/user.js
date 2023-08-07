"use strict";
const { hash } = require("../helpers/bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Movie, {
        foreignKey: "authorId",
      });
      User.hasMany(models.Favorite, {
        foreignKey: "UserId",
      });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Email is required !",
          },
          notEmpty: {
            msg: "Email is required !",
          },
          isEmail: {
            args: true,
            msg: "input must be email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "password is required",
          },
          notEmpty: {
            msg: "password is required",
          },
          len: {
            args: 5,
            msg: "Minimal password 5 character",
          },
        },
      },
      role: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user, option) => {
    user.password = hash(user.password);
    user.role = "admin";
  });
  return User;
};
