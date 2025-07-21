// src/components/DashboardHome.jsx
import React from 'react';

export default function DashboardHome() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <h3>Welcome, {user?.fullName || user?.username || 'Student'} 🎉</h3>
    </div>
  );
}
