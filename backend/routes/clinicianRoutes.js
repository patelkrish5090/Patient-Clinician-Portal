const express = require('express');
const router = express.Router();
const clinicianController = require('../controllers/clinicianController');
const auth = require('../middleware/auth');

router.post('/register', clinicianController.registerClinician);
router.post('/login', clinicianController.loginClinician);

module.exports = router;