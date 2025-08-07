const express = require("express");
const router = express.Router();
const isAuthentication = require("../middleware/isAuthentication");
const msgController = require("../controllers/MsgController");

router.post("/sendmsg/:id", isAuthentication, msgController.sendMessage);

router.get("/getmsg/:id", isAuthentication, msgController.getMessage);

module.exports = router;
