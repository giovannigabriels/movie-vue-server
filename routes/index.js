const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");
const movieRouter = require("./movieRouter");
const genreRouter = require("./genreRouter");
const historyRouter = require("./historyRouter");
const customerRouter = require("./customerRouter");
const authentication = require("../middlewares/authentication");

router.use("/users", userRouter);
router.use("/pub", customerRouter);

//authentication
router.use(authentication);

router.use("/movies", movieRouter);
router.use("/genres", genreRouter);
router.use("/histories", historyRouter);

module.exports = router;
