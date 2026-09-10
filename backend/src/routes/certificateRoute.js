const express = require("express");
const router = express.Router();
const c = require("../controller/certificateController");

router.get("/certificates", c.getAllCertificates);
router.post("/certificates", c.createCertificate);
router.put("/certificates/:id", c.updateCertificate);
router.delete("/certificates/:id", c.deleteCertificate);

module.exports = router;
