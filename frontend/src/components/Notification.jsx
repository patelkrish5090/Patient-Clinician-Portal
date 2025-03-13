import { useEffect, useState } from 'react';

function Notification({ message, type = 'success', onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg text-white transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
      } ${type === 'success' ? 'bg-green-500' : 'bg-blue-500'} w-11/12 md:w-auto`}
    >
      {message}
    </div>
  );
}

export default Notification;