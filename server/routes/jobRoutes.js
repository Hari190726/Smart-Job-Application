const express = require('express');
const { createJob, getAllJobs, getJobById, getRelatedJobs } = require('../controllers/jobController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createJob);
router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.get('/:id/related', getRelatedJobs);

module.exports = router;
