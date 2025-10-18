// src/components/MyReports.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        // Fetch lost items
        const lostRes = await fetch('/api/lost-items', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const lostItems = await lostRes.json();

        // Fetch found items
        const foundRes = await fetch('/api/found-items', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const foundItems = await foundRes.json();

        // Combine lost and found items
        const combinedReports = [
          ...lostItems.map((item) => ({ ...item, type: 'Lost' })),
          ...foundItems.map((item) => ({ ...item, type: 'Found' })),
        ];

        setReports(combinedReports);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleView = (id, type) => {
    navigate(`/${type.toLowerCase()}-report/${id}`);
  };

  const handleEdit = (id, type) => {
    navigate(`/edit-${type.toLowerCase()}-report/${id}`);
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm('Are you sure you want to delete this report?')) return;

    try {
      const res = await fetch(`/api/${type.toLowerCase()}-items/${id}`, {
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

  if (loading) return <p className="m-4">Loading your reports...</p>;

  return (
    <div className="container mt-4">
      <h3 className="mb-4">My Reports</h3>

      {reports.length === 0 ? (
        <p>You have not submitted any lost or found item reports yet.</p>
      ) : (
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>Type</th>
              <th>Item</th>
              <th>Status</th>
              <th>Date Reported</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={`${report.type}-${report.id}`}>
                <td>{report.type}</td>
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
                    onClick={() => handleView(report.id, report.type)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(report.id, report.type)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(report.id, report.type)}
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
