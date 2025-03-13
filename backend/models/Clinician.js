const mongoose = require('mongoose');

const ClinicianSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  speciality: { type: String, required: true },
  queries: [
    {
      question: { type: String, required: true },
      aiResponse: { type: String, default: '' },
      patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
      status: { type: String, enum: ['pending', 'verified'], default: 'pending' },
    },
  ],
});

module.exports = mongoose.model('Clinician', ClinicianSchema);