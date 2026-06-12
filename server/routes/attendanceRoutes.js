const express = require('express');
const router = express.Router();

const auth = require('../middleware/authMiddleware');
const roleCheck = require('../middleware/role');
const { markAttendance, getMyAttendance, getAllAttendance } = require('../controllers/attendanceController');

// Student routes
router.post('/mark', auth, roleCheck('student'), markAttendance);
router.get('/my', auth, roleCheck('student'), getMyAttendance);

// Teacher/Admin routes
router.get('/all', auth, roleCheck('teacher', 'admin'), getAllAttendance);

module.exports = router;