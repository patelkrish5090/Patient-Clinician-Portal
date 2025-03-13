const express = require('express');
const router = express.Router();
const queryController = require('../controllers/queryController');
const auth = require('../middleware/auth');

// Submit a Query (Patient)
router.post('/submit', auth, queryController.submitQuery);

// Get Queries for Clinician (by Specialization)
router.get('/clinician', auth, queryController.getQueriesForClinician);

// Get Queries for Patient (by Email ID)
router.get('/patient', auth, queryController.getQueriesForPatient);

// Verify/Answer a Query (Clinician)
router.put('/verify/:id', auth, queryController.verifyQuery);

module.exports = router;