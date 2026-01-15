const sequelize = require('../config/db');
const User = require('./User');
const Job = require('./Job');
const Application = require('./Application');
const SavedJob = require('./SavedJob');

// Associations
User.hasMany(Job, { foreignKey: 'recruiter_id' });
Job.belongsTo(User, { foreignKey: 'recruiter_id', as: 'recruiter' });

User.hasMany(Application, { foreignKey: 'candidate_id' });
Application.belongsTo(User, { foreignKey: 'candidate_id', as: 'candidate' });

Job.hasMany(Application, { foreignKey: 'job_id' });
Application.belongsTo(Job, { foreignKey: 'job_id', as: 'job' });

User.hasMany(SavedJob, { foreignKey: 'user_id' });
SavedJob.belongsTo(User, { foreignKey: 'user_id' });

Job.hasMany(SavedJob, { foreignKey: 'job_id' });
SavedJob.belongsTo(Job, { foreignKey: 'job_id' });

module.exports = {
  sequelize,
  User,
  Job,
  Application,
  SavedJob,
};
