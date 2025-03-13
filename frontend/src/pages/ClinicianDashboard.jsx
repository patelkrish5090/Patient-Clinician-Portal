import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Notification from '../components/Notification';

function ClinicianDashboard() {
  const [queries, setQueries] = useState([
    {
      _id: '1',
      question: 'What are the symptoms of COVID-19?',
      aiResponse: 'Common symptoms include fever, cough, and shortness of breath.',
      status: 'pending',
    },
    {
      _id: '2',
      question: 'How to manage high blood pressure?',
      aiResponse: 'Maintain a healthy diet, exercise regularly, and take prescribed medications.',
      status: 'pending',
    },
  ]);
  const [notification, setNotification] = useState(null);

  const handleVerify = (queryId, response) => {
    setQueries((prevQueries) =>
      prevQueries.map((q) =>
        q._id === queryId ? { ...q, clinicianResponse: response, status: 'verified' } : q
      )
    );
    setNotification({ message: 'Query verified successfully', type: 'success' });
  };

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
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Welcome back</h1>
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    General Medicine
                  </span>
                </div>
                <p className="text-gray-400">Monitor and verify patient queries.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-white">Pending Queries</h3>
                    <p className="text-3xl md:text-4xl text-blue-400">{queries.length}</p>
                    <p className="text-gray-400 text-sm">Awaiting review</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-white">Today’s Reviews</h3>
                    <p className="text-3xl md:text-4xl text-blue-400">0</p>
                    <p className="text-gray-400 text-sm">Verified today</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-white">Average Review Time</h3>
                    <p className="text-3xl md:text-4xl text-blue-400">1.2s</p>
                    <p className="text-gray-400 text-sm">Per query</p>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">Queries to Review</h3>
                  <div className="space-y-4">
                    {queries.map((query) => (
                      <div key={query._id} className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                        <p className="text-lg font-semibold text-white">{query.question}</p>
                        <p className="text-gray-400 mt-1">{query.aiResponse}</p>
                        <textarea
                          placeholder="Enter your response"
                          className="w-full h-48 md:h-64 p-3 mt-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                          onChange={(e) => (query.tempResponse = e.target.value)}
                        />
                        <button
                          onClick={() => handleVerify(query._id, query.tempResponse || query.aiResponse)}
                          className="mt-2 bg-green-500 text-white p-3 rounded-lg text-lg hover:bg-green-600 w-full"
                        >
                          Verify
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            }
          />
          <Route
            path="/review"
            element={
              <div className="flex-1 flex flex-col justify-start pt-8">
                <div className="bg-gray-800 p-4 rounded-lg w-full max-w-xl md:max-w-2xl mx-auto">
                  <h3 className="text-lg font-semibold text-white mb-4">All Queries to Review</h3>
                  <div className="space-y-4">
                    {queries.map((query) => (
                      <div key={query._id} className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                        <p className="text-lg font-semibold text-white">{query.question}</p>
                        <p className="text-gray-400 mt-1">{query.aiResponse}</p>
                        <textarea
                          placeholder="Enter your response"
                          className="w-full h-48 md:h-64 p-3 mt-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                          onChange={(e) => (query.tempResponse = e.target.value)}
                        />
                        <button
                          onClick={() => handleVerify(query._id, query.tempResponse || query.aiResponse)}
                          className="mt-2 bg-green-500 text-white p-3 rounded-lg text-lg hover:bg-green-600 w-full"
                        >
                          Verify
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default ClinicianDashboard;