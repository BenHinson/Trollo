const { Sequelize } = require('sequelize');
const path = require('path');

const dbPath = path.join(__dirname, 'db.sqlite');
// const dbPath = path.join(__dirname, process.env.NODE_ENV === "test" ? "test_db.sqlite" : "db.sqlite");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: dbPath,
  logging: false
});

module.exports = sequelize;