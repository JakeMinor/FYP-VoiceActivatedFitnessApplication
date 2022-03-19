const express = require('express')
const router = express.Router()
const noteController = require('../../controllers/note.controller')
const isAuthenticated = require('../router.middleware').isAuthenticated

/**
 * Create a note.
 */
router.post('/:date', isAuthenticated, noteController.createNote)

module.exports = router