const { Movie } = require("../models");

const authorization = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findMovie = await Movie.findOne({
      where: {
        id,
      },
    });
    if (!findMovie) {
      throw { name: `data not found` };
    }
    if (findMovie.authorId !== req.user.id && req.user.role !== "admin") {
      throw { name: `forbidden` };
    }
    next();
  } catch (error) {
    next(error);
  }
};

const authorizationStatus = async (req, res, next) => {
  try {
    const id = req.params.id;
    const findMovie = await Movie.findOne({ where: { id } });
    if (!findMovie) {
      throw { name: "data not found" };
    }
    if (req.user.role !== "admin") {
      throw { name: "forbidden" };
    }
    next();
  } catch (error) {
    next(error);
  }
};

const authorizationCustomer = async (req, res, next) => {
  try {
    if (req.user.role !== "customer") {
      throw { name: "forbidden" };
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authorization, authorizationStatus, authorizationCustomer };
