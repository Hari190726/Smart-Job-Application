const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('candidate', 'recruiter'),
    allowNull: false,
    defaultValue: 'candidate',
  },
  company_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  company_website: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  company_description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  company_logo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = User;
