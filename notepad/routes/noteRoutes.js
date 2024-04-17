
const express = require('express');
const router = express.Router();

// Import the controller for handling note-related operations
const noteController = require('../controllers/noteController');

// Define routes for adding, deleting, editing, and updating notes
router.get('/add-note', noteController.renderAddNoteForm);
router.post('/add-note', noteController.addNote);
router.post('/:id/delete', noteController.deleteNote);
router.get('/:id/edit', noteController.renderEditNoteForm);
router.post('/:id/edit', noteController.updateNote); // Corrected route definition for updating notes
router.post('/:id/pin', noteController.togglePinNote);
module.exports = router;
