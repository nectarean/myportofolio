const express = require("express");
const router = express.Router();
const c = require("../controller/messageController");

router.post("/messages", c.createMessage);
router.get("/messages", c.getAllMessages);
router.delete("/messages/:id", c.deleteMessage);

module.exports = router;