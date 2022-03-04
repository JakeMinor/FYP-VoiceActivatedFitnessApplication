const express = require('express')
const router = express.Router()
const statisticController = require('../../controllers/statistic.controller')
const isAuthenticated = require('../router.middleware').isAuthenticated

/**
 * Create workout statistics
 */
router.post('/', isAuthenticated, statisticController.createWorkoutStatistics)

module.exports = router