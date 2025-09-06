// src/components/DashboardHome.jsx
import React from 'react';
import { FaInbox, FaCheckCircle, FaBell, FaHistory } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function DashboardHome() {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  
  // Example summary counts (replace with real API data later)
  const stats = {
    lost: 2,
    found: 1,
    matched: 1,
    unread: 3
  };

  return (
    <div className="container mt-4">
      <h3>Welcome, {user.fullName || user.username || 'Student'} 🎓</h3>
      <p className="text-muted">Here’s a quick overview of your lost & found activity.</p>

      {/* Summary Cards */}
      <div className="row g-3 mt-3">
        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <FaInbox size={28} className="text-primary mb-2" />
              <h5>{stats.lost}</h5>
              <p className="mb-0">Lost Items Reported</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <FaCheckCircle size={28} className="text-success mb-2" />
              <h5>{stats.found}</h5>
              <p className="mb-0">Found Items Reported</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <FaHistory size={28} className="text-warning mb-2" />
              <h5>{stats.matched}</h5>
              <p className="mb-0">Matched Items</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <FaBell size={28} className="text-danger mb-2" />
              <h5>{stats.unread}</h5>
              <p className="mb-0">Unread Messages</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-4">
        <h5>Quick Actions</h5>
        <div className="d-flex flex-wrap gap-2 mt-2">
          <Link to="/student/report-lost" className="btn btn-primary">Report Lost Item</Link>
          <Link to="/student/report-found" className="btn btn-success">Report Found Item</Link>
          <Link to="/student/my-reports" className="btn btn-secondary">View My Reports</Link>
          <Link to="/student/matched-items" className="btn btn-warning">Check Matched Items</Link>
        </div>
      </div>
    </div>
  );
}
