// Converted to ES Module format
import db from '../config/db.js';

const LostItem = {
  create: (data, callback) => {
    const sql = `INSERT INTO lost_items 
      (item_name, description, location_lost, date_lost, time_lost, photo_path, additional_info)
      VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      data.itemName,
      data.description,
      data.locationLost,
      data.dateLost,
      data.timeLost || null,
      data.photoPath || null,
      data.additionalInfo || null
    ];
    db.query(sql, values, callback);
  }
};

export default LostItem;