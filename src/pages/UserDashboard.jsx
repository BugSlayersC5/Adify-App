import React from 'react';
import { Heart, Eye, MessageCircle, Search, TrendingUp, ShoppingBag } from 'lucide-react';
import AdCard from '../components/AdCard'; // Make sure this path is correct

// --- Dummy Ad Data ---
// You can move this to a separate file (e.g., dummyAds.js) and import it if your data grows
const dummyAds = [
  {
    id: 1,
    title: "iPhone 13 Pro",
    category: "Phones",
    location: "Accra",
    price: 7000,
    status: "approved",
    image:
      "https://img.freepik.com/free-photo/smiling-couple-viewing-pictures-camera_53876-14440.jpg",
    vendorName: "GadgetHub",
    createdAt: "2024-06-01T10:00:00Z",
    views: 800,
    likes: 110,
  },
  {
    id: 'ad2',
     title: "iPhone 13 Pro",
    category: "Phones",
    location: "Accra",
    price: 7000,
    status: "approved",
    image:
      "https://img.freepik.com/free-photo/smiling-couple-viewing-pictures-camera_53876-14440.jpg",
    vendorName: "GadgetHub",
    createdAt: "2024-06-01T10:00:00Z",
    views: 900,
    likes: 110,
  },
  {
    id: 'ad3',
    title: "iPhone 13 Pro",
    category: "Phones",
    location: "Accra",
    price: 7000,
    status: "approved",
    image:
      "https://img.freepik.com/free-photo/smiling-couple-viewing-pictures-camera_53876-14440.jpg",
    vendorName: "GadgetHub",
    createdAt: "2024-06-01T10:00:00Z",
    likes:100,
  },
  {
    id: 'ad4',
    title: "iPhone 13 Pro",
    category: "Phones",
    location: "Accra",
    price: 7000,
    status: "approved",
    image:
      "https://img.freepik.com/free-photo/smiling-couple-viewing-pictures-camera_53876-14440.jpg",
    vendorName: "GadgetHub",
    createdAt: "2024-06-01T10:00:00Z",
    views: 400,
    likes: 70,
  },
  {
    id: 'ad5',
    title: "iPhone 13 Pro",
    category: "Phones",
    location: "Accra",
    price: 7000,
    status: "approved",
    image:
      "https://img.freepik.com/free-photo/smiling-couple-viewing-pictures-camera_53876-14440.jpg",
    vendorName: "GadgetHub",
    createdAt: "2024-06-01T10:00:00Z",
    views: 200,
    likes: 130,
   
  },
  {
    id: 'ad6',
     title: "iPhone 13 Pro",
    category: "Phones",
    location: "Accra",
    price: 7000,
    status: "approved",
    image:
      "https://img.freepik.com/free-photo/smiling-couple-viewing-pictures-camera_53876-14440.jpg",
    vendorName: "GadgetHub",
    createdAt: "2024-06-01T10:00:00Z",
    views: 900,
    likes: 110,
  },
];

export default function UserDashboard() {
  const user = { username: 'Jessica Aning' };

  // Adjusting static stats value to match the dummy data available
  const stats = [
    {
      title: 'Recently Viewed',
      value: dummyAds.slice(0, 3).length, // Corresponds to first 3 dummy ads
      icon: Eye,
      color: 'bg-blue-500',
    },
    {
      title: 'Favorite Ads',
      value: dummyAds.filter(ad => ad.likes > 100).length, // Ads with more than 100 likes
      icon: Heart,
      color: 'bg-red-500',
    },
    {
      title: 'Saved Searches',
      value: 5,
      icon: Search,
      color: 'bg-green-500',
    },
    {
      title: 'Messages',
      value: 12,
      icon: MessageCircle,
      color: 'bg-purple-500',
    },
  ];

  // Filter dummy ads for different sections
  const recentlyViewedAds = dummyAds.slice(0, 3); // Take the first 3 for recently viewed
  const popularAds = dummyAds.filter(ad => ad.likes > 100).slice(0, 4); // Ads with more than 100 likes
  const recommendedAds = [...dummyAds].sort(() => 0.5 - Math.random()).slice(0, 6); // Random selection

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.username}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's what's happening with your account today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.title} className="card">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="card mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                <Search className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-blue-700 dark:text-blue-300 font-medium">
                  Search Ads
                </span>
              </button>
              
              <button className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="text-green-700 dark:text-green-300 font-medium">
                  Trending Now
                </span>
              </button>
              
              <button className="flex items-center space-x-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                <ShoppingBag className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <span className="text-purple-700 dark:text-purple-300 font-medium">
                  My Purchases
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Recently Viewed Ads */}
        {recentlyViewedAds.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Recently Viewed
              </h2>
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                View All
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentlyViewedAds.map((ad) => (
                <AdCard key={ad.id} ad={ad} />
              ))}
            </div>
          </div>
        )}

        {/* Popular Ads */}
        {popularAds.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Popular Ads
              </h2>
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                View All
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularAds.map((ad) => (
                <AdCard key={ad.id} ad={ad} />
              ))}
            </div>
          </div>
        )}

        {/* Recommended for You */}
        {recommendedAds.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Recommended for You
              </h2>
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                View All
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedAds.map((ad) => (
                <AdCard key={ad.id} ad={ad} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}