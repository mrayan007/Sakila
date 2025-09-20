require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var indexRouter = require('./src/routes/index');
var authRouter = require('./src/routes/auth.route');
var moviesRouter = require('./src/routes/movies');
var usersRouter = require('./src/routes/users.route');
var wishlistRouter = require('./src/routes/wishlist.route');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src', 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'mysecretkey', // keep it secret!
  resave: false,        // don’t save session if unmodified
  saveUninitialized: false, // only save if something is stored
  cookie: {
    maxAge: 1000 * 60 * 60 // 1 hour
  }
}));

app.use((req, res, next) => {
    res.locals.isAuthenticated = !!req.session.user
    res.locals.user = req.session.user
    next()
});

app.use('/', indexRouter);
app.use('/movies', moviesRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/wishlist', wishlistRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  switch (err.status) {
    case (404):
      res.status(404).send('404 error');
      break;
    default:
      res.status(500).send('500 error');
  }
});

module.exports = app;
