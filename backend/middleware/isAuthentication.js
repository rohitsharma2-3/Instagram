const jwt = require("jsonwebtoken");

const Authentication = (req, res, next) => {
  try {
    let token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Login First!", Success: false });
    }

    let decoded = jwt.verify(token, process.env.SUPER_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Something went wrong", Success: false });
    }

    req.user = decoded.userId;
    next();
  } catch (error) {
    res.status(500).json({ message: "Server Error", Success: false });
  }
};

module.exports = Authentication;
