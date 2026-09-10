const express = require("express");
const router = express.Router();
const c = require("../controller/testimonialController");

router.get("/testimonials", c.getAllTestimonials);
router.post("/testimonials", c.createTestimonial);
router.put("/testimonials/:id", c.updateTestimonial);
router.delete("/testimonials/:id", c.deleteTestimonial);

module.exports = router;
