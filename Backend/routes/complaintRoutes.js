
const express = require('express');
const router = express.Router();
const {
  getAllComplaints,
  createComplaint,
  updateComplaintStatus,
  deleteComplaint
} = require('../controller/complaintController');

router.get('/', getAllComplaints);


router.post('/', createComplaint);


router.patch('/:id', updateComplaintStatus);

router.delete('/:id', deleteComplaint);

module.exports = router;