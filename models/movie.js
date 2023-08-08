"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.User, { foreignKey: "authorId" });
      Movie.belongsTo(models.Genre, { foreignKey: "genreId" });
      Movie.hasMany(models.Favorite, { foreignKey: "MovieId" });
    }
  }
  Movie.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Title is required",
          },
          notEmpty: {
            msg: "Title is required",
          },
        },
      },
      synopsis: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "synopsis is required",
          },
          notEmpty: {
            msg: "synopsis is required",
          },
        },
      },
      trailerUrl: DataTypes.STRING,
      imgUrl: DataTypes.STRING,
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "rating is required",
          },
          notEmpty: {
            msg: "rating is required",
          },
          min: {
            args: 1,
            msg: "Minimal rating is 1",
          },
        },
      },
      status: DataTypes.STRING,
      genreId: DataTypes.INTEGER,
      authorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );
  Movie.beforeCreate((movie, option) => {
    movie.status = "active";
  });
  return Movie;
};
