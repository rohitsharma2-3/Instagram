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

router.post(
  "/allposts",
  upload.single("image"),
  isAuthentication,
  postController.allPost
);

router.get("/userallposts", isAuthentication, postController.userAllPost);

router.post("/likepost/:id", isAuthentication, postController.likePost);

router.post("/dislikepost/:id", isAuthentication, postController.dislikePost);

router.post(
  "/commentonpost/:id",
  isAuthentication,
  postController.commentOnPost
);

router.get("/allcomments/:id", isAuthentication, postController.allComments);

router.delete("/deletepost/:id", isAuthentication, postController.deletePost);

module.exports = router;
