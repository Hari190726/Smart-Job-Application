const { SavedJob, Job, User } = require('../models');

const toggleSaveJob = async (req, res) => {
  try {
    const { job_id } = req.body;
    const user_id = req.user.id;

    const existing = await SavedJob.findOne({ where: { user_id, job_id } });

    if (existing) {
      await existing.destroy();
      return res.json({ saved: false, message: 'Job removed from saved list' });
    } else {
      await SavedJob.create({ user_id, job_id });
      return res.json({ saved: true, message: 'Job saved successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getSavedJobs = async (req, res) => {
  try {
    const savedJobs = await SavedJob.findAll({
      where: { user_id: req.user.id },
      include: [
        {
          model: Job,
          include: [{ model: User, as: 'recruiter', attributes: ['name', 'company_name', 'company_logo'] }]
        }
      ]
    });

    // Transform to return just the job objects with an added 'savedAt' property if needed
    const jobs = savedJobs.map(saved => ({
      ...saved.Job.toJSON(),
      savedAt: saved.createdAt
    }));

    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const checkSavedStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const count = await SavedJob.count({ where: { user_id: req.user.id, job_id: id } });
    res.json({ saved: count > 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { toggleSaveJob, getSavedJobs, checkSavedStatus };
