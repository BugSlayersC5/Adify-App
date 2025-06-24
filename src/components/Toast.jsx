// Toast
import { FaTimes } from 'react-icons/fa';

export default function Toast({ message, onClose }) {
    return (
        <div className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg flex items-center space-x-2">
        <span>{message}</span>
        <button onClick={onClose} className="text-white hover:text-gray-200">
            <FaTimes />
        </button>
        </div>
    );
    }