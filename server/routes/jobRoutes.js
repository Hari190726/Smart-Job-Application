const express = require('express');
const { createJob, getAllJobs, getJobById } = require('../controllers/jobController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createJob);
router.get('/', getAllJobs);
router.get('/:id', getJobById);

module.exports = router;
