const express = require('express')
const router = express.Router()
const statisticController = require('../../controllers/statistic.controller')
const isAuthenticated = require('../router.middleware').isAuthenticated

/**
 * Create workout statistics
 */
router.post('/', isAuthenticated, statisticController.createWorkoutStatistics)

/**
 * Get all completed workouts
 */
router.get('/', isAuthenticated, statisticController.getCompletedWorkouts)

module.exports = router