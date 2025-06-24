import { useState, useEffect } from 'react'; // Corrected import syntax
import { CheckCircle, XCircle, Eye, Search, Filter, Info, Sun, Moon, Sparkles } from 'lucide-react';
import Navbar from '../components/NavBar'; 
import Footer from "../components/Footer";

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
    image: 'https://images.unsplash.com/photo-1502920872659-3d02b85d9d7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcwODN8MHwxfHNlYXJjaHwxOHx8dmFydmludGZyb3BlfGVufDB8fHx8MTcxNzc3MTMyMnww&ixlib=rb-4.0.3&q=80&w=1080',
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
const Modal = ({ isOpen, onClose, title, children, isDarkMode, selectedAd }) => { // Added selectedAd
  if (!isOpen) return null;

  const [summary, setSummary] = useState('');
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [reasonLoading, setReasonLoading] = useState(false);

  // Reset summary/reason when modal opens for a new ad or closes
  useEffect(() => {
    if (isOpen) {
      setSummary('');
      setRejectionReason('');
    }
  }, [isOpen, selectedAd]);


  const modalBg = isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800';
  const headerBorder = isDarkMode ? 'border-gray-700' : 'border-gray-300';
  const closeButton = isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800';
  const detailLabel = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const detailValue = isDarkMode ? 'text-white' : 'text-gray-800';
  const priceColor = isDarkMode ? 'text-blue-400' : 'text-blue-600';
  const borderTop = isDarkMode ? 'border-gray-700' : 'border-gray-300';

  // --- LLM Feature: Summarize Ad Description ---
  const handleSummarizeDescription = async () => {
    if (!selectedAd || summaryLoading) return;

    setSummaryLoading(true);
    setSummary('Generating summary...'); // Provide immediate feedback

    try {
      const prompt = `Summarize the following advertisement description concisely, focusing on its key aspects and benefits, in 2-3 sentences: "${selectedAd.description}"`;
      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = { contents: chatHistory };
      const apiKey = ""; // If you want to use models other than gemini-2.0-flash or imagen-3.0-generate-002, provide an API key here. Otherwise, leave this as-is.
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        setSummary(text);
      } else {
        setSummary('Failed to generate summary. Please try again.');
      }
    } catch (error) {
      console.error('Error summarizing description:', error);
      setSummary('Error generating summary. Please try again.');
    } finally {
      setSummaryLoading(false);
    }
  };

  // --- LLM Feature: Generate Rejection Reason ---
  const handleGenerateRejectionReason = async () => {
    if (!selectedAd || reasonLoading) return;

    setReasonLoading(true);
    setRejectionReason('Generating reason...'); // Provide immediate feedback

    try {
      const prompt = `Suggest a concise, professional reason to reject an advertisement with the following details. Consider common ad policy violations (e.g., vague, inappropriate, misleading, prohibited item).
      Ad Title: "${selectedAd.title}"
      Ad Description: "${selectedAd.description}"
      Suggest a reason (1-2 sentences):`;
      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = { contents: chatHistory };
      const apiKey = ""; // If you want to use models other than gemini-2.0-flash or imagen-3.0-generate-002, provide an API key here. Otherwise, leave this as-is.
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        setRejectionReason(text);
      } else {
        setRejectionReason('Failed to generate reason. Please try again.');
      }
    } catch (error) {
      console.error('Error generating rejection reason:', error);
      setRejectionReason('Error generating reason. Please try again.');
    } finally {
      setReasonLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className={`rounded-lg shadow-xl relative w-full max-w-lg ${modalBg}`}>
        <div className={`flex justify-between items-center border-b ${headerBorder} p-4`}>
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{title}</h2>
          <button onClick={onClose} className={`transition-colors ${closeButton}`}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          {children} {/* This is where the AdApprovalPage content (selectedAd details) gets rendered */}

          {selectedAd && (
            <div className={`space-y-6 ${isDarkMode ? 'text-white' : 'text-gray-800'} mt-4`}>
              <hr className={isDarkMode ? 'border-gray-700' : 'border-gray-300'} />

              {/* LLM Feature: Summarize Ad Description */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleSummarizeDescription}
                  disabled={summaryLoading}
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium
                    ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}
                    ${summaryLoading ? 'opacity-50 cursor-not-allowed' : ''}`
                  }
                >
                  {summaryLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  {summaryLoading ? 'Summarizing...' : 'Summarize Description ✨'}
                </button>
                {summary && (
                  <div className={`p-3 rounded-md ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'} text-sm`}>
                    <h4 className="font-semibold mb-1">Summary:</h4>
                    <p>{summary}</p>
                  </div>
                )}
              </div>

              {/* LLM Feature: Generate Rejection Reason (only for pending ads) */}
              {selectedAd.status === 'pending' && (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleGenerateRejectionReason}
                    disabled={reasonLoading}
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium
                      ${isDarkMode ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}
                      ${reasonLoading ? 'opacity-50 cursor-not-allowed' : ''}`
                    }
                  >
                    {reasonLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <Sparkles className="h-4 w-4" />
                    )}
                    {reasonLoading ? 'Generating Reason...' : 'Suggest Rejection Reason ✨'}
                  </button>
                  {rejectionReason && (
                    <div className={`p-3 rounded-md ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'} text-sm`}>
                      <h4 className="font-semibold mb-1">Suggested Reason:</h4>
                      <p>{rejectionReason}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Original Actions from AdApprovalPage (for context inside Modal) */}
              {selectedAd.status === 'pending' && (
                <div className={`flex justify-end space-x-3 pt-4 border-t ${borderTop}`}>
                  <button
                    onClick={() => onClose(selectedAd.id, 'rejected')} // Pass adId and status back
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                  >
                    <XCircle className="h-4 w-4" />
                    <span>Reject</span>
                  </button>
                  <button
                    onClick={() => onClose(selectedAd.id, 'approved')} // Pass adId and status back
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Approve</span>
                  </button>
                </div>
              )}
            </div>
          )}
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
const ThemeToggle = ({ toggleTheme, isDarkMode }) => {
  const buttonBg = isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300';
  const buttonText = isDarkMode ? 'text-yellow-400' : 'text-gray-700';

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full ${buttonBg} ${buttonText} transition-colors shadow-md`}
      aria-label="Toggle theme"
    >
      {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};

// --- 7. AdApprovalPage Component (main logic) ---
const AdApprovalPage = ({ isDarkMode }) => {
  const [ads, setAds] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('pending');
  const [selectedAd, setSelectedAd] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [messageBox, setMessageBox] = useState({ isOpen: false, title: '', message: '', type: 'info' });

  useEffect(() => {
    const loadAds = () => {
      setLoading(true);
      setTimeout(() => {
        setAds(staticAds);
        setLoading(false);
      }, 500);
    };
    loadAds();
  }, []);

  useEffect(() => {
    const filterAds = () => {
      let filtered = ads;

      if (statusFilter !== 'all') {
        filtered = filtered.filter(ad => ad.status === statusFilter);
      }

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

  // This function is now passed to the Modal's onClose prop
  const handleModalCloseAndUpdate = (adId, status) => {
    if (adId && status) { // Only update if adId and status are provided (from approve/reject buttons)
      handleStatusUpdate(adId, status);
    } else { // Otherwise, just close the modal
      setModalOpen(false);
      setSelectedAd(null);
    }
  };


  const getStatusColor = (status) => {
    if (isDarkMode) {
      switch (status) {
        case 'approved': return 'bg-green-900/20 text-green-400';
        case 'pending': return 'bg-yellow-900/20 text-yellow-400';
        case 'rejected': return 'bg-red-900/20 text-red-400';
        default: return 'bg-gray-900/20 text-gray-400';
      }
    } else {
      switch (status) {
        case 'approved': return 'bg-green-100 text-green-800';
        case 'pending': return 'bg-yellow-100 text-yellow-800';
        case 'rejected': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-200 text-gray-700';
      }
    }
  };

  const statusCounts = {
    all: ads.length,
    pending: ads.filter(ad => ad.status === 'pending').length,
    approved: ads.filter(ad => ad.status === 'approved').length,
    rejected: ads.filter(ad => ad.status === 'rejected').length,
  };

  const mainBg = isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800';
  const cardBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const cardBorder = isDarkMode ? 'border-gray-700' : 'border-gray-200';
  const headerText = isDarkMode ? 'text-white' : 'text-gray-900';
  const subHeaderText = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const inputBg = isDarkMode ? 'bg-gray-700' : 'bg-white';
  const inputBorder = isDarkMode ? 'border-gray-700' : 'border-gray-300';
  const inputText = isDarkMode ? 'text-white' : 'text-gray-900';
  const searchIcon = isDarkMode ? 'text-gray-400' : 'text-gray-400';
  const tableHeaderBg = isDarkMode ? 'bg-gray-700' : 'bg-gray-50';
  const tableHeaderText = isDarkMode ? 'text-white' : 'text-gray-700';
  const tableRowHover = isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50';
  const adTitleColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const adDescColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const adCategoryBg = isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700';
  const vendorNameColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const vendorLocationColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const priceColor = isDarkMode ? 'text-blue-400' : 'text-blue-600';
  const dateColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const actionButton = isDarkMode ? 'text-blue-400 hover:bg-blue-900/20' : 'text-blue-600 hover:bg-blue-100';
  const approveRejectButton = isDarkMode ? 'text-white' : 'text-white';
  const activeStatusButton = isDarkMode ? 'border-blue-500 bg-blue-700 text-white' : 'border-blue-500 bg-blue-500 text-white';
  const inactiveStatusButton = isDarkMode ? 'border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-300' : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700';


  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${mainBg}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-8 ${mainBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${headerText} mb-2`}>
            Advertisement Approval
          </h1>
          <p className={`${subHeaderText}`}>
            Review and approve advertisements before they go live
          </p>
        </div>

        {/* Filters and Search */}
        <div className={`${cardBg} rounded-lg shadow ${cardBorder} mb-8`}>
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${searchIcon}`} />
                  <input
                    type="text"
                    placeholder="Search ads by title, vendor, or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 border ${inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${inputBg} ${inputText}`}
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="flex items-center space-x-2">
                <Filter className={`h-5 w-5 ${searchIcon}`} />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={`border ${inputBorder} rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${inputBg} ${inputText}`}
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
            { key: 'all', label: 'Total Ads', count: statusCounts.all, color: 'bg-blue-600 text-white' },
            { key: 'pending', label: 'Pending', count: statusCounts.pending, color: 'bg-yellow-500 text-white' },
            { key: 'approved', label: 'Approved', count: statusCounts.approved, color: 'bg-green-600 text-white' },
            { key: 'rejected', label: 'Rejected', count: statusCounts.rejected, color: 'bg-red-600 text-white' },
          ].map((status) => (
            <button
              key={status.key}
              onClick={() => setStatusFilter(status.key)}
              className={`p-4 rounded-lg border transition-colors ${
                statusFilter === status.key
                  ? activeStatusButton
                  : inactiveStatusButton
              }`}
            >
              <div className={`text-2xl font-bold ${statusFilter === status.key ? 'text-white' : (isDarkMode ? 'text-white' : 'text-gray-900')}`}>
                {status.count}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                {status.label}
              </div>
            </button>
          ))}
        </div>

        {/* Ads Table */}
        {filteredAds.length === 0 ? (
          <div className={`${cardBg} rounded-lg shadow ${cardBorder}`}>
            <div className="p-12 text-center">
              <Search className={`h-12 w-12 ${searchIcon} mx-auto mb-4`} />
              <h3 className={`text-lg font-medium ${headerText} mb-2`}>
                No ads found
              </h3>
              <p className={`${subHeaderText}`}>
                Try adjusting your search or filter criteria
              </p>
            </div>
          </div>
        ) : (
          <div className={`${cardBg} rounded-lg shadow overflow-hidden ${cardBorder}`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${cardBorder} ${tableHeaderBg}`}>
                    <th className={`text-left py-4 px-6 font-medium ${tableHeaderText}`}>Ad Details</th>
                    <th className={`text-left py-4 px-6 font-medium ${tableHeaderText}`}>Vendor</th>
                    <th className={`text-left py-4 px-6 font-medium ${tableHeaderText}`}>Price</th>
                    <th className={`text-left py-4 px-6 font-medium ${tableHeaderText}`}>Status</th>
                    <th className={`text-left py-4 px-6 font-medium ${tableHeaderText}`}>Date</th>
                    <th className={`text-left py-4 px-6 font-medium ${tableHeaderText}`}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAds.map((ad) => (
                    <tr key={ad.id} className={`border-b ${cardBorder} ${tableRowHover}`}>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-4">
                          <img
                            src={ad.image}
                            alt={ad.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className={`font-medium ${adTitleColor} line-clamp-1`}>
                              {ad.title}
                            </h3>
                            <p className={`text-sm ${adDescColor} line-clamp-1`}>
                              {ad.description}
                            </p>
                            <span className={`inline-block ${adCategoryBg} px-2 py-1 rounded text-xs mt-1`}>
                              {ad.category}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className={`font-medium ${vendorNameColor}`}>
                            {ad.vendorName}
                          </p>
                          <p className={`text-sm ${vendorLocationColor}`}>
                            {ad.location}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`text-lg font-semibold ${priceColor}`}>
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
                            className={`p-2 ${actionButton} rounded-lg transition-colors`}
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
        {/* Pass selectedAd to the Modal for LLM features and handleModalCloseAndUpdate for actions */}
        <Modal
          isOpen={modalOpen}
          onClose={handleModalCloseAndUpdate} // Use new handler
          title="Advertisement Details"
          isDarkMode={isDarkMode}
          selectedAd={selectedAd}
        >
          {/* Content that was previously directly in Modal's children prop, now here to keep it structured */}
          {selectedAd && (
            <div className="space-y-6"> {/* Removed redundant text-white/gray-800 from here */}
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
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                    {selectedAd.title}
                  </h3>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                    {selectedAd.description}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Category:</span>
                      <span className={`${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{selectedAd.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Location:</span>
                      <span className={`${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{selectedAd.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Posted:</span>
                      <span className={`${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {new Date(selectedAd.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-right mb-4">
                    <span className={`text-3xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      ${selectedAd.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Vendor:</span>
                      <span className={`${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{selectedAd.vendorName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Views:</span>
                      <span className={`${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{selectedAd.views || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedAd.status)}`}>
                        {selectedAd.status.charAt(0).toUpperCase() + selectedAd.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
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
export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false); // State to manage theme

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const appBg = isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800';

  return (
    <div className={`min-h-screen font-sans antialiased ${appBg}`}>
      <Navbar isDarkMode={isDarkMode} />
      <main className="relative z-10"> {/* z-10 for theme toggle positioning */}
        {/* ThemeToggle re-positioned to the top right corner within the main area */}
        <div className="absolute top-4 right-4 z-20">
          <ThemeToggle toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        </div>
        <AdApprovalPage isDarkMode={isDarkMode} />
      </main>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}
