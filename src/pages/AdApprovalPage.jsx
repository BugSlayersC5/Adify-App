import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Eye, Search, Filter, Sun, Moon, Info } from 'lucide-react'; // Import all necessary Lucide icons
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

// --- 1. staticAdsData (defined locally) ---
const staticAds = [
  {
    id: 'ad-001',
    title: 'Vintage Leather Jacket',
    description: 'A classic vintage leather jacket, well-preserved and perfect for all seasons. Genuine leather.',
    image: 'https://images.unsplash.com/photo-1591047139829-2cab45371174?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcwODN8MHwxfHNlYXJjaHwxNXx8dmFydmludlJvcHxlbnwwfHx8fDE3MTc3NzEzMjJ8MA%3D%3D&ixlib=rb-4.0.3&q=80&w=1080',
    vendorName: 'Leather Treasures Co.',
    location: 'Accra, Ghana',
    price: 180.00,
    category: 'Apparel',
    status: 'pending',
    createdAt: '2025-06-20T10:00:00Z',
    views: 125,
  },
  {
    id: 'ad-002',
    title: 'Modern Minimalist Desk',
    description: 'Sleek design computer desk, ideal for home office. Made from sustainable wood.',
    image: 'https://images.unsplash.com/photo-1549448833-25ed59223141?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcwODN8MHwxfHNlYXJjaHwyMHx8dmFydmludlJvcHxlbnwwfHx8fDE3MTc3NzEzMjJ8MA%3D%3D&ixlib=rb-4.0.3&q=80&w=1080',
    vendorName: 'Home & Office Designs',
    location: 'Kumasi, Ghana',
    price: 350.00,
    category: 'Furniture',
    status: 'approved',
    createdAt: '2025-06-18T14:30:00Z',
    views: 560,
  },
  {
    id: 'ad-003',
    title: 'Professional Camera Kit',
    description: 'Canon EOS R5 with RF 24-105mm F4 L IS USM Lens. Used once, like new.',
    image: 'https://images.unsplash.com/photo-1502920872659-3d02b85d9d7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcwODN8MHwxfHNlYXJjaHwxOHx8dmFydmludlJvcHxlbnwwfHx8fDE3MTc3NzEzMjJ8MA%3D%3D&ixlib=rb-4.0.3&q=80&w=1080',
    vendorName: 'Pro Gear Store',
    location: 'Tamale, Ghana',
    price: 3200.00,
    category: 'Electronics',
    status: 'pending',
    createdAt: '2025-06-19T09:15:00Z',
    views: 89,
  },
  {
    id: 'ad-004',
    title: 'Handmade Ceramic Vase',
    description: 'Unique handcrafted vase, perfect as a decorative piece for any home.',
    image: 'https://images.unsplash.com/photo-1578330756711-20d0f4132dd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcwODN8MHwxfHNlYXJjaHw3fHx2YXJ2aW5lcm9wYSUyMHZhc2V8ZW58MHx8fHwxNzE3Nzc1MjQ3fDA%3D&ixlib=rb-4.0.3&q=80&w=1080',
    vendorName: 'Artisan Crafts',
    location: 'Cape Coast, Ghana',
    price: 75.00,
    category: 'Home Decor',
    status: 'rejected',
    createdAt: '2025-06-17T11:00:00Z',
    views: 200,
  },
  {
    id: 'ad-005',
    title: 'Electric Mountain Bike',
    description: 'High-performance e-bike for off-road adventures. Long battery life.',
    image: 'https://images.unsplash.com/photo-1627914878437-db7b3f960f25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcwODN8MHwxfHNlYXJjaHw0fHxlbGVjdHJpYyUyMGJpa2V8ZW58MHx8fHwxNzE3Nzc1MzQxfDA%3D&ixlib=rb-4.0.3&q=80&w=1080',
    vendorName: 'Bike Adventures',
    location: 'Takoradi, Ghana',
    price: 1500.00,
    category: 'Sports',
    status: 'pending',
    createdAt: '2025-06-15T08:00:00Z',
    views: 310,
  },
  {
    id: 'ad-006',
    title: 'Gourmet Coffee Beans',
    description: 'Freshly roasted Ethiopian Yirgacheffe coffee beans. 1kg bag.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcwODN8MHwxfHNlYXJjaHw2fHxjb2ZmZWUlMjBiZWFuc3xlbnwwfHx8fDE3MTc3NzUzNzF8MA%3D%3D&ixlib=rb-4.0.3&q=80&w=1080',
    vendorName: 'Bean Masters',
    location: 'Ho, Ghana',
    price: 25.00,
    category: 'Food & Drink',
    status: 'approved',
    createdAt: '2025-06-12T16:00:00Z',
    views: 700,
  },
  {
    id: 'ad-007',
    title: 'Vintage Record Player',
    description: 'Fully functional retro record player with built-in speakers. Great sound quality.',
    image: 'https://images.unsplash.com/photo-1594121703227-2c90f23d4b68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcwODN8MHwxfHNlYXJjaHw4fHx2aW50YWdlJTIwcmVjb3JkJTIwcGxheWVyfGVufDB8fHx8MTcxNzc3NTQzMHww%3D&ixlib=rb-4.0.3&q=80&w=1080',
    vendorName: 'Audio Nostalgia',
    location: 'Koforidua, Ghana',
    price: 280.00,
    category: 'Electronics',
    status: 'pending',
    createdAt: '2025-06-10T11:45:00Z',
    views: 95,
  },
  {
    id: 'ad-008',
    title: 'Organic Vegetable Box Subscription',
    description: 'Weekly delivery of fresh, organic vegetables from local farms.',
    image: 'https://images.unsplash.com/photo-1542838183-acccf7c897f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcwODN8MHwxfHNlYXJjaHwxMnx8b3JnYW5pYyUyMHZlZ2V0YWJsZXMlMjBib3h8ZW58MHx8fHwxNzE3Nzc1NDU4fDA%3D&ixlib=rb-4.0.3&q=80&w=1080',
    vendorName: 'Green Harvest Farms',
    location: 'Sunyani, Ghana',
    price: 50.00,
    category: 'Food & Drink',
    status: 'pending',
    createdAt: '2025-06-08T07:00:00Z',
    views: 45,
  },
];

// --- 2. Modal Component (defined locally) ---
const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className={`bg-gray-800 text-white rounded-lg shadow-xl relative w-full ${sizeClasses[size]}`}>
        <div className="flex justify-between items-center border-b border-gray-700 p-4">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- 3. MessageBox Component (defined locally) ---
const MessageBox = ({ isOpen, onClose, title, message, type = 'info' }) => {
  if (!isOpen) return null;

  let icon, bgColor, textColor, borderColor;
  switch (type) {
    case 'success':
      icon = <CheckCircle className="h-6 w-6" />;
      bgColor = 'bg-green-600';
      textColor = 'text-white';
      borderColor = 'border-green-700';
      break;
    case 'error':
      icon = <XCircle className="h-6 w-6" />;
      bgColor = 'bg-red-600';
      textColor = 'text-white';
      borderColor = 'border-red-700';
      break;
    default:
      icon = <Info className="h-6 w-6" />;
      bgColor = 'bg-blue-600';
      textColor = 'text-white';
      borderColor = 'border-blue-700';
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`rounded-lg shadow-lg relative w-full max-w-sm p-6 ${bgColor} ${textColor} border-t-4 ${borderColor}`}>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            {icon}
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
            <XCircle className="h-6 w-6" />
          </button>
        </div>
        <p className="text-sm">{message}</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white bg-opacity-20 rounded-md hover:bg-opacity-30 transition-colors text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};



// --- 6. ThemeToggle Component (defined locally) ---
const ThemeToggle = () => {
  // In a real app, this would toggle a state/context for dark mode
  const isDarkMode = true; // For static demo, assume dark mode is active

  const toggleTheme = () => {
    // Implement actual theme toggling logic here, e.g., via context or state management
    // For this static demo, we'll just show a message.
    console.log("Theme toggle clicked! (Functionality not active in static demo)");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-800 text-yellow-400 hover:bg-gray-700 transition-colors shadow-md"
      aria-label="Toggle theme"
    >
      {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};

// --- 7. AdApprovalPage Component (main logic) ---
const AdApprovalPage = () => {
  const [ads, setAds] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('pending');
  const [selectedAd, setSelectedAd] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [messageBox, setMessageBox] = useState({ isOpen: false, title: '', message: '', type: 'info' });

  useEffect(() => {
    // Simulate API call for static data
    const loadAds = () => {
      setLoading(true);
      setTimeout(() => {
        setAds(staticAds); // Use the locally defined staticAds
        setLoading(false);
      }, 500); // Simulate network delay
    };
    loadAds();
  }, []);

  useEffect(() => {
    const filterAds = () => {
      let filtered = ads;

      // Filter by status
      if (statusFilter !== 'all') {
        filtered = filtered.filter(ad => ad.status === statusFilter);
      }

      // Filter by search query
      if (searchQuery) {
        filtered = filtered.filter(ad =>
          ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ad.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ad.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ad.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setFilteredAds(filtered);
    };
    filterAds();
  }, [ads, searchQuery, statusFilter]);

  const handleStatusUpdate = (adId, status) => {
    console.log(`Simulating update for Ad ID: ${adId}, new status: ${status}`);
    setAds(prev => prev.map(ad =>
      ad.id === adId ? { ...ad, status } : ad
    ));
    setMessageBox({
      isOpen: true,
      title: 'Status Updated',
      message: `Ad status updated to ${status.charAt(0).toUpperCase() + status.slice(1)}!`,
      type: 'success'
    });
    setModalOpen(false);
    setSelectedAd(null);
  };

  const openAdModal = (ad) => {
    setSelectedAd(ad);
    setModalOpen(true);
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

  const statusCounts = {
    all: ads.length,
    pending: ads.filter(ad => ad.status === 'pending').length,
    approved: ads.filter(ad => ad.status === 'approved').length,
    rejected: ads.filter(ad => ad.status === 'rejected').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Advertisement Approval
          </h1>
          <p className="text-gray-400">
            Review and approve advertisements before they go live
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-gray-800 rounded-lg shadow mb-8">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search ads by title, vendor, or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white"
                >
                  <option value="all">All Status ({statusCounts.all})</option>
                  <option value="pending">Pending ({statusCounts.pending})</option>
                  <option value="approved">Approved ({statusCounts.approved})</option>
                  <option value="rejected">Rejected ({statusCounts.rejected})</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { key: 'all', label: 'Total Ads', count: statusCounts.all, color: 'bg-blue-600 text-white dark:bg-blue-800' },
            { key: 'pending', label: 'Pending', count: statusCounts.pending, color: 'bg-yellow-600 text-white dark:bg-yellow-800' },
            { key: 'approved', label: 'Approved', count: statusCounts.approved, color: 'bg-green-600 text-white dark:bg-green-800' },
            { key: 'rejected', label: 'Rejected', count: statusCounts.rejected, color: 'bg-red-600 text-white dark:bg-red-800' },
          ].map((status) => (
            <button
              key={status.key}
              onClick={() => setStatusFilter(status.key)}
              className={`p-4 rounded-lg border transition-colors ${statusFilter === status.key
                ? 'border-blue-500 bg-blue-700 text-white'
                : 'border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-300'
                }`}
            >
              <div className="text-2xl font-bold text-white">
                {status.count}
              </div>
              <div className="text-sm text-gray-400">
                {status.label}
              </div>
            </button>
          ))}
        </div>

        {/* Ads Table */}
        {filteredAds.length === 0 ? (
          <div className="bg-gray-800 rounded-lg shadow">
            <div className="p-12 text-center">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                No ads found
              </h3>
              <p className="text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-4 px-6 font-medium text-white">Ad Details</th>
                    <th className="text-left py-4 px-6 font-medium text-white">Vendor</th>
                    <th className="text-left py-4 px-6 font-medium text-white">Price</th>
                    <th className="text-left py-4 px-6 font-medium text-white">Status</th>
                    <th className="text-left py-4 px-6 font-medium text-white">Date</th>
                    <th className="text-left py-4 px-6 font-medium text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAds.map((ad) => (
                    <tr key={ad.id} className="border-b border-gray-700 hover:bg-gray-700">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-4">
                          <img
                            src={ad.image}
                            alt={ad.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="font-medium text-white line-clamp-1">
                              {ad.title}
                            </h3>
                            <p className="text-sm text-gray-400 line-clamp-1">
                              {ad.description}
                            </p>
                            <span className="inline-block bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs mt-1">
                              {ad.category}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium text-white">
                            {ad.vendorName}
                          </p>
                          <p className="text-sm text-gray-400">
                            {ad.location}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-lg font-semibold text-white">
                          ${ad.price.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(ad.status)}`}>
                          {ad.status.charAt(0).toUpperCase() + ad.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-400">
                        {new Date(ad.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openAdModal(ad)}
                            className="p-2 text-blue-400 hover:bg-blue-900/20 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>

                          {ad.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleStatusUpdate(ad.id, 'approved')}
                                className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 text-sm"
                                title="Approve"
                              >
                                <CheckCircle className="h-4 w-4" />
                                <span className="hidden sm:inline">Approve</span>
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(ad.id, 'rejected')}
                                className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2 text-sm"
                                title="Reject"
                              >
                                <XCircle className="h-4 w-4" />
                                <span className="hidden sm:inline">Reject</span>
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Ad Detail Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Advertisement Details"
          size="lg"
        >
          {selectedAd && (
            <div className="space-y-6 text-white">
              {/* Image */}
              <div>
                <img
                  src={selectedAd.image}
                  alt={selectedAd.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {selectedAd.title}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    {selectedAd.description}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Category:</span>
                      <span className="text-white">{selectedAd.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Location:</span>
                      <span className="text-white">{selectedAd.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Posted:</span>
                      <span className="text-white">
                        {new Date(selectedAd.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-right mb-4">
                    <span className="text-3xl font-bold text-blue-400">
                      ${selectedAd.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Vendor:</span>
                      <span className="text-white">{selectedAd.vendorName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Views:</span>
                      <span className="text-white">{selectedAd.views || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedAd.status)}`}>
                        {selectedAd.status.charAt(0).toUpperCase() + selectedAd.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {selectedAd.status === 'pending' && (
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
                  <button
                    onClick={() => handleStatusUpdate(selectedAd.id, 'rejected')}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                  >
                    <XCircle className="h-4 w-4" />
                    <span>Reject</span>
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(selectedAd.id, 'approved')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Approve</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </Modal>

        {/* Message Box */}
        <MessageBox
          isOpen={messageBox.isOpen}
          onClose={() => setMessageBox({ ...messageBox, isOpen: false })}
          title={messageBox.title}
          message={messageBox.message}
          type={messageBox.type}
        />
      </div>
    </div>
  );
}

// --- Main App Component (Only this one is exported as default) ---
{
  return (
    // The main container for the app with the desired blue-black background
    <div>
      <Navbar />
      <main className="relative z-10">
        <div className="absolute top-4 right-4 z-20">
          <ThemeToggle />
        </div>
        <AdApprovalPage />
      </main>
      <Footer />
    </div>
  );
}
