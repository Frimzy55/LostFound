// src/ReportLostItem.jsx
import React, { useState } from 'react';
import axios from 'axios'; 

export default function ReportLostItem() {
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    locationLost: '',
    dateLost: '',
    timeLost: '',
    photo: null,
    additionalInfo: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  /*const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send `formData` to backend using fetch or axios
    console.log(formData);
    alert('Lost item reported successfully!');
  };*/

  const handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData();
  for (let key in formData) {
    data.append(key, formData[key]);
  }

  try {
    const response = await axios.post('http://localhost:5000/api/lost-items/report', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    alert(response.data.message);
  } catch (error) {
    console.error('Error reporting lost item:', error);
    alert('Failed to report lost item.');
  }
};

  return (
    <div className="p-4">
      <h2>You're welcome to report lost item</h2>
      <p className="text-muted">Please provide details of the lost item in the form below.</p>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Item Name *</label>
          <input
            type="text"
            name="itemName"
            className="form-control"
            value={formData.itemName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description *</label>
          <textarea
            name="description"
            className="form-control"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Location Lost *</label>
          <input
            type="text"
            name="locationLost"
            className="form-control"
            value={formData.locationLost}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row mb-3">
          <div className="col">
            <label className="form-label">Date Lost *</label>
            <input
              type="date"
              name="dateLost"
              className="form-control"
              value={formData.dateLost}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <label className="form-label">Time (optional)</label>
            <input
              type="time"
              name="timeLost"
              className="form-control"
              value={formData.timeLost}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Upload Photo (optional)</label>
          <input
            type="file"
            name="photo"
            className="form-control"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Additional Info (optional)</label>
          <textarea
            name="additionalInfo"
            className="form-control"
            rows="2"
            value={formData.additionalInfo}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit Report
        </button>
      </form>
    </div>
  );
}
