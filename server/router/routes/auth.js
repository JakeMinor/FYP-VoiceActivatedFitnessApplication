const express = require('express')
const router = express.Router()
const passport = require('passport')
require('dotenv').config()

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
  const returnUrl = process.env.NODE_ENV === 'production' ? process.env.PROD_UI : process.env.DEV_UI
  console.log(process.env.NODE_ENV)
  res.cookie('access_token', amazonAccessToken, { sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', secure: process.env.NODE_ENV === 'production' ? true : false }).redirect(returnUrl) // Redirects the user in to the UI.
 })(req, res, next)
})

/**
 * Logs the user out.
 */
router.get('/logout', (req, res) => {
 req.logout(); // Logs the user out.
})

module.exports = router