// app_api/config/passport.js

const passport = require('passport');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

// pull in the User model
const User = mongoose.model('users');

// -------- LOCAL STRATEGY (email/password login) --------
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',    
      passwordField: 'password'
    },
    (email, password, done) => {
      User.findOne({ email: email })
        .then(user => {
          if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
          }
          if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          // success
          return done(null, user);
        })
        .catch(err => done(err));
    }
  )
);

// -------- JWT STRATEGY (protect API calls) --------

// Make sure .env has JWT_SECRET=superSecretDoNotShare123
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  console.error('FATAL: JWT_SECRET is not defined in environment (.env)');
}

const jwtOptions = {
  // Look for "Authorization: Bearer <token>"
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
  algorithms: ['HS256']
};

passport.use(
  new JwtStrategy(jwtOptions, (payload, done) => {
    // payload is what we signed in user.generateJwt()
    // typically includes the user's _id / email
    User.findById(payload._id)
      .then(user => {
        if (user) {
          return done(null, user); // attach user to req.user
        } else {
          return done(null, false); // no user found
        }
      })
      .catch(err => done(err, false));
  })
);

