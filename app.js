var createError   = require('http-errors');
var express       = require('express');
var path          = require('path');
var cookieParser  = require('cookie-parser');
var logger        = require('morgan');
var hbs           = require('hbs');
var passport      = require('passport'); 

require('dotenv').config();

// ----- CONNECT MONGODB + REGISTER MODELS + CONFIGURE AUTH BEFORE ROUTERS -----

// connect to MongoDB
require('./app_api/models/db');

// register mongoose models
require('./app_api/models/trips');
require('./app_api/models/user');

// configure passport strategies (local + jwt)
require('./app_api/config/passport');

// ----- pull in the routers -----
var indexRouter   = require('./app_server/routes/index');
var usersRouter   = require('./app_server/routes/users');
var travelRouter  = require('./app_server/routes/travel');
var apiRouter     = require('./app_api/routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// register handlebars partials
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CORS so Angular (http://localhost:4200) can talk to API (http://localhost:3000)
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // dev: allow all
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

// initialize passport BEFORE routes
app.use(passport.initialize());

// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
