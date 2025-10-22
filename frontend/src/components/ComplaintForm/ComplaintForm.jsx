// src/components/ComplaintForm.jsx
import React, { useState } from 'react';
import './ComplaintForm.css';

const ComplaintForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    issueTitle: '',
    description: ''
  });

  const departments = [
    'Computer Science',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electronics & Communication',
    'Information Technology',
    'Administration',
    'Library',
    'Hostel',
    'Sports',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.department && formData.issueTitle && formData.description) {
      onSubmit(formData);
      setFormData({
        name: '',
        department: '',
        issueTitle: '',
        description: ''
      });
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <div className="complaint-form-container">
      <h2>Submit a Complaint</h2>
      <form onSubmit={handleSubmit} className="complaint-form">
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="department">Department *</label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="issueTitle">Issue Title *</label>
          <input
            type="text"
            id="issueTitle"
            name="issueTitle"
            value={formData.issueTitle}
            onChange={handleChange}
            placeholder="Brief title of your issue"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your complaint in detail..."
            rows="6"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

export default ComplaintForm;

