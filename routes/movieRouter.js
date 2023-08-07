const express = require("express");
const Controller = require("../controllers/movieControllers");
const {
  authorization,
  authorizationStatus,
} = require("../middlewares/authorization");

const router = express.Router();

router.post("/", Controller.addMovie);
router.get("/", Controller.getMovie);
router.get("/:id", Controller.getMovieId);
// router.delete("/:id", authorization, Controller.deleteMovie);
router.put("/:id", authorization, Controller.updateMovie);
router.patch("/:id", authorizationStatus, Controller.updateStatusMovie);
module.exports = router;
