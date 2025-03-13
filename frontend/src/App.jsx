import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PatientDashboard from './pages/PatientDashboard';
import ClinicianDashboard from './pages/ClinicianDashboard';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patient/*" element={<PatientDashboard />} />
        <Route path="/clinician/*" element={<ClinicianDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;