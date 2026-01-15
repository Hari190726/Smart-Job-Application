const { Application, Job, User } = require('../models');

const applyForJob = async (req, res) => {
  try {
    const { job_id } = req.body;
    const resume_path = req.file ? req.file.path : null;

    if (!resume_path) {
      return res.status(400).json({ message: 'Resume is required' });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      where: {
        job_id,
        candidate_id: req.user.id,
      },
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    const application = await Application.create({
      job_id,
      candidate_id: req.user.id,
      resume_path,
    });

    res.status(201).json({ message: 'Application submitted successfully', application });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getApplications = async (req, res) => {
  try {
    // If recruiter, show applications for their jobs
    // If candidate, show their applications
    
    let where = {};
    let include = [];

    if (req.user.role === 'recruiter') {
      // Find jobs posted by this recruiter
      const jobs = await Job.findAll({ where: { recruiter_id: req.user.id }, attributes: ['id'] });
      const jobIds = jobs.map(job => job.id);
      
      where.job_id = jobIds;
      include = [
        { model: User, as: 'candidate', attributes: ['name', 'email'] },
        { model: Job, as: 'job', attributes: ['title'] },
      ];
    } else {
      where.candidate_id = req.user.id;
      include = [
        { 
          model: Job, 
          as: 'job', 
          attributes: ['title', 'location'],
          include: [
            { model: User, as: 'recruiter', attributes: ['name'] }
          ]
        },
      ];
    }

    const applications = await Application.findAll({
      where,
      include,
      order: [['createdAt', 'DESC']],
    });

    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const application = await Application.findByPk(id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Verify the job belongs to this recruiter
    const job = await Job.findByPk(application.job_id);
    if (job.recruiter_id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    application.status = status;
    await application.save();

    res.json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { applyForJob, getApplications, updateStatus };
