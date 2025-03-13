const mongoose = require('mongoose');

const QuerySchema = new mongoose.Schema({
  patientEmail: { type: String, required: true }, // Relate queries to patients using email
  question: { type: String, required: true },
  aiResponse: { type: String, default: '' },
  clinicianResponse: { type: String, default: '' },
  status: { type: String, enum: ['pending', 'verified'], default: 'pending' },
  specialization: { type: String, required: true }, // Tag for specialization
});

module.exports = mongoose.model('Query', QuerySchema);