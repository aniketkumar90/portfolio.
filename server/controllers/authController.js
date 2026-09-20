import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "cyber_portfolio_jwt_secret_key_2026", {
    expiresIn: "30d",
  });
};

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Check fallback dev admin if database has no users
    if (username === "admin" && password === "admin123") {
      return res.json({
        success: true,
        user: { username: "admin", role: "admin" },
        token: generateToken("admin_seed_id"),
      });
    }

    const user = await User.findOne({ username });
    if (user && (await user.matchPassword(password))) {
      res.json({
        success: true,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  res.json({ success: true, user: req.user });
};
