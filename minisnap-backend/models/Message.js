const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const Message = sequelize.define("Message", {
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Message;