const Query = require('../models/Query'); // Import the Query model
const Patient = require('../models/Patient'); // Import the Patient model
const Clinician = require('../models/Clinician'); // Import the Clinician model
const axios = require('axios');

// Function to generate AI response using Gemini API
// Function to generate AI response using Gemini API
const generateGeminiResponse = async (question) => {
  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + process.env.GEMINI_API_KEY,
      {
        contents: [{ role: "user", parts: [{ text: question }] }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Extract the AI response
    return response.data.candidates[0].content.parts[0].text;
  } catch (err) {
    console.error('Error generating AI response:', err.message);
    return 'Unable to generate an AI response at this time.';
  }
};


// Submit a Query (Patient)
exports.submitQuery = async (req, res) => {
  console.log('Request received:', req.body); // Debugging line
  const { question, specialization } = req.body;

  try {
    // Find the patient by email (from req.user.email)
    const patient = await Patient.findOne({ email: req.user.email });
    if (!patient) return res.status(404).json({ msg: 'Patient not found' });

    // Generate an AI response using Gemini API
    const aiResponse = await generateGeminiResponse(question);

    // Create a new query and link it to the patient's email
    const newQuery = new Query({
      patientEmail: patient.email, // Use patient's email to relate the query
      question,
      specialization,
      aiResponse, // Save the AI response
    });

    await newQuery.save(); // Save the query to the Query collection
    res.json(newQuery);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get Queries for Clinician (by Specialization)
exports.getQueriesForClinician = async (req, res) => {
  try {
    const clinician = await Clinician.findById(req.user.id); // Get the logged-in clinician
    if (!clinician) return res.status(404).json({ msg: 'Clinician not found' });

    // Find all queries that match the clinician's specialization and are pending
    const queries = await Query.find({
      specialization: clinician.speciality,
      status: 'pending',
    });

    res.json(queries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get Queries for Patient (by Email ID)
exports.getQueriesForPatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user.id); // Get the logged-in patient
    if (!patient) return res.status(404).json({ msg: 'Patient not found' });

    // Find all queries related to the patient's email
    const queries = await Query.find({ patientEmail: patient.email });
    res.json(queries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Verify/Answer a Query (Clinician)
exports.verifyQuery = async (req, res) => {
  const { response } = req.body;
  try {
    const query = await Query.findById(req.params.id); // Find the query by ID
    if (!query) return res.status(404).json({ msg: 'Query not found' });

    query.clinicianResponse = response;
    query.status = 'verified'; // Update the status to verified
    await query.save();

    res.json(query);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};