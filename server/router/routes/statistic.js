const express = require('express')
const router = express.Router()
const statisticController = require('../../controllers/statistic.controller')
const isAuthenticated = require('../router.middleware').isAuthenticated

/**
 * Get all completed workouts
 */
router.get('/', isAuthenticated, statisticController.getAllWorkoutStatistics)

/**
 * Get all stats for a specific workout
 */
router.get('/:date', isAuthenticated, statisticController.getWorkoutStatistics)

/**
 * Create workout statistics
 */
router.post('/', isAuthenticated, statisticController.createWorkoutStatistics)

module.exports = router