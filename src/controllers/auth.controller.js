const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};

exports.register = async (req,res) => {
    try {
        const { name, email , password} = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name , email and password fields are required"});
        }

        const user = await User.create({ name, email , password});
        const token = generateToken(user);

        res.status(201).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token
    });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.login = async (req,res) => {
    try {
        const { email , password} = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password fields are required"});
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or passoword"});
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password"});
        }

        const token = generateToken(user);

    res.json({
      user: { id: user._id, name: user.name, email: user.email },
      token
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  const user = req.user;
  res.json({
    id: user._id,
    name: user.name,
    email: user.email
  });
};

exports.updateProfile = async (req, res) => {
  try {
    const user = req.user;
    const { name } = req.body;

    if (name) user.name = name;

    await user.save();

    res.json({
      id: user._id,
      name: user.name,
      email: user.email
    });
  } catch (err) {
    res.status(500).json({ message: "Profile update failed", error: err.message });
  }
};

exports.logout = (req, res) => {
  // frontend simply delete token
  res.json({ message: "Logged out successfully" });
};