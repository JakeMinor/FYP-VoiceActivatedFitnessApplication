const express = require('express')
const router = express.Router()
const noteController = require('../../controllers/note.controller')
const isAuthenticated = require('../router.middleware').isAuthenticated

/**
 * Create a note.
 */
router.post('/:id', isAuthenticated, noteController.createNote)

/**
 * Update a note.
 */
router.put('/:id', isAuthenticated, noteController.updateNote)

/**
 * Delete a note.
 */
router.delete('/:id', isAuthenticated, noteController.deleteNote)

module.exports = router