import { useState } from 'react';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa'; // Importing microphone icons

function QueryForm({ setQueries }) {
  const [question, setQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const newQuery = {
        id: String(Math.random()),
        question,
        aiResponse: 'This is a sample AI response.',
        status: 'pending',
      };
      setQueries((prev) => [...prev, newQuery]);
      setAiResponse(newQuery.aiResponse);
      setQuestion('');
      setIsLoading(false);
    }, 1000);
  };

  const startListening = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuestion(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl mx-auto">
      <h3 className="text-xl font-semibold text-white mb-6">Ask a New Question</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a health question..."
            className="w-full h-32 p-4 bg-gray-700 border border-gray-600 rounded-lg text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            rows="4"
            required
          />
          <button
            type="button"
            onClick={startListening}
            className={`absolute right-3 bottom-3 p-2 rounded-full text-white transition-colors ${
              isListening
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
            disabled={isListening}
          >
            {isListening ? (
              <FaMicrophoneSlash className="h-6 w-6 animate-pulse" />
            ) : (
              <FaMicrophone className="h-6 w-6" />
            )}
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg text-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <svg
              className="animate-spin h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            'Submit Query'
          )}
        </button>
        {aiResponse && (
          <div className="mt-4 p-4 bg-gray-700 rounded-lg border border-gray-600">
            <p className="text-gray-400">{aiResponse}</p>
            <span className="inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold bg-yellow-500 text-black">
              Not Verified
            </span>
          </div>
        )}
      </form>
    </div>
  );
}

export default QueryForm;