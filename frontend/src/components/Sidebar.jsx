import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

function Sidebar() {
  const location = useLocation();
  const role = location.pathname.includes('patient') ? 'patient' : 'clinician';
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Menu Button for Mobile */}
      <button
        className="md:hidden fixed top-4 right-4 z-50 p-3 rounded-lg text-white hover:bg-gray-700 transition-colors bg-opacity-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`w-64 bg-gray-800 h-screen fixed left-0 top-0 p-6 flex flex-col text-white transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:w-64 z-40 shadow-lg`}
      >
        <div className="text-2xl font-bold mb-8 text-blue-400">HealthPortal</div>
        <nav className="space-y-3">
          <Link
            to={`/${role}`}
            className={`flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors ${
              location.pathname === `/${role}` ? 'bg-gray-700' : ''
            }`}
            onClick={() => setIsOpen(false)}
          >
            <span className="mr-3">🏠</span> Dashboard
          </Link>
          {role === 'patient' && (
            <>
              <Link
                to="/patient/ask"
                className={`flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors ${
                  location.pathname === '/patient/ask' ? 'bg-gray-700' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="mr-3">➕</span> Ask Question
              </Link>
              <Link
                to="/patient/queries"
                className={`flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors ${
                  location.pathname === '/patient/queries' ? 'bg-gray-700' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="mr-3">📜</span> My Queries
              </Link>
            </>
          )}
          {role === 'clinician' && (
            <Link
              to="/clinician/review"
              className={`flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors ${
                location.pathname === '/clinician/review' ? 'bg-gray-700' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span className="mr-3">📋</span> Review Queries
            </Link>
          )}
        </nav>
        <div className="mt-auto">
          <Link
            to="/"
            className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <span className="mr-3">⚙️</span> Logout
          </Link>
        </div>
      </div>
    </>
  );
}

export default Sidebar;