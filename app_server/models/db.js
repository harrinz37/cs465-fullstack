// app_server/models/db.js
const mongoose = require('mongoose');
const readLine = require('readline');

// Build the connection string (host comes from env var if present)
const host  = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;

// Connect (timeout example shown in screenshot)
const connect = () => {
  setTimeout(() => mongoose.connect(dbURI, {
    // options here if desired (e.g., serverSelectionTimeoutMS)
  }), 1000);
};

// Connection event listeners
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
  console.log('Mongoose connection error: ', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Windows-specific SIGINT workaround (nodemon)
if (process.platform === 'win32') {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on('SIGINT', () => {
    process.emit('SIGINT');
  });
}

// Graceful shutdown helper
const gracefulShutdown = (msg) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
  });
};

// Nodemon restart
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart');
  process.kill(process.pid, 'SIGUSR2');
});

// App termination (Ctrl+C, etc.)
process.on('SIGINT', () => {
  gracefulShutdown('app termination');
  process.exit(0);
});

// Container / hosting termination
process.on('SIGTERM', () => {
  gracefulShutdown('app shutdown');
  process.exit(0);
});

// Make initial connection
connect();

// Load schemas so indexes are created, models are registered
require('./travlr');

module.exports = mongoose;