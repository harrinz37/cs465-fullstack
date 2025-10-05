// app_server/models/trips.js
const mongoose = require('mongoose');

// Define the trip schema
const tripsSchema = new mongoose.Schema({
  code:       { type: String, required: true, index: true },
  name:       { type: String, required: true, index: true },
  length:     { type: String, required: true },
  start:      { type: Date,   required: true },   // ISO date
  resort:     { type: String, required: true },
  perPerson:  { type: String, required: true },
  image:      { type: String, required: true },
  description:{ type: String, required: true }
});

// Collection will be 'trips'
const Trip = mongoose.model('trips', tripsSchema);
module.exports = Trip;