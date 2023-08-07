const express = require("express");
const Controller = require("../controllers/pubControllers");
const ControllerFav = require("../controllers/favoriteControllers");
const authentication = require("../middlewares/authentication");
const { authorizationCustomer } = require("../middlewares/authorization");
const router = express.Router();

router.post("/register", Controller.customerRegister);
router.post("/login", Controller.customerLogin);
router.post("/google-sign-in", Controller.googleSignInCustomer);
router.get("/movies", Controller.movieCustomer);
router.get("/movies/:movieId", Controller.getOneMovie);
router.get("/qrcode", Controller.qrCode);

//authentication
router.use(authentication);

router.post(
  "/favorite/:movieId",
  authorizationCustomer,
  ControllerFav.addFavorite
);
router.get("/favorite", authorizationCustomer, ControllerFav.getFavorite);
router.delete(
  "/favorite/:id",
  authorizationCustomer,
  ControllerFav.deleteFavorite
);

module.exports = router;
