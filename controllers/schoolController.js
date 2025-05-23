// controllers/schoolController.js
const db = require('../config/db');

exports.addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  // Basic validation
  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const [result] = await db.execute(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, latitude, longitude]
    );

    res.status(201).json({ message: 'School added successfully', schoolId: result.insertId });
  } catch (err) {
    console.error('Error inserting school:', err);
    res.status(500).json({ error: err.message });
  }
};

// controllers/schoolController.js
const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = deg => (deg * Math.PI) / 180;
    const R = 6371; // Radius of Earth in KM
  
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
  
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return R * c;
  };
  
  exports.listSchools = async (req, res) => {
    const userLat = parseFloat(req.query.latitude);
    const userLon = parseFloat(req.query.longitude);
  
    if (!userLat || !userLon) {
      return res.status(400).json({ error: 'latitude and longitude are required as query params' });
    }
  
    try {
      const [schools] = await db.query('SELECT * FROM schools');
  
      const sortedSchools = schools.map(school => {
        const distance = haversineDistance(userLat, userLon, school.latitude, school.longitude);
        return { ...school, distance };
      }).sort((a, b) => a.distance - b.distance);
  
      res.json({ schools: sortedSchools });
    } catch (err) {
      console.error('Error fetching schools:', err);
      res.status(500).json({ error: 'Failed to fetch schools' });
    }
  };
  
