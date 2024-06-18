const { Sequelize } = require('sequelize');
const dotenv = require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'test_db',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
});

module.exports = sequelize;
