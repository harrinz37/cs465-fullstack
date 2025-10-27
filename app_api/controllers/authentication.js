// app_api/controllers/authentication.js
const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('users');

// REGISTER
const register = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'All fields required' });
  }

  try {
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);

    await user.save();

    const token = user.generateJwt();
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
};

// LOGIN
const login = (req, res) => {
  // validate incoming body
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'All fields required' });
  }

  // delegate to passport local strategy
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(404).json(err);
    }

    if (user) {
      // success → issue token
      const token = user.generateJwt();
      return res.status(200).json({ token });
    } else {
      // failed auth
      return res.status(401).json(info);
    }
  })(req, res);
};

module.exports = {
  register,
  login
};
