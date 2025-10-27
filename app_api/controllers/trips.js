const mongoose = require('mongoose');

// IMPORTANT: this name must match mongoose.model('<name>') from your model file in /models
const Trip = mongoose.model('trips');

// GET /api/trips
// return all trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).exec();
    return res.status(200).json(trips);
  } catch (err) {
    return res.status(400).json(err);
  }
};

// GET /api/trips/:tripid
// return a single trip by Mongo _id
const tripsFindById = async (req, res) => {
  try {
    const { tripid } = req.params;
    const trip = await Trip.findById(tripid).exec();

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    return res.status(200).json(trip);
  } catch (err) {
    return res.status(400).json(err);
  }
};

// POST /api/trips
// add a new trip
const tripsAddTrip = async (req, res) => {
  try {
    const newTrip = await Trip.create({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    });

    return res.status(201).json(newTrip);
  } catch (err) {
    return res.status(400).json(err);
  }
};

// PUT /api/trips/:tripid
// update an existing trip
const tripsUpdateTrip = async (req, res) => {
  try {
    const { tripid } = req.params;

    const updatedTrip = await Trip.findByIdAndUpdate(
      tripid,
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
      },
      { new: true }
    ).exec();

    if (!updatedTrip) {
      return res.status(400).json({ message: 'Trip not updated' });
    }

    return res.status(201).json(updatedTrip);
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = {
  tripsList,
  tripsFindById,
  tripsAddTrip,
  tripsUpdateTrip
};
