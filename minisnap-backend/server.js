const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const { sequelize } = require("./models");

dotenv.config();

const app = express();

const fs = require("fs");
const path = require("path");

const uploadPath = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Middlewares
app.use(cors({
  origin: "*"
}));
app.use(express.json());

// Serve uploaded images as static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/stories", require("./routes/stories"));
app.use("/messages", require("./routes/messages"));
app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 5000;

// Sync database then start server
sequelize.sync().then(() => {
  console.log("Database connected and synced!");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});