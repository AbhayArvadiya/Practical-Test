const express = require("express"),
    router = express.Router(),
    UsersController = require("../../controllers/UsersController"),
    authenticate = require("../../middlewares/authenticate");


router.get("/", authenticate, UsersController.users);

module.exports = router;