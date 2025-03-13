import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register({ role }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [speciality, setSpeciality] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Simulate registration
    localStorage.setItem('token', 'sample-token');
    navigate(role === 'patient' ? '/patient' : '/clinician');
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm">
      <h2 className="text-xl font-semibold text-blue-400 mb-4 text-center">
        {role === 'patient' ? 'Patient Registration' : 'Clinician Registration'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          required
        />
        {role === 'patient' && (
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            placeholder="Date of Birth"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            required
          />
        )}
        {role === 'clinician' && (
          <select
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            required
          >
            <option value="" disabled>
              Select Speciality
            </option>
            <option value="Cardiology">Cardiology</option>
            <option value="Dermatology">Dermatology</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Orthopedics">Orthopedics</option>
          </select>
        )}
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg text-sm hover:bg-blue-600 transition-all transform hover:scale-105"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;