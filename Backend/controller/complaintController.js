const Complaint = require('../models/Complaint');

// Get all complaints
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: complaints.length,
      data: complaints
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching complaints',
      error: error.message
    });
  }
};

// Create new complaint
exports.createComplaint = async (req, res) => {
  try {
    const { name, department, issueTitle, description } = req.body;
    
    const complaint = await Complaint.create({
      name,
      department,
      issueTitle,
      description
    });

    res.status(201).json({
      success: true,
      message: 'Complaint registered successfully',
      data: complaint
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating complaint',
      error: error.message
    });
  }
};

// Update complaint status
exports.updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'resolved'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be "pending" or "resolved"'
      });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Complaint status updated',
      data: complaint
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating complaint',
      error: error.message
    });
  }
};

// Delete complaint
exports.deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const complaint = await Complaint.findByIdAndDelete(id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Complaint deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error deleting complaint',
      error: error.message
    });
  }
};