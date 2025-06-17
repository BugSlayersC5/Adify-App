// AdCard

import { Link } from 'react-router';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { formatDate } from '../utils/formatDate';

export default function AdCard() {
  return (
   <>
   {/* One Card that can be used in many places */}
    <div className="bg-white shadow-md rounded-lg p-4">
        <img src="https://via.placeholder.com/150" alt="Ad" className="w-full h-48 object-cover rounded-t-lg mb-4" />
        <h2 className="text-xl font-semibold mb-2">Ad Title</h2>
        <p className="text-gray-700 mb-4">This is a brief description of the ad.</p>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">Posted on {formatDate(new Date())}</span>
          <Link to="/ad-details" className="text-blue-500 hover:underline">View Details</Link>
        </div>
     </div>
   
   </>
  );
}