import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, MapPin, Calendar, Eye, Heart, Share2, Flag, User, Phone, Mail } from 'lucide-react';
import useSWR from 'swr';
import { apiFetcher } from '../../api/client';

const AdDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  const { data, isLoading, error } = useSWR(`/adverts/${id}`, apiFetcher);

  const handleLike = () => {
    if (!ad) return;
    const newLikeCount = isLiked ? (data.likes || 0) - 1 : (data.likes || 0) + 1;
    setIsLiked(!isLiked);
    setAd({ ...ad, likes: newLikeCount });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard');
  };

  const handleReport = () => {
    alert("Ad reported. We'll review it shortly.");
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ad not found
          </h2>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Back to Browse
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card overflow-hidden mb-6">
              <img
                src={data.images[0]}
                alt={data.title}
                className="w-full h-96 object-cover"
              />
            </div>

            <div className="card mb-6">
              <div className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-0">
                    {data.title}
                  </h1>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-blue-600">
                      {formatPrice(data.price)}
                    </span>
                    <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 mt-1">
                      <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 px-2 py-1 rounded-full text-sm">
                        {data.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{data.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Posted on {formatDate(data.createdAt)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{data.views} views</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4" />
                    <span>{data.likes} likes</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleLike}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${isLiked
                      ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                    <span>{isLiked ? 'Liked' : 'Like'}</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </button>

                  <button
                    onClick={handleReport}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    <Flag className="h-4 w-4" />
                    <span>Report</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Description
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {data.description}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card mb-6">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Seller Information
                </h3>

                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {data.vendorName}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Member since 2023
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full btn-primary flex items-center justify-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>Call Seller</span>
                  </button>

                  <button className="w-full btn-secondary flex items-center justify-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>Send Message</span>
                  </button>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Response Rate</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">95%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-gray-600 dark:text-gray-400">Response Time</span>
                    <span className="text-gray-900 dark:text-white font-medium">~2 hours</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Safety Tips
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Meet in a public place</li>
                  <li>• Don't share personal information</li>
                  <li>• Inspect the item before payment</li>
                  <li>• Use secure payment methods</li>
                  <li>• Trust your instincts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdDetailPage;
