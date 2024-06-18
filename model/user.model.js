const { DataTypes } = require('sequelize');
const bcrypt = require("bcrypt");
const sequelize = require('../config/database')

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:5,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {

  // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,

  // If don't want createdAt
  createdAt: false,

  // If don't want updatedAt
  updatedAt: false,

  // your other configuration here

});
User.beforeCreate(async(user, options)=>{
  user.password = await bcrypt.hash(user.password, 12);
})

module.exports = User;
