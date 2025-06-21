import { Link } from 'react-router';
import { Eye, Heart, MapPin, Calendar } from 'lucide-react';

export default function AdCard ({ ad, showActions = false, onEdit, onDelete }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="card group overflow-hidden">
      <div className="relative">
        <img
          src={ad.image}
          alt={ad.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ad.status)}`}>
            {ad.status.charAt(0).toUpperCase() + ad.status.slice(1)}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            {ad.category}
          </span>
        </div>
        <div className="absolute bottom-3 right-3 flex items-center space-x-2 text-white">
          {ad.views && (
            <div className="flex items-center space-x-1 bg-black/50 px-2 py-1 rounded-full">
              <Eye className="h-3 w-3" />
              <span className="text-xs">{ad.views}</span>
            </div>
          )}
          {ad.likes && (
            <div className="flex items-center space-x-1 bg-black/50 px-2 py-1 rounded-full">
              <Heart className="h-3 w-3" />
              <span className="text-xs">{ad.likes}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
            {ad.title}
          </h3>
          <span className="text-xl font-bold text-blue-600">
            {formatPrice(ad.price)}
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
          {ad.description}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center space-x-1">
            <MapPin className="h-3 w-3" />
            <span>{ad.location || 'Location not specified'}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(ad.createdAt)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            by {ad.vendorName}
          </span>

          {showActions ? (
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit && onEdit(ad.id)}
                className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md text-sm hover:bg-blue-200 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete && onDelete(ad.id)}
                className="px-3 py-1 bg-red-100 text-red-600 rounded-md text-sm hover:bg-red-200 transition-colors"
              >
                Delete
              </button>
            </div>
          ) : (
            <Link
              to={`/ad/${ad.id}`}
              className="px-4 py-1 bg-blue-100 text-blue-600 rounded-md text-sm hover:bg-blue-200 transition-colors"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

