const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Story = require("../models/Story");
const authMiddleware = require("../middleware/auth");

// Configure multer — saves images to the uploads/ folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Give each file a unique name using timestamp
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// GET all stories
router.get("/", authMiddleware, async (req, res) => {
  try {
    const stories = await Story.findAll({
      order: [["createdAt", "DESC"]], // newest first
    });

    // Add full image URL to each story
    const storiesWithUrl = stories.map((s) => ({
      _id: s.id,
      caption: s.caption,
      imageUrl: `${req.protocol}://${req.get("host")}/uploads/${s.imageUrl}`,
      author: { username: s.authorName },
      createdAt: s.createdAt,
    }));

    res.json(storiesWithUrl);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST a new story
router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const story = await Story.create({
      imageUrl: req.file.filename,
      caption: req.body.caption || "",
      authorId: req.user.id,
      authorName: req.user.username,
    });

    res.status(201).json({ message: "Story posted!", story });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;