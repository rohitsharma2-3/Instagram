const Comment = require("../models/CommentModel");
const Post = require("../models/PostModel");

const post = async (req, res) => {
  try {
    let { caption } = req.body;
    let author = req.user;
    let image = req.file?.path;

    if (!image) {
      return res.status(401).json({ message: "Image is required to post!" });
    }
    let post = new Post({
      caption,
      author,
      image,
    });

    await post.save();
    await post.populate({ path: "author", select: "-password" });

    return res.status(201).json({
      message: "Posted created successfully!",
      Success: true,
      post,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server is not working!", Success: false });
  }
};

const allPost = async (_, res) => {
  try {
    let post = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "username profilePic" })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: { path: "author", select: "username profilePic" },
      });

    return res.status(201).json({
      message: "All posts!",
      Success: true,
      post,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server is not working!", Success: false });
  }
};

module.exports = { post, allPost };
