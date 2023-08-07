const { Favorite, Movie } = require("../models");

class Controller {
  static async addFavorite(req, res, next) {
    try {
      const id = req.params.movieId;
      const movie = await Movie.findOne({
        where: {
          id,
        },
      });
      if (!movie) {
        throw { name: "data not found" };
      }
      const findFavorite = await Favorite.findOne({
        where: {
          MovieId: req.params.movieId,
          UserId: req.user.id,
        },
      });
      if (findFavorite) {
        throw { name: "already" };
      }
      const newFavorite = await Favorite.create({
        UserId: req.user.id,
        MovieId: id,
      });
      res.status(201).json(movie);
    } catch (error) {
      next(error);
    }
  }
  static async getFavorite(req, res, next) {
    try {
      const data = await Favorite.findAll({
        include: [Movie],
        where: {
          UserId: req.user.id,
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async deleteFavorite(req, res, next) {
    try {
      let id = req.params.id;
      const findFavorite = await Favorite.findOne({
        include: [Movie],
        where: {
          id,
        },
      });
      await Favorite.destroy({
        where: { id },
      });
      res.status(200).json({
        message: `${findFavorite._previousDataValues.Movie.dataValues.title} remove from your favorite`,
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Controller;
