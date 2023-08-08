const express = require("express");
const Controller = require("../controllers/genreControllers");
const router = express.Router();

router.get("/", Controller.getGenres);
router.post("/", Controller.addGenres);
router.delete("/:id", Controller.deleteGenres);
router.put("/:id", Controller.updateGenre);

module.exports = router;
