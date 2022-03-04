const express = require('express')
const router = express.Router()
const workoutController = require('../../controllers/workout.controller')
const isAuthenticated = require('../router.middleware').isAuthenticated
  
/**
 * Get workout by name 
 */
router.get('/:name', isAuthenticated, workoutController.getWorkoutByName)

module.exports = router