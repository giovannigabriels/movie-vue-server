const { Movie } = require("../models");
const { User, Genre, Log } = require("../models");

class Controller {
  static async addMovie(req, res, next) {
    try {
      const { title, synopsis, trailerUrl, imgUrl, rating, genreId } = req.body;
      const addMovie = await Movie.create({
        title,
        synopsis,
        trailerUrl,
        imgUrl,
        rating,
        genreId,
        authorId: req.user.id,
      });
      const description = `new movie with id ${addMovie.id} created`;
      const updatedBy = req.user.email;
      await Log.create({ title, description, updatedBy });

      res.status(201).json(addMovie);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getMovie(req, res, next) {
    try {
      const result = await Movie.findAll({
        include: [User, Genre],
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getMovieId(req, res, next) {
    try {
      let id = +req.params.id;
      const result = await Movie.findOne({
        where: {
          id: id,
        },
      });
      if (result === null) {
        throw { name: "data not found" };
      } else {
        res.status(200).json(result);
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteMovie(req, res, next) {
    try {
      let id = +req.params.id;
      const result = await Movie.findOne({
        where: {
          id,
        },
      });
      await Movie.destroy({
        where: {
          id,
        },
      });
      if (!result) {
        throw { name: "data not found" };
      } else {
        res.status(200).json({ message: `${result.title} success to delete` });
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateMovie(req, res, next) {
    try {
      const id = req.params.id;
      const { title, synopsis, trailerUrl, imgUrl, rating, genreId } = req.body;
      const result = await Movie.findOne({ where: { id } });
      if (!result) {
        throw { name: "data not found" };
      }
      await Movie.update(
        { title, synopsis, trailerUrl, imgUrl, rating, genreId },
        { where: { id } }
      );
      const description = `movie with id ${id} updated`;
      const updatedBy = req.user.email;
      await Log.create({ title, description, updatedBy });
      res.status(200).json({ message: `${result.title} has been updated` });
    } catch (error) {
      next(error);
    }
  }

  static async updateStatusMovie(req, res, next) {
    try {
      const id = req.params.id;
      const { status } = req.body;
      const result = await Movie.findOne({ where: { id } });
      if (!result) {
        throw { name: "data not found" };
      }
      const description = `movie with id ${id} status has been updated from ${result.status} to ${status}`;
      await Movie.update({ status }, { where: { id } });
      const updatedBy = req.user.email;
      const title = result.title;
      await Log.create({ title, description, updatedBy });
      res.status(200).json({ message: `${result.title} has been updated` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
