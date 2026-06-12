const Attendance = require('../models/Attendance');

// MARK ATTENDANCE
const markAttendance = async (req, res) => {
  try {
    const studentId = req.user.id;
    const status = req.body.status || 'present';

    // Validate status
    if (!['present', 'absent'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Use "present" or "absent".' });
    }

    // Get today's date range
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Check if already marked
    const alreadyMarked = await Attendance.findOne({
      student: studentId,
      date: { $gte: startOfDay, $lte: endOfDay }
    });

    if (alreadyMarked) {
      return res.status(400).json({ message: 'Attendance already marked for today' });
    }

    // Save attendance
    const attendance = new Attendance({ student: studentId, status, date: new Date() });
    await attendance.save();

    res.status(201).json({ message: 'Attendance marked successfully', attendance });
  } catch (error) {
    console.error('Mark Attendance Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET MY ATTENDANCE
const getMyAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({ student: req.user.id }).sort({ date: -1 });
    res.status(200).json(records);
  } catch (error) {
    console.error('Get My Attendance Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET ALL ATTENDANCE (Admin/Teacher)
const getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find()
      .populate('student', 'name email')
      .sort({ date: -1 });
    res.status(200).json(records);
  } catch (error) {
    console.error('Get All Attendance Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { markAttendance, getMyAttendance, getAllAttendance };