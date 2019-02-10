const express = require("express");
const router = express.Router();
const staticController = require("../controllers/staticController");

router.get("/", staticController.index);
router.get("/marco", staticController.marco);
router.get("/about", staticController.about);

module.exports = router;