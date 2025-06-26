import { Link } from 'react-router';
import { Home, ArrowLeft, Search } from 'lucide-react';
import  Notfound from '../assets/notfound.jpg';
export default function NotFoundPage () {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        {/* Content */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-400 mb-6">
            Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <Link
            to="/"
            className="btn-primary w-full flex items-center justify-center space-x-2"
          >
            <Home className="h-4 w-4" />
            <span>Go to Homepage</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="btn-secondary w-full flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Help Links */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-sm text-gray-400 mb-4">
            Need help? Try these popular pages:
          </p>
          <div className="space-y-2">
            <Link
              to="/"
              className="block text-blue-400 hover:text-gray-300 text-sm"
            >
              Browse All Ads
            </Link>
            <Link
              to="/contact"
              className="block text-blue-400 hover:text-blue-300 text-sm"
            >
              Contact Support
            </Link>
            <Link
              to="/signup"
              className="block text-blue-400 hover:text-gray-300 text-sm"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

 