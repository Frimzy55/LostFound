// src/components/MatchedItems.jsx
import React, { useEffect, useState } from 'react';

export default function MatchedItems() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('/api/matched-items', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        setMatches(data);
      } catch (error) {
        console.error('Error fetching matched items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const handleView = (id) => {
    window.location.href = `/matched-item-details/${id}`;
  };

  const handleConfirm = (id) => {
    alert(`You have confirmed match for item ID: ${id}`);
  };

  const handleReject = (id) => {
    alert(`You have rejected match for item ID: ${id}`);
  };

  // Feature buttons (shortcuts)
  const featureActions = {
    viewMatches: () => alert('Showing all possible matches...'),
    checkDetails: () => alert('Opening item details & photos...'),
    confirmOrReject: () => alert('You can confirm or reject matches here.'),
    trackStatus: () => alert('Tracking match status...'),
  };

  if (loading) {
    return <p className="m-4">Loading matched items...</p>;
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Matched Items</h3>

      {matches.length === 0 ? (
        <p>No matched items found for your reports yet.</p>
      ) : (
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>Item</th>
              <th>Possible Match</th>
              <th>Match Confidence</th>
              <th>Reported Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match) => (
              <tr key={match.id}>
                <td>{match.userItemType}</td>
                <td>{match.matchedItemType}</td>
                <td>{match.confidence || 'N/A'}%</td>
                <td>{new Date(match.dateReported).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-sm btn-info me-2"
                    onClick={() => handleView(match.id)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-sm btn-success me-2"
                    onClick={() => handleConfirm(match.id)}
                  >
                    Confirm Match
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleReject(match.id)}
                  >
                    Not Mine
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Feature Buttons */}
      <div className="mt-4">
        <h5>Quick Actions</h5>
        <div className="d-flex flex-wrap gap-2 mt-2">
          <button className="btn btn-outline-primary" onClick={featureActions.viewMatches}>
            View Possible Matches
          </button>
          <button className="btn btn-outline-secondary" onClick={featureActions.checkDetails}>
            Check Details & Photos
          </button>
          <button className="btn btn-outline-success" onClick={featureActions.confirmOrReject}>
            Confirm or Reject Matches
          </button>
          <button className="btn btn-outline-warning" onClick={featureActions.trackStatus}>
            Track Match Status
          </button>
        </div>
      </div>
    </div>
  );
}
