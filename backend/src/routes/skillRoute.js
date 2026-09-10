const express = require("express");
const router = express.Router();
const c = require("../controller/skillController");

router.get("/skills", c.getAllSkills);
router.get("/skills/raw", c.getAllSkillsRaw);
router.post("/skills", c.createSkill);
router.put("/skills/:id", c.updateSkill);
router.delete("/skills/:id", c.deleteSkill);

module.exports = router;
