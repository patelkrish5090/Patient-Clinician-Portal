const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const auth = require('../middleware/auth');

router.post('/register', patientController.registerPatient);
router.post('/login', patientController.loginPatient);

module.exports = router;