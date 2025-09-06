// src/components/Notifications.jsx
import React, { useState } from 'react';
import { FaEnvelope, FaEnvelopeOpen, FaTrash, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Notifications() {
  // Example notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Possible Match Found',
      message: 'Your lost wallet may match a found item reported yesterday.',
      date: '2025-08-14 10:30 AM',
      read: false,
      relatedReportId: 101
    },
    {
      id: 2,
      title: 'Report Status Updated',
      message: 'Your report for "Black Samsung Phone" is now under review.',
      date: '2025-08-13 4:15 PM',
      read: true,
      relatedReportId: 102
    },
    {
      id: 3,
      title: 'Reminder',
      message: 'Please update the details of your lost ID card for better matching.',
      date: '2025-08-12 9:00 AM',
      read: false,
      relatedReportId: 103
    }
  ]);

  // Toggle read/unread
  const toggleRead = (id) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, read: !n.read } : n
      )
    );
  };

  // Delete a notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <div className="container mt-4">
      <h3>📩 Your Messages / Notifications</h3>
      <p className="text-muted">Click an icon to mark as read/unread, view, or delete.</p>

      {notifications.length === 0 ? (
        <p className="text-muted">No notifications available.</p>
      ) : (
        <div className="list-group">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`list-group-item d-flex justify-content-between align-items-start ${
                n.read ? 'bg-light' : 'bg-white'
              }`}
            >
              <div>
                <h6 className="mb-1">
                  {n.read ? <FaEnvelopeOpen className="text-secondary me-2" /> : <FaEnvelope className="text-primary me-2" />}
                  {n.title}
                </h6>
                <p className="mb-1">{n.message}</p>
                <small className="text-muted">{n.date}</small>
              </div>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => toggleRead(n.id)}
                >
                  {n.read ? 'Mark Unread' : 'Mark Read'}
                </button>
                <Link
                  to={`/student/my-reports/${n.relatedReportId}`}
                  className="btn btn-sm btn-outline-success"
                >
                  <FaEye /> View
                </Link>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => deleteNotification(n.id)}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
