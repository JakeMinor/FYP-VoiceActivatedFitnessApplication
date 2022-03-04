require('dotenv').config({path: __dirname + '/./../../.env'}) // Get environment variables from .env file
const passport = require('passport')
const LoginWithAmazon = require('passport-amazon').Strategy // Get the strategy needed to authenticate with Amazon (OAuth 2.0)

// Tells passport to use the Login With Amazon companion app security profile.
passport.use('amazon', new LoginWithAmazon({
   clientID: process.env.CLIENT_ID,
   clientSecret: process.env.CLIENT_SECRET,
   callbackURL: process.env.CALLBACK_URL
  }, 
  // Return the Amazon access token, refresh token and profile.
  (accessToken, refreshToken, profile, done) => {
   return done(null, profile, accessToken)
  }
));

module.exports = passport