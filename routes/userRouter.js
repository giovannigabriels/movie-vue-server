const express = require("express");
const Controller = require("../controllers/userControllers");
const router = express.Router();

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/google-sign-in", Controller.googleSignIn);

module.exports = router;
