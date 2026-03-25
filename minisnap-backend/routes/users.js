const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

// GET all users (except yourself)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await User.findAll({
      where: {},
      attributes: ["id", "username"], // never send passwords!
    });

    // Filter out the current user
    const others = users.filter((u) => u.id !== req.user.id);

    res.json(others);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;