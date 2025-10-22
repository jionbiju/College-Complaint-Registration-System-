// routes/complaintRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllComplaints,
  createComplaint,
  updateComplaintStatus,
  deleteComplaint
} = require('../controller/complaintController');

// GET all complaints
router.get('/', getAllComplaints);

// POST create new complaint
router.post('/', createComplaint);

// PATCH update complaint status
router.patch('/:id', updateComplaintStatus);

// DELETE complaint
router.delete('/:id', deleteComplaint);

module.exports = router;