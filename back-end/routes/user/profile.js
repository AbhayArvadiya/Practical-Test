const express = require("express"),
    router = express.Router(),
    ProfileController = require("../../controllers/ProfileController"),
    authenticate = require("../../middlewares/authenticate");

router.put("/update", authenticate, ProfileController.updateProfile);
router.get("/me", authenticate, ProfileController.getProfile);

module.exports = router;