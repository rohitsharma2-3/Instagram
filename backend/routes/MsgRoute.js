const express = require("express");
const router = express.Router();
const isAuthentication = require("../middleware/isAuthentication");
const { storage } = require("../middleware/Cloudinary");
const multer = require("multer");
const upload = multer({ storage });

module.exports = router;
