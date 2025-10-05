// app_server/models/seed.js

// Bring in DB connection and Trip schema
const mongoose = require('./db');
const Trip = require('./travlr');
const fs = require('fs');

// Read seed data from trips.json
const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

// Delete any existing records, then insert seed data
const seedDB = async () => {
  try {
    await Trip.deleteMany({});
    console.log('Existing trips removed');
    await Trip.insertMany(trips);
    console.log('Trips seeded successfully');
  } catch (err) {
    console.error('Error seeding DB:', err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
