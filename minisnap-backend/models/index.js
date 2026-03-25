const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite", // this file is auto-created
  logging: false,
});

module.exports = { sequelize };