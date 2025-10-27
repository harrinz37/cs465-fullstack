// app_api/models/user.js
const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name:   { type: String, required: true },
  email:  { type: String, required: true, unique: true },
  hash:   String,
  salt:   String
});

// set password: generate salt + hash
userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
};

// check password
userSchema.methods.validPassword = function(password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
  return this.hash === hash;
};

// issue JWT
userSchema.methods.generateJwt = function() {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7); // 7 days from now

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      exp: Math.floor(expiry.getTime() / 1000)
    },
    process.env.JWT_SECRET // 🔥 uses the env secret
  );
};

mongoose.model('users', userSchema);
