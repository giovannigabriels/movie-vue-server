const { Genre, Log } = require("../models");

class Controller {
  static async getGenres(req, res, next) {
    try {
      const result = await Genre.findAll();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async addGenres(req, res, next) {
    try {
      const { name } = req.body;
      const addGenre = await Genre.create({
        name,
      });
      const updatedBy = req.user.email;
      const title = name;
      const description = `new genre with id ${addGenre.id} created`;
      await Log.create({ title, description, updatedBy });

      res.status(201).json(addGenre);
    } catch (error) {
      next(error);
    }
  }

  static async deleteGenres(req, res, next) {
    try {
      let id = +req.params.id;
      const result = await Genre.findOne({
        where: {
          id,
        },
      });
      await Genre.destroy({
        where: {
          id,
        },
      });
      if (!result) {
        throw { name: "data not found" };
      } else {
        const title = result.name;
        const description = `genre with id ${id} deleted`;
        const updatedBy = req.user.email;
        await Log.create({ title, description, updatedBy });
        res.status(200).json({ message: `${result.name} success to delete` });
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateGenre(req, res, next) {
    try {
      const id = req.params.id;
      const { name } = req.body;
      const result = await Genre.findOne({ where: { id } });
      if (!result) {
        throw { name: "data not found" };
      }
      await Genre.update({ name }, { where: { id } });
      const title = result.name;
      const description = `genre with id ${id} updated`;
      const updatedBy = req.user.email;
      await Log.create({ title, description, updatedBy });
      res.status(200).json({ message: `${result.name} has been updated` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
