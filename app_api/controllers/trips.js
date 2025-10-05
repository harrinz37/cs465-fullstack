// app_api/controllers/trips.js
const mongoose = require('mongoose');
require('../models/travlr');                 // registers the model
const Trip = mongoose.model('trips');

// GET /api/trips – list all trips
const tripsList = async (req, res) => {
  try {
    const results = await Trip.find({}).exec();
    return res
      .status(200)
      .json(results);                        // always return JSON
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// GET /api/trips/:tripCode – single trip by code
const tripsFindByCode = async (req, res) => {
  try {
    const code = req.params.tripCode;
    const doc = await Trip.findOne({ code }).exec();
    if (!doc) return res.status(404).json({ message: 'Trip not found' });
    return res.status(200).json(doc);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { tripsList, tripsFindByCode };
