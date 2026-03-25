const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const authMiddleware = require("../middleware/auth");
const { Op } = require("sequelize");

// GET messages between current user and another user
router.get("/:userId", authMiddleware, async (req, res) => {
  const myId = req.user.id;
  const otherId = parseInt(req.params.userId);

  try {
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: myId, receiverId: otherId },
          { senderId: otherId, receiverId: myId },
        ],
      },
      order: [["createdAt", "ASC"]],
    });

    // Format to match what the frontend expects
    const formatted = messages.map((m) => ({
      _id: m.id,
      text: m.text,
      sender: m.senderId,
      receiver: m.receiverId,
      createdAt: m.createdAt,
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST a new message
router.post("/", authMiddleware, async (req, res) => {
  const { receiverId, text } = req.body;

  try {
    const message = await Message.create({
      senderId: req.user.id,
      receiverId,
      text,
    });

    res.status(201).json({ message: "Message sent!", data: message });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;