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

module.exports = { post };
