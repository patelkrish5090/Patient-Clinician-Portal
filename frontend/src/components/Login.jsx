import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ role }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login
    localStorage.setItem('token', 'sample-token');
    navigate(role === 'patient' ? '/patient' : '/clinician');
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm">
      <h2 className="text-xl font-semibold text-blue-400 mb-4 text-center">
        {role === 'patient' ? 'Patient Login' : 'Clinician Login'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg text-sm hover:bg-blue-600 transition-all transform hover:scale-105"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;