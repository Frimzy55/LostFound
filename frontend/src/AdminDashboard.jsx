import React from 'react';
import {
  FaHome,
  FaInbox,
  FaLink,
  FaUsers,
  FaChartBar,
  FaBell,
  FaUser,
  FaSignOutAlt,
  
  FaLock
  
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
        <h4 className="mb-4">Admin Panel</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <a href="#dashboard" className="nav-link text-white">
              <FaHome className="me-2" /> Dashboard
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#lost-items" className="nav-link text-white">
              <FaInbox className="me-2" /> View All Lost Items
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#found-items" className="nav-link text-white">
              <FaInbox className="me-2" /> View All Found Items
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#match-items" className="nav-link text-white">
              <FaLink className="me-2" /> Match Lost & Found
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#manage-users" className="nav-link text-white">
              <FaUsers className="me-2" /> Manage Users
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#reports" className="nav-link text-white">
              <FaChartBar className="me-2" /> Reports & Logs
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#notifications" className="nav-link text-white">
              <FaBell className="me-2" /> Send Notifications
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#profile" className="nav-link text-white">
              <FaUser className="me-2" /> Profile Settings
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#change-password" className="nav-link text-white">
              <FaLock className="me-2" /> Change Password
            </a>
          </li>
        </ul>
        <button className="btn btn-light w-100 mt-4" onClick={handleLogout}>
          <FaSignOutAlt className="me-2" /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Top Bar */}
        <div className="bg-light p-3 d-flex justify-content-between align-items-center border-bottom">
          <h5 className="mb-0">Welcome, {user?.fullName || 'Admin'} 🛡️</h5>
          <div className="d-flex align-items-center">
            <FaUser className="me-2" />
            <span>{user?.email || 'admin@ktu.edu.gh'}</span>
          </div>
        </div>

        {/* Content Placeholder */}
        <div className="p-4">
          <h2>Admin Dashboard Overview</h2>
          <p className="text-muted">
            Use the sidebar to manage reports, users, notifications, and system settings.
          </p>

          {/* Example Quick Stats */}
          <div className="row mt-4">
            <div className="col-md-3">
              <div className="card text-white bg-primary mb-3">
                <div className="card-body">
                  <h5 className="card-title">Total Lost Reports</h5>
                  <p className="card-text display-6">124</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-white bg-success mb-3">
                <div className="card-body">
                  <h5 className="card-title">Total Found Reports</h5>
                  <p className="card-text display-6">89</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-white bg-info mb-3">
                <div className="card-body">
                  <h5 className="card-title">Matched & Returned</h5>
                  <p className="card-text display-6">76</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-white bg-warning mb-3">
                <div className="card-body">
                  <h5 className="card-title">Pending Verifications</h5>
                  <p className="card-text display-6">12</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
