const Patient = require('../models/Patient');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register Patient
exports.registerPatient = async (req, res) => {
  console.log('Request body:', req.body); // Log the entire request body
  const { name, email, password, dob } = req.body;
  console.log('Received data:', { name, email, password, dob }); // Debugging line

  // Validate required fields
  if (!name || !email || !password || !dob) {
    return res.status(400).json({ msg: 'Please include all fields' });
  }

  try {
    let patient = await Patient.findOne({ email });
    if (patient) return res.status(400).json({ msg: 'Patient already exists' });

    // Convert dob string to Date object
    const dobDate = new Date(dob);

    patient = new Patient({ name, email, password, dob: dobDate });
    const salt = await bcrypt.genSalt(10);
    patient.password = await bcrypt.hash(password, salt);
    await patient.save();

    const payload = { patient: { id: patient.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Login Patient
exports.loginPatient = async (req, res) => {
  const { email, password } = req.body;
  try {
    let patient = await Patient.findOne({ email });
    if (!patient) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { user: { email: patient.email } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};