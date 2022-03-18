const createError = require("http-errors")
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const session = require("cookie-session")
const passport = require("passport")
const cors = require('cors')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({origin: ["http://localhost:8080", "http://localhost:3000", "https://fyp-voice-activated-fitness.herokuapp.com", "https://jakeminor.github.io"], credentials: true}))
/**
 * Configure the authentication session to store the logged in users information.
 */
app.use(session({secret: '1233', cookie: { secure: process.env.NODE_ENV === 'production' ? true : false }}))
app.use(passport.initialize({}))
app.use(passport.session({secret: '1233'}))

/**
 * Configure routes.
 */
require('./router/router.config')(app)
require('./auth/auth')

app.use(express.static(path.join(__dirname, '/public/')));

app.get(/.*/, (req, res) => res.sendFile(path.join(__dirname + '/public/index.html')));

// catch 404 and forward to error handler.
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler.
app.use(function(err, req, res, next) {
  // set locals, only providing error in development.
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page.
  res.status(err.status || 500).send(err.message);
});

module.exports = app;
