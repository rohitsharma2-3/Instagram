const Post = require("../models/PostModel");
const Comment = require("../models/CommentModel");
const User = require("../models/UserModel");

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
      .populate({ path: "author", select: "name profilePic" })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: { path: "author", select: "name profilePic" },
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

const userAllPost = async (req, res) => {
  try {
    let userId = req.user;
    let posts = await Post.find({ author: userId })
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "name profilePic" })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: { path: "author", select: "name profilePic" },
      });

    if (!posts) {
      return res
        .status(404)
        .json({ message: "User not posted yet!", Success: false });
    }

    return res.status(201).json({
      message: "All posts!",
      Success: true,
      posts,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server is not working!", Success: false });
  }
};

const likePost = async (req, res) => {
  try {
    let likedByUser = req.user;
    let postId = req.params.id;

    let post = await Post.findById(postId);

    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found!", Success: false });
    }

    await post.updateOne({ $addToSet: { likes: likedByUser } });
    await post.save();

    return res.status(201).json({
      message: "Liked post!",
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

const dislikePost = async (req, res) => {
  try {
    let likedByUser = req.user;
    let postId = req.params.id;

    let post = await Post.findById(postId);

    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found!", Success: false });
    }

    await post.updateOne({ $pull: { likes: likedByUser } });
    await post.save();

    return res.status(201).json({
      message: "Disliked post!",
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

const commentOnPost = async (req, res) => {
  try {
    let author = req.user;
    let postId = req.params.id;
    let { text } = req.body;

    if (!text) {
      return res
        .status(400)
        .json({ message: "Text is required to comment!", Success: false });
    }

    let post = await Post.findById(postId);

    let comment = await Comment.create({
      author,
      post: postId,
      text,
    });

    post.comments.push(comment._id);
    await comment.populate({ path: "author", select: "name profilePic" });
    await comment.save();

    return res
      .status(200)
      .json({ message: "Comment is created!", Success: true, comment });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server is not working!", Success: false });
  }
};

const allComments = async (req, res) => {
  try {
    let postId = req.params.id;

    let comments = await Comment.find({ post: postId }).populate(
      "author",
      "name, profilePic"
    );

    if (!comments) {
      return res
        .status(404)
        .json({ message: "No comments yet!", Success: false });
    }

    return res.status(200).json({
      Success: true,
      comments,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server is not working!", Success: false });
  }
};

const deletePost = async (req, res) => {
  try {
    let postId = req.params.id;
    let author = req.user;

    if (postId === author) {
      return res
        .status(404)
        .json({ message: "You are not authorized!", Success: false });
    }

    let post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found", Success: false });
    }

    let user = await User.findById(author);

    user.posts = user.posts.filter((post) => post.toString() !== postId);
    await user.save();

    await Post.findByIdAndDelete(postId);
    await Comment.deleteMany({ post: postId });

    return res.json({ message: "Post deleted successfully!", Success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server is not working!", Success: false });
  }
};

module.exports = {
  post,
  allPost,
  userAllPost,
  likePost,
  dislikePost,
  commentOnPost,
  allComments,
  deletePost,
};
