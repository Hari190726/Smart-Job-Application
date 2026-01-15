const sequelize = require('../config/db');
const User = require('./User');
const Job = require('./Job');
const Application = require('./Application');

// Associations
User.hasMany(Job, { foreignKey: 'recruiter_id' });
Job.belongsTo(User, { foreignKey: 'recruiter_id', as: 'recruiter' });

User.hasMany(Application, { foreignKey: 'candidate_id' });
Application.belongsTo(User, { foreignKey: 'candidate_id', as: 'candidate' });

Job.hasMany(Application, { foreignKey: 'job_id' });
Application.belongsTo(Job, { foreignKey: 'job_id', as: 'job' });

module.exports = {
  sequelize,
  User,
  Job,
  Application,
};
