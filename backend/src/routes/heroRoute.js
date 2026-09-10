const express = require("express");
const router = express.Router();
const heroController = require("../controller/heroController");

router.get("/hero", heroController.getHero);
router.put("/hero", heroController.updateHero);

module.exports = router;