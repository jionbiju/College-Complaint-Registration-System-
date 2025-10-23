import React, { useState, useEffect } from 'react';
import ComplaintForm from './components/ComplaintForm/ComplaintForm.jsx';
import ComplaintList from './components/ComplaintList/ComplaintList.jsx';
import './App.css';


function App() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('list');

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/complaints`);
      const data = await response.json();
      if (data.success) {
        setComplaints(data.data);
      }
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleComplaintSubmit = async (complaintData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/complaints`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(complaintData),
      });
      const data = await response.json();
      if (data.success) {
        alert('Complaint submitted successfully!');
        fetchComplaints();
        setActiveTab('list');
      }
    } catch (error) {
      console.error('Error submitting complaint:', error);
      alert('Failed to submit complaint');
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/complaints/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      if (data.success) {
        fetchComplaints();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this complaint?')) {
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/complaints/${id}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if (data.success) {
          fetchComplaints();
        }
      } catch (error) {
        console.error('Error deleting complaint:', error);
      }
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>College Complaint Registration System</h1>
        <p>Register and track your complaints efficiently</p>
      </header>

      <div className="tab-container">
        <button
          className={`tab-btn ${activeTab === 'form' ? 'active' : ''}`}
          onClick={() => setActiveTab('form')}
        >
          Submit Complaint
        </button>
        <button
          className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => setActiveTab('list')}
        >
          View Complaints ({complaints.length})
        </button>
      </div>

      <div className="content">
        {activeTab === 'form' ? (
          <ComplaintForm onSubmit={handleComplaintSubmit} />
        ) : (
          <ComplaintList
            complaints={complaints}
            loading={loading}
            onStatusUpdate={handleStatusUpdate}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}

export default App;



