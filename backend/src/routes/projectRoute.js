const express = require("express");
const router = express.Router();
const c = require("../controller/projectController");

router.get("/projects", c.getAllProjects);
router.get("/projects/:id", c.getProjectById);
router.post("/projects", c.createProject);
router.put("/projects/:id", c.updateProject);
router.delete("/projects/:id", c.deleteProject);

module.exports = router;