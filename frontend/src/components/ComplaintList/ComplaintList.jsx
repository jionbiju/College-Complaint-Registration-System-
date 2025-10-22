
import React, { useState } from 'react';
import './ComplaintList.css';

const ComplaintList = ({ complaints, loading, onStatusUpdate, onDelete }) => {
  const [filter, setFilter] = useState('all');

  const filteredComplaints = complaints.filter(complaint => {
    if (filter === 'all') return true;
    return complaint.status === filter;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="loading">Loading complaints...</div>;
  }

  return (
    <div className="complaint-list-container">
      <div className="list-header">
        <h2>All Complaints</h2>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({complaints.length})
          </button>
          <button
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending ({complaints.filter(c => c.status === 'pending').length})
          </button>
          <button
            className={`filter-btn ${filter === 'resolved' ? 'active' : ''}`}
            onClick={() => setFilter('resolved')}
          >
            Resolved ({complaints.filter(c => c.status === 'resolved').length})
          </button>
        </div>
      </div>

      {filteredComplaints.length === 0 ? (
        <div className="no-complaints">
          <p>No complaints found</p>
        </div>
      ) : (
        <div className="complaints-grid">
          {filteredComplaints.map(complaint => (
            <div key={complaint._id} className={`complaint-card ${complaint.status}`}>
              <div className="complaint-header">
                <h3>{complaint.issueTitle}</h3>
                <span className={`status-badge ${complaint.status}`}>
                  {complaint.status}
                </span>
              </div>
              
              <div className="complaint-info">
                <p><strong>Name:</strong> {complaint.name}</p>
                <p><strong>Department:</strong> {complaint.department}</p>
                <p><strong>Submitted:</strong> {formatDate(complaint.createdAt)}</p>
              </div>

              <div className="complaint-description">
                <p>{complaint.description}</p>
              </div>

              <div className="complaint-actions">
                {complaint.status === 'pending' ? (
                  <button
                    className="action-btn resolve-btn"
                    onClick={() => onStatusUpdate(complaint._id, 'resolved')}
                  >
                    Mark as Resolved
                  </button>
                ) : (
                  <button
                    className="action-btn pending-btn"
                    onClick={() => onStatusUpdate(complaint._id, 'pending')}
                  >
                    Mark as Pending
                  </button>
                )}
                <button
                  className="action-btn delete-btn"
                  onClick={() => onDelete(complaint._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComplaintList;