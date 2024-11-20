const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authControllers");
const authMiddleware = require("../middleware/authentication");
const auth = require("../middleware/auth");

router.post("/register", authControllers.register);

router.post("/login", authControllers.login);

router.post("/logout", authControllers.logout);

router.post("/refresh", authControllers.refresh);

router.get("/user", authMiddleware, auth, authControllers.user);

module.exports = router;
