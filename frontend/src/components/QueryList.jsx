function QueryList({ queries }) {
  return (
    <div className="space-y-6">
      {queries.map((query) => (
        <div key={query.id} className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <p className="text-lg md:text-xl font-semibold text-white">{query.question}</p>
          {query.aiResponse && <p className="text-gray-400 mt-3">{query.aiResponse}</p>}
          {query.clinicianResponse && (
            <p className="text-green-400 font-medium mt-3">{query.clinicianResponse}</p>
          )}
          <span
            className={`inline-block mt-3 px-4 py-1 rounded-full text-sm font-semibold ${
              query.status === 'verified' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'
            }`}
          >
            {query.status === 'verified'
              ? `Verified by: ${query.verifiedBy || 'Dr. Name'}` // Display clinician's name
              : 'Not Verified'}
          </span>
        </div>
      ))}
    </div>
  );
}

export default QueryList;