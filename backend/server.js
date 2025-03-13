const express = require('express');
const {connectDB} = require('./config/db');
const patientRoutes = require('./routes/patientRoutes');
const clinicianRoutes = require('./routes/clinicianRoutes');
const queryRoutes = require('./routes/queryRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // This line is crucial for parsing JSON request bodies

// Routes
app.use('/api/patient', patientRoutes);
app.use('/api/clinician', clinicianRoutes);
app.use('/api/query', queryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;