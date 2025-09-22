const fs = require('fs');
const path = require('path');

// Helper function to read trips.json
const readTrips = () => {
  const filePath = path.join(__dirname, '..', '..', 'data', 'trips.json');
  const rawData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(rawData).trips;
};

// Controller for /travel route
const travel = (req, res) => {
  const trips = readTrips(); // load trips from JSON file
  res.render('travel', {
    title: 'Travlr Getaways',
    trips: trips
  });
};

module.exports = { travel };
