// app_api/routes/index.js
const express = require('express');
const router = express.Router();
const passport = require('passport');

// controllers
const tripController = require('../controllers/trips');
const authController = require('../controllers/authentication');

//
// ─── AUTHENTICATION ROUTES ─────────────────────────────────────────────
//

// Register a new user (public)
router
  .route('/register')
  .post(authController.register);

// Login existing user (public)
router
  .route('/login')
  .post(authController.login);

//
// ─── TRIP ROUTES ───────────────────────────────────────────────────────
//

// Get all trips (public)
router
  .route('/trips')
  .get(tripController.tripsList)

  // Add new trip (protected – requires JWT)
  .post(
    passport.authenticate('jwt', { session: false }),
    tripController.tripsAddTrip
  );

// Get single trip (public) or update (protected)
router
  .route('/trips/:tripid')
  .get(tripController.tripsFindById)
  .put(
    passport.authenticate('jwt', { session: false }),
    tripController.tripsUpdateTrip
  );

//
// ─── EXPORT ROUTER ─────────────────────────────────────────────────────
//
module.exports = router;
