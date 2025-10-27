const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  length: { type: Number, required: true },
  start: { type: String, required: true },      
  resort: { type: String, required: true },
  perPerson: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true }
});

// THIS is the critical line Mongoose needs
mongoose.model('trips', tripSchema);
