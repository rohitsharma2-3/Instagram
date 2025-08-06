const express = require("express");
const router = express.Router();
const postController = require("../controllers/PostController");
const isAuthentication = require("../middleware/isAuthentication");
const { storage } = require("../middleware/Cloudinary");
const multer = require("multer");
const upload = multer({ storage });

router.post(
  "/posts",
  upload.single("image"),
  isAuthentication,
  postController.post
);
module.exports = router;
