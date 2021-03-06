const express = require("express");
const router = express.Router();

const advertController = require("../controllers/advertController");

router.get("/adverts", advertController.index);
router.get("/adverts/new", advertController.new);
router.get("/adverts/:id", advertController.show);
router.get("/adverts/:id/edit", advertController.edit);
router.post("/adverts/create", advertController.create);
router.post("/adverts/:id/destroy", advertController.destroy);
router.post("/adverts/:id/update", advertController.update);

module.exports = router;
