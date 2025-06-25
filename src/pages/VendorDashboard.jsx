import { useState } from 'react';
// Changed Link import from 'react-router' to 'react-router-dom'
// as 'react-router' is generally for lower-level routing primitives
// and 'Link' usually comes from 'react-router-dom' for web apps.
import { Link } from 'react-router-dom';
import {
  PlusCircle, Eye, DollarSign, TrendingUp,
  Edit, CheckCircle, Clock, XCircle
} from 'lucide-react';
import Footer from '../components/Footer';
import Navbar from '../components/NavBar'; // This component will NOT be changed
import AdCard from '../components/AdCard';

export default function VendorDashboard() {
  // Static stats data for UI preview
  const statCards = [
    {
      title: 'Total Ads',
      value: 12,
      icon: PlusCircle,
      color: 'bg-blue-500',
      change: '+2 this week',
    },
    {
      title: 'Total Views',
      value: '3,450',
      icon: Eye,
      color: 'bg-green-500',
      change: '+15% this month',
    },
    {
      title: 'Potential Earnings',
      value: '$1,200',
      icon: DollarSign,
      color: 'bg-yellow-500',
      change: '+8% this month',
    },
    {
      title: 'Performance',
      value: '75%',
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: 'Approval rate',
    },
  ];

  const mockAds = [
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
    },
    {
      id: 2,
      title: "Dell XPS 13",
      category: "Laptops",
      location: "Kumasi",
      price: 9000,
      status: "approved",
      image:
        "https://img.freepik.com/free-photo/smiling-couple-viewing-pictures-camera_53876-14440.jpg",
      vendorName: "TechStore",
      createdAt: "2024-06-03T12:00:00Z",
    },
    {
      id: 3,
      title: "Samsung Galaxy S22",
      category: "Phones",
      location: "Takoradi",
      price: 6000,
      status: "approved",
      image:
        "https://img.freepik.com/free-photo/smiling-couple-viewing-pictures-camera_53876-14440.jpg",
      vendorName: "Mobiles Ghana",
      createdAt: "2024-06-05T15:00:00Z",
    },
    {
      id: 4,
      title: "Used Toyota Corolla",
      category: "Vehicles",
      location: "Accra",
      price: 45000,
      status: "approved",
      image:
        "https://img.freepik.com/free-photo/smiling-couple-viewing-pictures-camera_53876-14440.jpg",
      vendorName: "Car Dealer",
      createdAt: "2024-06-02T09:00:00Z",
    },
    {
      id: 5,
      title: "Used Toyota Corolla",
      category: "Vehicles",
      location: "Accra",
      price: 45000,
      status: "approved",
      image:
        "https://img.freepik.com/free-photo/smiling-couple-viewing-pictures-camera_53876-14440.jpg",
      vendorName: "Car Dealer",
      createdAt: "2024-06-02T09:00:00Z",
    }, {
      id: 6,
      title: "Used Toyota Corolla",
      category: "Vehicles",
      location: "Accra",
      price: 45000,
      status: "approved",
      image:
        "https://img.freepik.com/free-photo/smiling-couple-viewing-pictures-camera_53876-14440.jpg",
      vendorName: "Car Dealer",
      createdAt: "2024-06-02T09:00:00Z",
    }
    // ... repeat for others
  ];

  const statusCards = [
    {
      title: 'Approved',
      value: 9,
      icon: CheckCircle,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
    },
    {
      title: 'Pending',
      value: 2,
      icon: Clock,
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
    },
    {
      title: 'Rejected',
      value: 1,
      icon: XCircle,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-900/20',
    },
  ];

  const [viewMode] = useState("grid"); // or "list"
  const [filteredAds, setFilteredAds] = useState(mockAds); // <- load mock data

  const handleDeleteAd = (id) => {
    setFilteredAds(prev => prev.filter(ad => ad.id !== id));
  };


  return (
    <section className='dark:bg-[#192D64] bg-[#F3F8FD]'>
      <Navbar /> {/* This Navbar component remains unchanged and will still show "Post Ad" */}
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Vendor Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your advertisements and track performance
              </p>
            </div>
            {/* THIS IS THE BUTTON REMOVED FROM THE TOP RIGHT OF THE DASHBOARD HEADER */}
            {/*
            <Link
              to="/vendor/post"
              className="btn-primary flex items-center space-x-2 mt-4 sm:mt-0"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Post New Ad</span>
            </Link>
            */}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <div key={stat.title} className="card">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`${stat.color} p-3 rounded-lg`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                        {stat.change}
                      </span>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {stat.value}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {stat.title}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {statusCards.map((status) => {
              const IconComponent = status.icon;
              return (
                <div
                  key={status.title}
                  className={`p-6 rounded-lg ${status.bgColor} flex items-center space-x-4`}
                >
                  <IconComponent className={`h-8 w-8 ${status.color}`} />
                  <div>
                    <p className={`text-lg font-semibold ${status.color}`}>
                      {status.value}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {status.title}
                    </p>
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
                {/* THIS IS THE LINK REMOVED FROM THE "QUICK ACTIONS" SECTION */}
                {/*
                <Link
                  to="/post-advert"
                  className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                >
                  <PlusCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-blue-700 dark:text-blue-300 font-medium">
                    Post New Ad
                  </span>
                </Link>
                */}

                <Link
                  to="/manage-adverts"
                  className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                >
                  <Edit className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span className="text-green-700 dark:text-green-300 font-medium">
                    Manage Ads
                  </span>
                </Link>

                <button className="flex items-center space-x-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                  <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  <span className="text-purple-700 dark:text-purple-300 font-medium">
                    View Analytics
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Separate section for Ads */}
          <div className="mb-8">
            {filteredAds.length === 0 ? (
              <div className="text-center text-gray-500">No ads found</div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAds.map((ad) => (
                  <AdCard
                    key={ad.id}
                    ad={ad}
                    showActions={true}
                    onEdit={(id) => window.open(`/edit-advert/${id}`, '_blank')}
                    onDelete={handleDeleteAd}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAds.map((ad) => (
                  <AdCard key={ad.id} ad={ad} />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
      <Footer />
    </section>
  );
}