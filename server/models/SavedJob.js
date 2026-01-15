const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SavedJob = sequelize.define('SavedJob', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
});

module.exports = SavedJob;
