// app_api/travlr.js

require('dotenv').config(); // Load .env first

const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');

// connect to Mongo (you should already have this in your version;
// keep your existing connection string if it's different)
require('./models/db'); // if your connection is done in db.js

// pull in Mongoose models
require('./models/user');
require('./models/trips'); // trips schema (yours may be trips.js instead)
require('./config/passport'); // configure passport strategy

// routes
const routesApi = require('./routes/index');

const app = express();

// ----- CORS HEADERS (must include Authorization now) -----
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  next();
});

// logger / parsers
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// static
app.use(express.static(path.join(__dirname, 'public')));

// ----- PASSPORT INIT (Module 7) -----
app.use(passport.initialize());

// ----- API ROUTES -----
app.use('/api', routesApi);

// ----- UnauthorizedError handler (Module 7) -----
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res
      .status(401)
      .json({ message: err.name + ': ' + err.message });
  }
  next(err);
});

// export / listen
// some projects do module.exports = app and start in /bin/www;
// some call app.listen() directly here. Keep what you had.
// If you were doing app.listen here, keep that:
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});

module.exports = app;
