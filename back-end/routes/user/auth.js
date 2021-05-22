const express = require("express"),
    router = express.Router(),
    AuthController = require("../../controllers/AuthController");

// Authentication APIs
router.post("/signup", AuthController.register);
router.post("/signin", AuthController.login);

module.exports = router;
