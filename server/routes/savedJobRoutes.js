const express = require('express');
const { toggleSaveJob, getSavedJobs, checkSavedStatus } = require('../controllers/savedJobController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/toggle', authMiddleware, toggleSaveJob);
router.get('/', authMiddleware, getSavedJobs);
router.get('/check/:id', authMiddleware, checkSavedStatus);

module.exports = router;
