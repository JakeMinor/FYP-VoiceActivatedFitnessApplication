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
app.use(cors({origin: "http://localhost:3000", credentials: true}))
/**
 * Configure the authentication session to store the logged in users information.
 */
app.use(session({name: 'amazon-auth-session', secret: '1233'}))
app.use(passport.initialize())
app.use(passport.session({name: 'amazon-auth-session', secret: '1233'}))

app.use(express.static(path.join(__dirname, 'public')));

/**
 * Configure routes.
 */
require('./router/router.config')(app)
require('./auth/auth')

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
