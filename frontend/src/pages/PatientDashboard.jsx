import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import QueryList from '../components/QueryList';
import QueryForm from '../components/QueryForm';
import Notification from '../components/Notification';

function PatientDashboard() {
  const [queries, setQueries] = useState([
    {
      id: '1',
      question: 'What are the symptoms of COVID-19?',
      aiResponse: 'Common symptoms include fever, cough, and shortness of breath.',
      status: 'pending',
    },
    {
      id: '2',
      question: 'How to manage high blood pressure?',
      aiResponse: 'Maintain a healthy diet, exercise regularly, and take prescribed medications.',
      status: 'verified',
      clinicianResponse: 'This is a verified response.',
      verifiedBy: 'Dr. Smith', // Added clinician's name
    },
  ]);
  const [notification, setNotification] = useState(null);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-900 p-4 md:p-6 overflow-auto">
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
        <Routes>
          <Route
            path="/"
            element={
              <div className="space-y-6">
                <h1 className="text-3xl md:text-4xl font-bold text-white">Welcome back</h1>
                <p className="text-gray-400 text-lg">Monitor your health queries and responses.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-300">Total Questions</h3>
                    <p className="text-3xl md:text-4xl text-blue-400 mt-2">{queries.length}</p>
                    <p className="text-gray-500 text-sm mt-1">Asked by you</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-300">Today’s Queries</h3>
                    <p className="text-3xl md:text-4xl text-blue-400 mt-2">0</p>
                    <p className="text-gray-500 text-sm mt-1">Asked today</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-300">Verified Responses</h3>
                    <p className="text-3xl md:text-4xl text-blue-400 mt-2">1</p>
                    <p className="text-gray-500 text-sm mt-1">In last 24 hours</p>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-300 mb-4">Recent Queries</h3>
                  <QueryList queries={queries} />
                </div>
              </div>
            }
          />
          <Route
            path="/ask"
            element={
              <div className="flex-1 flex flex-col justify-start pt-8">
                <QueryForm setQueries={setQueries} />
              </div>
            }
          />
          <Route
            path="/queries"
            element={
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-gray-300 mb-4">All Queries</h3>
                <QueryList queries={queries} />
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default PatientDashboard;