import db from "../config/db.js";

const FoundItem = {
  create: (data, callback) => {
    const sql = `
      INSERT INTO found_items 
      (itemType, color, brand, features, location, dateFound, timeFound, contactName, contactPhone, photo) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(
      sql,
      [
        data.itemType,
        data.color,
        data.brand,
        data.features,
        data.location,
        data.dateFound,
        data.timeFound,
        data.contactName,
        data.contactPhone,
        data.photo,
      ],
      callback
    );
  },

  getAll: (callback) => {
    db.query("SELECT * FROM found_items ORDER BY created_at DESC", callback);
  },
};







export default FoundItem;
