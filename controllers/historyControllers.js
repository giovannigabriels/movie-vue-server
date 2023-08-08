const { Log } = require("../models");

class Controller {
  static async getHistories(req, res, next) {
    try {
      const result = await Log.findAll({ order: [["createdAt", "DESC"]] });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Controller;
