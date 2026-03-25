const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const Story = sequelize.define("Story", {
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  caption: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  authorName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Story;