import FoundItem from "../models/foundItemModel.js";

export const reportFoundItem = (req, res) => {
  const { itemType, color, brand, features, location, dateFound, timeFound, contactName, contactPhone } = req.body;
  const photo = req.file ? req.file.filename : null;

  const newItem = {
    itemType,
    color,
    brand,
    features,
    location,
    dateFound,
    timeFound,
    contactName,
    contactPhone,
    photo,
  };

  FoundItem.create(newItem, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json({ message: "✅ Found item reported successfully", id: result.insertId });
  });
};

export const getAllFoundItems = (req, res) => {
  FoundItem.getAll((err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results);
  });
};







