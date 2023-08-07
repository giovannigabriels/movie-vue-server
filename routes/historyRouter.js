const express = require("express");
const Controller = require("../controllers/historyControllers");
const router = express.Router();

router.get("/", Controller.getHistories);

module.exports = router;
