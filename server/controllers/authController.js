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
    const { username, password, email } = req.body;
    const identifier = (username || email || "").trim();

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both username/email and password",
      });
    }

    // Check MongoDB user by username OR email (case-insensitively)
    const user = await User.findOne({
      $or: [
        { username: identifier },
        { email: identifier.toLowerCase() },
        { username: identifier.toLowerCase() },
      ],
    });

    if (user && (await user.matchPassword(password))) {
      return res.json({
        success: true,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        token: generateToken(user._id),
      });
    }

    // Fallback dev admin credentials
    const idLower = identifier.toLowerCase();
    const isPrimaryAdmin =
      (idLower === "aniket9097@gmail.com" || idLower === "aniket9097" || idLower === "admin") &&
      password === "admin@9097";

    const isLegacyAdmin = idLower === "admin" && password === "admin123";

    if (isPrimaryAdmin || isLegacyAdmin) {
      return res.json({
        success: true,
        user: {
          _id: "admin_seed_id",
          username: isPrimaryAdmin ? "aniket9097" : "admin",
          email: isPrimaryAdmin ? "aniket9097@gmail.com" : "admin@portfolio.local",
          role: "admin",
        },
        token: generateToken("admin_seed_id"),
      });
    }

    res.status(401).json({ success: false, message: "Invalid credentials" });
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
