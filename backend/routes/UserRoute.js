const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const isAuthentication = require("../middleware/isAuthentication");
const { storage } = require("../middleware/Cloudinary");
const multer = require("multer");
const upload = multer({ storage });

router.post("/signup", userController.signUp);

router.post("/login", userController.login);

router.get("/logout", userController.logout);

router.get("/:id/getprofile", isAuthentication, userController.getProfile);

router.patch(
  "/:id/postprofile",
  upload.single("profilePic"),
  isAuthentication,
  userController.postProfile
);

router.post(
  "/:id/followorunfollow",
  isAuthentication,
  userController.followOrUnfollow
);

module.exports = router;
