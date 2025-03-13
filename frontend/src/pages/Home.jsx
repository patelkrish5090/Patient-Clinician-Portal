import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { FaUser, FaUserMd } from 'react-icons/fa';
import Login from '../components/Login';
import Register from '../components/Register';

function Home() {
  const [activeTab, setActiveTab] = useState('patient'); // Default tab is 'patient'
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm relative">
        {/* Toggle between Login and Register */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-3 py-1 text-sm font-semibold rounded-lg ${
              isLogin ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            } transition-colors`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-3 py-1 text-sm font-semibold rounded-lg ${
              !isLogin ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            } transition-colors`}
          >
            Register
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-600 mb-6 pt-10"> {/* Added pt-10 for spacing */}
          <button
            className={`flex-1 py-2 text-sm font-semibold flex items-center justify-center ${
              activeTab === 'patient' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'
            } transition-colors duration-300`}
            onClick={() => setActiveTab('patient')}
          >
            <FaUser className="mr-2" /> Patient
          </button>
          <button
            className={`flex-1 py-2 text-sm font-semibold flex items-center justify-center ${
              activeTab === 'clinician' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'
            } transition-colors duration-300`}
            onClick={() => setActiveTab('clinician')}
          >
            <FaUserMd className="mr-2" /> Clinician
          </button>
        </div>

        {/* Tab Content with Transition */}
        <CSSTransition in={true} timeout={300} classNames="fade" unmountOnExit>
          <div>
            {isLogin ? (
              <>
                {activeTab === 'patient' && <Login role="patient" />}
                {activeTab === 'clinician' && <Login role="clinician" />}
              </>
            ) : (
              <>
                {activeTab === 'patient' && <Register role="patient" />}
                {activeTab === 'clinician' && <Register role="clinician" />}
              </>
            )}
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}

export default Home;