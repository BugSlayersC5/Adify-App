import React from 'react';
import { Heart, Eye, MessageCircle, Search, TrendingUp, ShoppingBag } from 'lucide-react';
import AdCard from '../components/AdCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// --- Dummy Ad Data ---
// You can move this to a separate file (e.g., src/data/dummyAds.js) and import it if your data grows
const dummyAds = [
  {
    id: 1,
    title: "iPhone 13 Pro (Blue, 128GB)",
    category: "Phones",
    location: "Accra",
    price: 7000,
    status: "approved",
    image:
      "https://images.unsplash.com/photo-1629235472877-a72061448b11?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    vendorName: "GadgetHub",
    createdAt: "2024-06-01T10:00:00Z",
    views: 800,
    likes: 110,
  },
  {
    id: 'ad2',
    title: "Canon EOS R5 Camera",
    category: "Electronics",
    location: "Kumasi",
    price: 25000,
    status: "approved",
    image:
      "https://images.unsplash.com/photo-1593539138768-450ad5232c1c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    vendorName: "ProLens Studio",
    createdAt: "2024-06-05T14:30:00Z",
    views: 900,
    likes: 110,
  },
  {
    id: 'ad3',
    title: "Modern 3-Seater Sofa",
    category: "Furniture",
    location: "Accra",
    price: 4500,
    status: "approved",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    vendorName: "Home Decor Co.",
    createdAt: "2024-06-10T09:00:00Z",
    views: 650, // Added views for consistency
    likes: 100,
  },
  {
    id: 'ad4',
    title: "Gaming PC (Ryzen 7, RTX 3070)",
    category: "Computers",
    location: "Tema",
    price: 10000,
    status: "approved",
    image:
      "https://images.unsplash.com/photo-1603481588273-2f99ffb9fd80?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    vendorName: "Apex Gaming",
    createdAt: "2024-06-12T11:45:00Z",
    views: 400,
    likes: 70,
  },
  {
    id: 'ad5',
    title: "Vintage Bicycle",
    category: "Sports & Outdoors",
    location: "Takoradi",
    price: 1200,
    status: "approved",
    image:
      "https://images.unsplash.com/photo-1579208030886-05c29013c77e?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    vendorName: "Bike Enthusiast",
    createdAt: "2024-06-15T16:00:00Z",
    views: 200,
    likes: 130,
  },
  {
    id: 'ad6',
    title: "Luxury Wristwatch",
    category: "Jewelry",
    location: "Accra",
    price: 8500,
    status: "approved",
    image:
      "https://images.unsplash.com/photo-1622616238323-2871b6d13d7b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    vendorName: "Elite Timepieces",
    createdAt: "2024-06-18T08:00:00Z",
    views: 900,
    likes: 110,
  },
  { // Added one more for more variety in "Popular Ads" and "Recommended"
    id: 'ad7',
    title: "Electric Guitar (Red)",
    category: "Musical Instruments",
    location: "Accra",
    price: 1800,
    status: "approved",
    image: "https://images.unsplash.com/photo-1549298375-714083a2468d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    vendorName: "Guitar World",
    createdAt: "2024-06-20T11:00:00Z",
    views: 750,
    likes: 150,
  },
];

export default function UserDashboard() {
  const user = { username: 'Jessica Aning' };

  // Adjusting static stats value to match the dummy data available
  // Using .filter(Boolean) as a safety net against any unexpected undefined/null entries
  const stats = [
    {
      title: 'Recently Viewed',
      value: dummyAds.slice(0, 3).filter(Boolean).length, // Corresponds to first 3 dummy ads
      icon: Eye,
      color: 'bg-blue-500',
    },
    {
      title: 'Favorite Ads',
      value: dummyAds.filter(ad => ad && ad.likes > 100).filter(Boolean).length, // Ads with more than 100 likes
      icon: Heart,
      color: 'bg-red-500',
    },
    {
      title: 'Saved Searches',
      value: 5, // Static value as there's no dummy data for this
      icon: Search,
      color: 'bg-green-500',
    },
    {
      title: 'Messages',
      value: 12, // Static value as there's no dummy data for this
      icon: MessageCircle,
      color: 'bg-purple-500',
    },
  ];

  // Filter dummy ads for different sections
  // Using .filter(Boolean) on each array before mapping
  const recentlyViewedAds = dummyAds.slice(0, 3).filter(Boolean); // Take the first 3 for recently viewed
  const popularAds = dummyAds.filter(ad => ad && ad.likes > 100).slice(0, 4).filter(Boolean); // Ads with more than 100 likes
  const recommendedAds = [...dummyAds].sort(() => 0.5 - Math.random()).slice(0, 6).filter(Boolean); // Random selection

  return (
    <section className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <Navbar />
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
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
                <div key={stat.title} className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold">
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
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-8">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex items-center justify-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                  <Search className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-blue-700 dark:text-blue-300 font-medium">
                    Search Ads
                  </span>
                </button>

                <button className="flex items-center justify-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                  <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span className="text-green-700 dark:text-green-300 font-medium">
                    Trending Now
                  </span>
                </button>

                <button className="flex items-center justify-center space-x-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
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
                <h2 className="text-2xl font-bold">
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
                <h2 className="text-2xl font-bold">
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
                <h2 className="text-2xl font-bold">
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
      <Footer />
    </section>
  );
}