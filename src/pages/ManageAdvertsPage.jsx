import  { useState, useEffect } from "react";
import { Link } from "react-router";
import { Edit, Trash2, Eye, Plus, Search, Filter } from "lucide-react";
import Modal from "../components/Modal";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

const initialAds = [
  {
    id: "1",
    title: "Samsung Smart TV",
    description: "A 55 inch smart TV with 4K resolution.",
    category: "Electronics",
    status: "approved",
    price: 2500,
    views: 12,
    image:
      "https://plus.unsplash.com/premium_photo-1683141392308-aaa39d916686?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Used Office Chair",
    description: "Ergonomic office chair in great condition.",
    category: "Furniture",
    status: "approved",
    price: 150,
    views: 5,
    image:
      "https://images.unsplash.com/photo-1700168333927-023e01cc748f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "iPhone 12 Pro Max",
    description: "Slightly used with no scratches.",
    category: "Phones",
    status: "pending",
    price: 4800,
    views: 7,
    image:
      "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?q=80&w=1026&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdAt: new Date(),
  },
];

export default function ManageAdvertsPage() {
  const [ads, setAds] = useState(initialAds);
  const [filteredAds, setFilteredAds] = useState(initialAds);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [adToDelete, setAdToDelete] = useState(null);

  useEffect(() => {
    filterAds();
  }, [searchQuery, statusFilter, ads]);

  const filterAds = () => {
    let filtered = [...ads];
    if (searchQuery) {
      filtered = filtered.filter(
        (ad) =>
          ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ad.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ad.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (statusFilter !== "all") {
      filtered = filtered.filter((ad) => ad.status === statusFilter);
    }
    setFilteredAds(filtered);
  };

  const handleDeleteClick = (adId) => {
    setAdToDelete(adId);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setAds(ads.filter((ad) => ad.id !== adToDelete));
    setDeleteModalOpen(false);
    setAdToDelete(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const statusCounts = {
    all: ads.length,
    approved: ads.filter((ad) => ad.status === "approved").length,
    pending: ads.filter((ad) => ad.status === "pending").length,
    rejected: ads.filter((ad) => ad.status === "rejected").length,
  };

  return (
    <section className="dark:bg-[#192D64] bg-[#F2F7FE]">
      <Navbar />
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Manage Advertisements</h1>
              <p className="text-gray-600 dark:text-gray-400">
                View and manage all your posted advertisements
              </p>
            </div>
            <Link
              to="/vendor/post"
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="h-4 w-4" /> Post New Ad
            </Link>
          </div>

          <div className="card mb-6 p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search your ads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">All Status ({statusCounts.all})</option>
                  <option value="approved">
                    Approved ({statusCounts.approved})
                  </option>
                  <option value="pending">
                    Pending ({statusCounts.pending})
                  </option>
                  <option value="rejected">
                    Rejected ({statusCounts.rejected})
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 ">
            {["all", "approved", "pending", "rejected"].map((key) => (
              <button
                key={key}
                onClick={() => setStatusFilter(key)}
                className={`p-4 border rounded-lg text-center transition-colors ${
                  statusFilter === key
                   ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{statusCounts[key]}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{key}</div>
              </button>
            ))}
          </div>

          {filteredAds.length === 0 ? (
            <div className="card p-12 text-center">
              <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium">No ads found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAds.map((ad) => (
                <div key={ad.id} className="card">
                  <div className="relative">
                    <img
                      src={ad.image}
                      alt={ad.title}
                      className="w-full h-48 object-cover rounded-t"
                    />
                    <span
                      className={`absolute top-3 left-3 px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(
                        ad.status
                      )}`}
                    >
                      {ad.status}
                    </span>
                    <span className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
                      {ad.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
                        {ad.title}
                      </h3>
                      <span className="text-blue-600 font-bold">
                        ${ad.price.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                      {ad.description}
                    </p>
                    <div className="text-xs text-gray-500 mb-4 flex justify-between">
                      <span>
                        <Eye className="inline w-4 h-4 mr-1" />
                        {ad.views}
                      </span>
                      <span>{new Date(ad.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/ad/${ad.id}`}
                        className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-md text-sm text-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        View
                      </Link>
                      <Link
                        to={`/vendor/edit/${ad.id}`}
                        className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 rounded-md text-sm text-center hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(ad.id)}
                        className="px-3 py-2 bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 rounded-md text-sm hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          

          <Modal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            title="Delete Advertisement"
          >
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                Are you sure you want to delete this advertisement? This action
                cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
      <Footer />
    </section>
  );
}
