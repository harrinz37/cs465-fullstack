const jwt = require('express-jwt');

const auth = jwt({
  secret: process.env.JWT_SECRET || 'travlr',
  userProperty: 'payload',
  algorithms: ['HS256']
});

module.exports = auth;
