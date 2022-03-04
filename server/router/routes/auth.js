const express = require('express')
const router = express.Router()
const passport = require('passport')

/**
 * Redirects the user to the amazon login page if they arent authenticated.
 */
router.get('/login', passport.authenticate("amazon", {scope: ['profile']}), (req, res) => {
 res.status(200).send()
})

/**
 * Sends the user login information.
 */
router.get('/callback', (req, res, next) => {
 passport.authenticate('amazon', {failureRedirect: '/login'}, (err, user, amazonAccessToken) => {
  req.user = user // Sets the user information in the session.
  res.cookie('access_token', amazonAccessToken).redirect('//localhost:8080') // Redirects the user in to the UI.
 })(req, res, next)
})

/**
 * Logs the user out.
 */
router.get('/logout', (req, res) => {
 req.logout(); // Logs the user out.
})

module.exports = router