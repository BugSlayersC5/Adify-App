import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {Users, ShoppingBag, Clock, DollarSign, Eye,} from 'lucide-react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import Modal from '../components/Modal';


export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAds: 0,
    totalUsers: 0,
    totalVendors: 0,
    pendingAds: 0,
    approvedAds: 0,
    rejectedAds: 0,
    totalViews: 0,
    totalValue: 0,
  });
  const [recentAds, setRecentAds] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      const allAds = [
        {
          id: '1',
          title: 'Vintage Bicycle',
          price: 120,
          image: 'https://via.placeholder.com/600x400',
          description: 'A well-maintained vintage bicycle in great condition.',
          category: 'Bikes',
          location: 'New York, NY',
          createdAt: '2024-06-01',
          views: 12,
          likes: 4,
          vendorName: 'John Doe',
          status: 'approved',
        },
        {
          id: '2',
          title: 'Smartphone',
          price: 450,
          image: 'https://via.placeholder.com/600x400',
          description: 'Latest model smartphone, barely used.',
          category: 'Electronics',
          location: 'San Francisco, CA',
          createdAt: '2024-05-15',
          views: 35,
          likes: 10,
          vendorName: 'Jane Smith',
          status: 'pending',
        },
      ];

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const vendors = users.filter((u) => u.role === 'vendor');
      const regularUsers = users.filter((u) => u.role === 'user');

      const totalViews = allAds.reduce((sum, ad) => sum + (ad.views || 0), 0);
      const totalValue = allAds.reduce((sum, ad) => sum + ad.price, 0);
      const pendingAds = allAds.filter((ad) => ad.status === 'pending').length;
      const approvedAds = allAds.filter((ad) => ad.status === 'approved').length;
      const rejectedAds = allAds.filter((ad) => ad.status === 'rejected').length;

      setStats({
        totalAds: allAds.length,
        totalUsers: regularUsers.length,
        totalVendors: vendors.length,
        pendingAds,
        approvedAds,
        rejectedAds,
        totalViews,
        totalValue,
      });

      const sortedAds = allAds.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setRecentAds(sortedAds.slice(0, 5));
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickApproval = async (adId, status) => {
    console.log(`Updating ad ${adId} status to ${status}`);
    loadDashboardData();
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50 dark:bg-gray-900 text-black dark:text-gray-300">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <section className='dark:bg-[#192D64] bg-[#F3F8FD]'> 
        <Navbar/>
    <div className="min-h-screen py-8">
        
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div  className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard icon={<ShoppingBag className="h-8 w-8 text-blue-500" />} label="Total Ads" value={stats.totalAds} />
        <StatCard icon={<Users className="h-8 w-8 text-green-500" />} label="Total Users" value={stats.totalUsers} />
        <StatCard icon={<Users className="h-8 w-8 text-purple-500" />} label="Total Vendors" value={stats.totalVendors} />
        <StatCard icon={<Clock className="h-8 w-8 text-yellow-500" />} label="Pending Reviews" value={stats.pendingAds} />
        <StatCard icon={<Eye className="h-8 w-8 text-indigo-500" />} label="Total Views" value={stats.totalViews.toLocaleString()} />
        <StatCard icon={<DollarSign className="h-8 w-8 text-emerald-500" />} label="Platform Value" value={`$${stats.totalValue.toLocaleString()}`} />
      </div>

      {/* Quick Actions */}
      <div className=" card mb-8">
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="#" className="flex items-center space-x-3 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/40">
            <Clock className="h-5 w-5 text-blue-600 dark:text-blue-300" />
            <span className="font-medium text-blue-800 dark:text-blue-200">Review Ads</span>
          </Link>
          <Link to="#" className="flex items-center space-x-3 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/40">
            <Users className="h-5 w-5 text-green-600 dark:text-green-300" />
            <span className="font-medium text-green-800 dark:text-green-200">Manage Users</span>
          </Link>
          <button className="flex items-center space-x-3 p-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/40">
            <ShoppingBag className="h-5 w-5 text-purple-600 dark:text-purple-300" />
            <span className="font-medium text-purple-800 dark:text-purple-200">Platform Settings</span>
          </button>
        </div>
      </div>
        </div>

       <div className="card">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Recent Advertisements
          </h2>
          <Link
            to="/admin/approval"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
          >
            View All
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Title</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Vendor</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Price</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentAds.map((ad) => (
                <tr key={ad.id} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={ad.image}
                        alt={ad.title}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white line-clamp-1">
                          {ad.title}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {ad.category}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">
                    {ad.vendorName}
                  </td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">
                    ${ad.price.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ad.status)}`}>
                      {ad.status.charAt(0).toUpperCase() + ad.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                    {new Date(ad.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    {ad.status === 'pending' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleQuickApproval(ad.id, 'approved')}
                          className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 rounded text-xs hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleQuickApproval(ad.id, 'rejected')}
                          className="px-2 py-1 bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 rounded text-xs hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>          
      </div>
      </div>
     </div>
    </div>
    <Footer/>
    </section>
  );
}

// Reusable StatCard component
function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex items-center space-x-4">
      {icon}
      <div>
        <p className="text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
    
  );
}