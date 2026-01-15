const { Job, User } = require('../models');
const { Op } = require('sequelize');

const createJob = async (req, res) => {
  try {
    const { title, description, requirements, location, salary, tags } = req.body;
    
    // Ensure user is recruiter
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Access denied. Recruiters only.' });
    }

    const job = await Job.create({
      title,
      description,
      requirements,
      location,
      salary,
      tags,
      recruiter_id: req.user.id,
    });

    res.status(201).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const { title, location, sort } = req.query;
    const where = {};

    if (title) {
      where.title = { [Op.like]: `%${title}%` };
    }
    if (location) {
      where.location = { [Op.like]: `%${location}%` };
    }

    let order = [['createdAt', 'DESC']];
    if (sort === 'oldest') {
      order = [['createdAt', 'ASC']];
    }

    const jobs = await Job.findAll({
      where,
      order,
      include: [
        {
          model: User,
          as: 'recruiter',
          attributes: ['name', 'email', 'company_name', 'company_logo'],
        },
      ],
    });

    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'recruiter',
          attributes: ['name', 'email', 'company_name', 'company_website', 'company_description', 'company_logo'],
        },
      ],
    });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getRelatedJobs = async (req, res) => {
  try {
    const { id } = req.params;
    const currentJob = await Job.findByPk(id);

    if (!currentJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Find jobs with same location OR overlapping tags, excluding current job
    const relatedJobs = await Job.findAll({
      where: {
        location: currentJob.location,
        id: { [Op.ne]: id } // Exclude current job
      },
      limit: 3,
      include: [{ model: User, as: 'recruiter', attributes: ['name', 'company_name', 'company_logo'] }]
    });

    res.json(relatedJobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createJob, getAllJobs, getJobById, getRelatedJobs };
