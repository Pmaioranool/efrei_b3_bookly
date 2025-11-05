const router = require("express").Router();
const ctrl = require("../controllers/profile.controller");
router.get("/:id", ctrl.getProfile);
router.post("/", ctrl.createProfile);
router.put("/:id", ctrl.updateProfile);
module.exports = router;
