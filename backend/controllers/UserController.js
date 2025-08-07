const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const Post = require("../models/PostModel");

const signUp = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Something is missing, please try again",
        Success: false,
      });
    }

    let check = await User.findOne({ email });
    if (check) {
      return res.status(409).json({
        message: "User already available!",
        Success: false,
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await User({
      name,
      email,
      password: hashedPass,
    });

    const token = jwt.sign({ userId: user._id }, process.env.SUPER_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    await user.save();

    const newUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      bio: user.bio,
      following: user.following,
      followers: user.followers,
      posts: user.posts,
      gender: user.gender,
      bookmarks: user.bookmarks,
    };

    return res
      .status(201)
      .json({ message: "Successfully login!", data: newUser, Success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", Success: false });
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Something is missing, please try again",
        Success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(409).json({
        message: "User not available!",
        Success: false,
      });
    }

    let passCheck = await bcrypt.compare(password, user.password);
    if (!passCheck) {
      return res.status(409).json({
        message: "Password is wrong!",
        Success: false,
      });
    }

    let token = jwt.sign({ userId: user._id }, process.env.SUPER_SECRET, {
      expiresIn: "7d",
    });

    let post = await Promise.all(
      user.posts.map(async (id) => {
        let post = await Post.findById(id);
        if (post.author.equals(user._id)) {
          return post;
        } else {
          return null;
        }
      })
    );
    const newUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      bio: user.bio,
      following: user.following,
      followers: user.followers,
      posts: post,
      gender: user.gender,
      bookmarks: user.bookmarks,
    };

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res
      .status(201)
      .json({ message: "Welcome back!", Success: true, data: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", Success: false });
  }
};

const logout = (_, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      Secure: false,
    });
    res.status(201).json({ message: "Successfully logout!", Success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", Success: false });
  }
};

const getProfile = async (req, res) => {
  try {
    let userId = req.params.id;
    let user = await User.findById(userId).select("-password");
    return res.status(200).json({
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server is not working", Success: false });
  }
};

const postProfile = async (req, res) => {
  try {
    let { bio, gender } = req.body;
    let profilePic = req.file?.path;
    let userId = req.user;

    let user = await User.findByIdAndUpdate(
      userId,
      {
        bio,
        gender,
        profilePic,
      },
      { new: true }
    ).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", Success: false });
    }

    return res.status(200).json({
      message: "User profile is update successfully!",
      userData: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server is not working", Success: false });
  }
};

const followOrUnfollow = async (req, res) => {
  try {
    let follower = req.user;
    let following = req.params.id;

    if (follower === following) {
      return res
        .status(401)
        .json({ message: "You can't follow yourself!", Success: false });
    }

    let user = await User.findById(follower);
    let target = await User.findById(following);

    if (!user || !target) {
      return res
        .status(401)
        .json({ message: "User not found!", Success: false });
    }

    const isFollowing = user.following.includes(following);
    if (isFollowing) {
      await Promise.all([
        User.updateOne({ _id: following }, { $pull: { following: follower } }),
        User.updateOne({ _id: follower }, { $pull: { following: following } }),
      ]);
      return res
        .status(200)
        .json({ message: "Unfollowed successfully", success: true });
    } else {
      await Promise.all([
        User.updateOne({ _id: following }, { $push: { following: follower } }),
        User.updateOne({ _id: follower }, { $push: { following: following } }),
      ]);
      return res
        .status(200)
        .json({ message: "followed successfully", success: true });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server is not working", Success: false });
  }
};

const suggestions = async (req, res) => {
  try {
    let users = await User.find({ _id: { $ne: req.user } }).select("-password");
    if (!users) {
      return res.status(400).json({
        message: "Currently no users",
      });
    }
    res.status(200).json({ Success: true, users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server is not working", Success: false });
  }
};

module.exports = {
  signUp,
  login,
  logout,
  getProfile,
  postProfile,
  suggestions,
  followOrUnfollow,
};
