const express = require('express');
const { applyForJob, getApplications, updateStatus } = require('../controllers/applicationController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/', authMiddleware, upload.single('resume'), applyForJob);
router.get('/', authMiddleware, getApplications);
router.patch('/:id/status', authMiddleware, updateStatus);

module.exports = router;
