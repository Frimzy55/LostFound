// src/components/ReportFoundItem.jsx
import React, { useState } from 'react';

export default function ReportFoundItem() {
  const [formData, setFormData] = useState({
    itemType: '',
    color: '',
    brand: '',
    features: '',
    location: '',
    dateFound: '',
    timeFound: '',
    contactName: '',
    contactPhone: '',
    photos: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Found item report submitted!');
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Report a Found Item</h3>
      <form onSubmit={handleSubmit}>
        {/* Item Type */}
        <div className="mb-3">
          <label className="form-label">Type of Item</label>
          <input
            type="text"
            className="form-control"
            name="itemType"
            value={formData.itemType}
            onChange={handleChange}
            placeholder="e.g., Phone, Wallet, ID Card, Keys"
            required
          />
        </div>

        {/* Color */}
        <div className="mb-3">
          <label className="form-label">Color</label>
          <input
            type="text"
            className="form-control"
            name="color"
            value={formData.color}
            onChange={handleChange}
            required
          />
        </div>

        {/* Brand */}
        <div className="mb-3">
          <label className="form-label">Brand</label>
          <input
            type="text"
            className="form-control"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
        </div>

        {/* Unique Features */}
        <div className="mb-3">
          <label className="form-label">Unique Features</label>
          <textarea
            className="form-control"
            name="features"
            value={formData.features}
            onChange={handleChange}
            placeholder="Any unique marks, stickers, scratches, etc."
          />
        </div>

        {/* Location */}
        <div className="mb-3">
          <label className="form-label">Found Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Building, classroom, bus stop, etc."
            required
          />
        </div>

        {/* Date and Time */}
        <div className="mb-3">
          <label className="form-label">Date Found</label>
          <input
            type="date"
            className="form-control"
            name="dateFound"
            value={formData.dateFound}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Time Found</label>
          <input
            type="time"
            className="form-control"
            name="timeFound"
            value={formData.timeFound}
            onChange={handleChange}
            required
          />
        </div>

        {/* Contact Info */}
        <div className="mb-3">
          <label className="form-label">Contact Name</label>
          <input
            type="text"
            className="form-control"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contact Phone</label>
          <input
            type="tel"
            className="form-control"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            required
          />
        </div>

        {/* Photos */}
        <div className="mb-3">
          <label className="form-label">Upload Photo</label>
          <input
            type="file"
            className="form-control"
            name="photos"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit Report
        </button>
      </form>
    </div>
  );
}
