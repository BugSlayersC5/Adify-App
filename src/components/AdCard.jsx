import { Link } from "react-router";
import { MapPin, DollarSign, Eye, Heart, Edit, Trash2 } from "lucide-react";

export default function AdCard({ ad, viewMode = "grid", onEdit, onDelete }) {
  if (!ad) {
    return null; // Or a placeholder if no ad data is provided
  }

  // Determine card styling based on viewMode
  const cardClasses =
    viewMode === "grid"
      ? "bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
      : "flex flex-col sm:flex-row bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden";

  const imageClasses =
    viewMode === "grid"
      ? "w-full h-48 object-cover"
      : "w-full sm:w-48 h-48 sm:h-auto object-cover sm:rounded-l-lg sm:rounded-t-none rounded-t-lg";

  const contentClasses =
    viewMode === "grid" ? "p-4" : "p-4 flex-1 flex flex-col justify-between";

  return (
    <div className={cardClasses}>
      <Link to={`/ad/${ad.id}`}>
        <img src={ad.images[0]} alt={ad.title} className={imageClasses} />
      </Link>
      <div className={contentClasses}>
        <div>
          <Link to={`/ad/${ad.id}`}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-2">
              {ad.title}
            </h3>
          </Link>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
            {ad.description}
          </p>
        </div>

        <div className="flex items-center justify-between text-gray-700 dark:text-gray-300 mb-3">
          <span className="flex items-center text-blue-600 dark:text-blue-400 font-bold text-xl">
            <DollarSign className="h-5 w-5 mr-1" />
            {ad.price.toLocaleString()}
          </span>
          <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Eye className="h-4 w-4 mr-1" /> {ad.views || 0}
          </span>
        </div>

        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{ad.location}</span>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Posted: {new Date(ad.createdAt).toLocaleDateString()}
          </span>
          <button
            className="p-1 rounded-full text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Add to favorites"
          >
            <Heart className="h-5 w-5" />
          </button>
        </div>

        <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
          {onEdit && ( // Only render if onEdit prop is provided
            <button
              onClick={() => onEdit(ad.id)}
              className="flex items-center px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 text-sm font-semibold"
              aria-label={`Edit ${ad.title}`}
            >
              <Edit size={16} className="mr-1" /> Edit
            </button>
          )}
          {onDelete && ( // Only render if onDelete prop is provided
            <button
              onClick={() => onDelete(ad.id)}
              className="flex items-center px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 text-sm font-semibold"
              aria-label={`Delete ${ad.title}`}
            >
              <Trash2 size={16} className="mr-1" /> Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
