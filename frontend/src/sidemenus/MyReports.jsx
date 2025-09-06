// src/components/MyReports.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user's reports from backend
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('/api/my-reports', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleView = (id) => {
    navigate(`/report-details/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/edit-report/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this report?')) return;

    try {
      const res = await fetch(`/api/reports/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.ok) {
        setReports(reports.filter((report) => report.id !== id));
      }
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };

  if (loading) {
    return <p className="m-4">Loading your reports...</p>;
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">My Reports</h3>

      {reports.length === 0 ? (
        <p>You have not submitted any lost or found item reports yet.</p>
      ) : (
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>Item</th>
              <th>Status</th>
              <th>Date Reported</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>{report.itemType}</td>
                <td>
                  <span
                    className={`badge ${
                      report.status === 'matched'
                        ? 'bg-success'
                        : report.status === 'pending'
                        ? 'bg-warning text-dark'
                        : 'bg-secondary'
                    }`}
                  >
                    {report.status === 'matched'
                      ? 'Matched'
                      : report.status === 'pending'
                      ? 'Under Review'
                      : 'Unclaimed'}
                  </span>
                </td>
                <td>{new Date(report.dateReported).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-sm btn-info me-2"
                    onClick={() => handleView(report.id)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(report.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(report.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
