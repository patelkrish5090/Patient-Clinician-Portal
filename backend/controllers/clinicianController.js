const Clinician = require('../models/Clinician');
const Patient = require('../models/Patient');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateUniqueId = async () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  const day = String(date.getDate()).padStart(2, '0');
  const datePart = `${year}${month}${day}`;

  let uniqueId;
  let isUnique = false;

  while (!isUnique) {
    // Generate a random 4-digit number
    const randomPart = Math.floor(1000 + Math.random() * 9000); // Random number between 1000 and 9999
    uniqueId = `${datePart}${randomPart}`;

    // Check if the ID already exists in the database
    const existingClinician = await Clinician.findOne({ uniqueId });
    if (!existingClinician) {
      isUnique = true; // ID is unique
    }
  }

  return uniqueId;
};

// Register Clinician
exports.registerClinician = async (req, res) => {
  const { name, email, password, speciality } = req.body;

  try {
    // Check if clinician already exists
    let clinician = await Clinician.findOne({ email });
    if (clinician) return res.status(400).json({ msg: 'Clinician already exists' });

    // Generate a unique ID
    const uniqueId = await generateUniqueId();

    // Create a new clinician
    clinician = new Clinician({
      uniqueId, // Add the unique ID to the clinician document
      name,
      email,
      password,
      speciality,
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    clinician.password = await bcrypt.hash(password, salt);

    // Save the clinician to the database
    await clinician.save();

    // Generate JWT token
    const payload = {
      clinician: {
        id: clinician.id,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Login Clinician
exports.loginClinician = async (req, res) => {
  const { email, password } = req.body;
  try {
    let clinician = await Clinician.findOne({ email });
    if (!clinician) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, clinician.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { clinician: { id: clinician.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


