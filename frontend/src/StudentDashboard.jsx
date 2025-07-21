import React from 'react';
import {
  FaSignOutAlt,
  FaUser,
  FaInbox,
  FaHistory,
  FaHome,
  FaBell,
  FaFileAlt,
  FaQuestionCircle,
  FaLock,
} from 'react-icons/fa';
import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="d-flex" style={{ height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      <div
        className="bg-primary text-white p-3"
        style={{ width: '250px', position: 'fixed', top: 0, bottom: 0, left: 0, overflowY: 'auto' }}
      >
        <h4 className="mb-4">Lost & Found</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link to="" className="nav-link text-white">
              <FaHome className="me-2" /> Dashboard
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="report-lost" className="nav-link text-white">
              <FaInbox className="me-2" /> Report Lost Item
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="report-found" className="nav-link text-white">
              <FaInbox className="me-2" /> Report Found Item
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="my-reports" className="nav-link text-white">
              <FaHistory className="me-2" /> My Reports
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="matched-items" className="nav-link text-white">
              <FaFileAlt className="me-2" /> Matched Items
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="notifications" className="nav-link text-white">
              <FaBell className="me-2" /> Messages / Notifications
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="profile" className="nav-link text-white">
              <FaUser className="me-2" /> Profile
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="change-password" className="nav-link text-white">
              <FaLock className="me-2" /> Change Password
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="help" className="nav-link text-white">
              <FaQuestionCircle className="me-2" /> Help / FAQ
            </Link>
          </li>
        </ul>

        <button className="btn btn-light w-100 mt-4" onClick={handleLogout}>
          <FaSignOutAlt className="me-2" /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1" style={{ marginLeft: '250px', overflowY: 'auto', height: '100vh' }}>
        {/* Top Bar */}
        <div
          className="bg-light p-3 d-flex justify-content-between align-items-center border-bottom"
          style={{ position: 'sticky', top: 0, zIndex: 1000 }}
        >
          <h5 className="mb-0">Welcome, {user?.fullName || 'Student'} 🎓</h5>
          <div className="d-flex align-items-center">
            <FaUser className="me-2" />
            <span>{user?.email || 'student@ktu.edu.gh'}</span>
          </div>
        </div>

        {/* Nested Route Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
