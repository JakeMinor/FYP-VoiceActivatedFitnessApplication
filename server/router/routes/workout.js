const express = require('express')
const router = express.Router()
const workoutController = require('../../controllers/workout.controller')

/**
 * Get workout by name 
 */
router.get('/:name', workoutController.getWorkoutByName)

module.exports = router