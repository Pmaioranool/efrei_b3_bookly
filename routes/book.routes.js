const router = require("express").Router();
const ctrl = require("../controllers/book.controller");
router.get("/", ctrl.getBook);
router.post("/", ctrl.createBook);
module.exports = router;
