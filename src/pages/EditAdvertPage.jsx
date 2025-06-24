import { useState, useEffect } from 'react';
import { Upload, X, DollarSign, Tag, MapPin, FileText, Image as ImageIcon, ArrowLeft, Sun, Moon } from 'lucide-react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

// --- Main App Component (Only this one is exported as default) ---
export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false); // State to manage theme
  const [messageBox, setMessageBox] = useState({ isOpen: false, title: '', message: '', type: 'info' });

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const appBg = isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800';

  return (
    <div className={`min-h-screen font-sans antialiased ${appBg}`}>
      <Navbar isDarkMode={isDarkMode} />
      <main className="relative z-10">
        {/* ThemeToggle re-positioned to the top right corner within the main area */}
        <div className="absolute top-4 right-4 z-20">
          <ThemeToggle toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        </div>
        {/* Pass setMessageBox to EditAdvertPage so it can trigger toasts */}
        <EditAdvertPage isDarkMode={isDarkMode} setAppMessageBox={setMessageBox} />
      </main>
      <Footer isDarkMode={isDarkMode} />
      <MessageBox
        isOpen={messageBox.isOpen}
        onClose={() => setMessageBox({ ...messageBox, isOpen: false })}
        title={messageBox.title}
        message={messageBox.message}
        type={messageBox.type}
      />
    </div>
  );
}

// --- Mocking External Dependencies for Canvas Environment ---

// Mock Ad Type - based on structure from Ad Approval Page
const AdType = {
  id: '',
  title: '',
  description: '',
  image: '',
  vendorName: '',
  location: '',
  price: 0,
  category: '',
  status: '',
  createdAt: '',
  views: 0,
  vendorId: '', // Added for editing permissions
};

// Mock useParams (for React Router compatibility in Canvas)
const useParams = () => {
  // For demonstration, we'll hardcode an ad ID.
  // In a real app, this would come from the URL.
  return { id: 'ad-001' }; // Simulates editing ad-001
};

// Mock useNavigate (for React Router compatibility in Canvas)
const useNavigate = () => {
  return (path) => {
    console.log(`Navigating to: ${path}`);
    // In a real app, this would use react-router-dom's navigate function
  };
};

// Mock useAuth context
const useAuth = () => {
  // Simulating a logged-in user with a specific vendorId
  return {
    user: {
      id: 'vendor-001', // This should match the vendorId of the ad being edited for successful loading
      name: 'Mock Vendor',
    },
    // Other auth related functions would go here
  };
};

// Mock useToast context
const useToast = () => {
  return {
    showToast: (message, type) => {
      // In a real app, this would show a toast notification.
      // For Canvas, we'll log it and use the MessageBox component for visual feedback.
      console.log(`Toast (${type}): ${message}`);
      // The MessageBox state is managed by the App or AdApprovalPage for consistency,
      // so we will pass a function to update MessageBox via props.
    },
  };
};

// --- Mock API (in-memory data operations) ---
const mockAdsData = [
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
    vendorId: 'vendor-001', // Added vendorId for auth check
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
    vendorId: 'vendor-002', // Different vendor
  },
  // Add other static ads if needed, ensuring they have a vendorId
];

const mockApi = {
  getAdById: async (adId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const ad = mockAdsData.find(a => a.id === adId);
        resolve(ad);
      }, 500); // Simulate network delay
    });
  },
  updateAd: async (adId, updatedFields) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockAdsData.findIndex(a => a.id === adId);
        if (index > -1) {
          mockAdsData[index] = { ...mockAdsData[index], ...updatedFields };
          console.log(`Mock API: Ad ${adId} updated`, mockAdsData[index]);
          resolve(mockAdsData[index]);
        } else {
          reject(new Error('Ad not found for update'));
        }
      }, 500); // Simulate network delay
    });
  },
};


const categories = [
  'Electronics',
  'Fashion',
  'Home & Garden',
  'Automotive',
  'Sports',
  'Health & Beauty',
  'Services',
  'Real Estate',
  'Jobs',
  'Other'
];

// --- 2. Modal Component (defined locally) ---
const Modal = ({ isOpen, onClose, title, children, isDarkMode }) => {
  if (!isOpen) return null;

  const modalBg = isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800';
  const headerBorder = isDarkMode ? 'border-gray-700' : 'border-gray-300';
  const closeButton = isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800';

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
      icon = <X className="h-6 w-6" />; // Using X for error messages
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
            <X className="h-6 w-6" />
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


// --- EditAdvertPage Component ---
const EditAdvertPage = ({ isDarkMode, setAppMessageBox }) => { // Added setAppMessageBox prop
  const { id } = useParams();
  const { user } = useAuth();
  const { showToast } = useToast(); // This mock toast needs to interact with parent MessageBox
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState('');
  const [ad, setAd] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    location: '',
    image: '',
  });

  // Override showToast to use the App's MessageBox for visual feedback
  const showPageToast = (message, type) => {
    setAppMessageBox({ isOpen: true, title: type === 'error' ? 'Error' : 'Success', message, type });
  };


  useEffect(() => {
    if (id) {
      loadAd(id);
    }
  }, [id]);

  const loadAd = async (adId) => {
    try {
      setInitialLoading(true);
      const adData = await mockApi.getAdById(adId);

      if (!adData) {
        showPageToast('Ad not found', 'error');
        navigate('/vendor/manage');
        return;
      }

      if (user && adData.vendorId !== user.id) {
        showPageToast('You can only edit your own ads', 'error');
        navigate('/vendor/manage');
        return;
      }

      setAd(adData);
      setFormData({
        title: adData.title,
        description: adData.description,
        price: adData.price.toString(),
        category: adData.category,
        location: adData.location || '',
        image: adData.image,
      });
      setImagePreview(adData.image);
    } catch (error) {
      console.error('Error loading ad:', error);
      showPageToast('Error loading ad', 'error');
      navigate('/vendor/manage');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview('');
    setFormData(prev => ({ ...prev, image: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !ad) {
      showPageToast('Unable to update ad: User not authenticated or ad not loaded.', 'error');
      return;
    }

    // Validation
    if (!formData.title || !formData.description || !formData.price || !formData.category) {
      showPageToast('Please fill in all required fields', 'error');
      return;
    }

    if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      showPageToast('Please enter a valid price greater than 0', 'error');
      return;
    }

    setLoading(true);

    try {
      const imageUrl = formData.image || 'https://placehold.co/600x400/cccccc/000000?text=No+Image'; // Fallback placeholder
      
      await mockApi.updateAd(ad.id, {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        category: formData.category,
        location: formData.location || 'Location not specified',
        image: imageUrl,
        status: 'pending', // Reset to pending when edited
      });

      showPageToast('Ad updated successfully! It will be reviewed before going live.', 'success');
      navigate('/vendor/manage');
    } catch (error) {
      console.error('Error updating ad:', error);
      showPageToast('Error updating ad. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Conditional Styling based on isDarkMode
  const mainBg = isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800';
  const cardBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const cardBorder = isDarkMode ? 'border-gray-700' : 'border-gray-200';
  const headerText = isDarkMode ? 'text-white' : 'text-gray-900';
  const subHeaderText = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const labelText = isDarkMode ? 'text-gray-300' : 'text-gray-700';
  const inputBg = isDarkMode ? 'bg-gray-700' : 'bg-white';
  const inputBorder = isDarkMode ? 'border-gray-700' : 'border-gray-300';
  const inputText = isDarkMode ? 'text-white' : 'text-gray-900';
  const inputPlaceholder = isDarkMode ? 'placeholder-gray-400' : 'placeholder-gray-500';
  const disabledButton = 'disabled:opacity-50 disabled:cursor-not-allowed';
  const primaryButton = isDarkMode ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white';
  const secondaryButton = isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-200 hover:bg-gray-300 text-gray-800';
  const backButton = isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600';
  const uploadBorder = isDarkMode ? 'border-gray-600' : 'border-gray-300';
  const uploadIconText = isDarkMode ? 'text-gray-400' : 'text-gray-400';
  const uploadInfoText = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const uploadSmallText = isDarkMode ? 'text-gray-500' : 'text-gray-500';


  if (initialLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${mainBg}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!ad) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${mainBg}`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold ${headerText} mb-4`}>
            Ad not found
          </h2>
          <button
            onClick={() => navigate('/vendor/manage')}
            className={`px-4 py-2 rounded-lg transition-colors ${primaryButton}`}
          >
            Back to Manage Ads
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-8 ${mainBg}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/vendor/manage')}
          className={`flex items-center space-x-2 ${backButton} mb-6 transition-colors`}
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Manage Ads</span>
        </button>

        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${headerText} mb-2`}>
            Edit Advertisement
          </h1>
          <p className={`${subHeaderText}`}>
            Update your advertisement details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className={`${cardBg} rounded-lg shadow ${cardBorder}`}>
            <div className="p-6">
              <label className={`block text-sm font-medium ${labelText} mb-3`}>
                <ImageIcon className="inline h-4 w-4 mr-1" />
                Product Image
              </label>
              
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className={`border-2 border-dashed ${uploadBorder} rounded-lg p-8 text-center relative`}>
                  <Upload className={`h-12 w-12 ${uploadIconText} mx-auto mb-4`} />
                  <p className={`${uploadInfoText} mb-2`}>
                    Click to upload an image or drag and drop
                  </p>
                  <p className={`text-sm ${uploadSmallText}`}>
                    PNG, JPG, GIF up to 10MB
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Basic Information */}
          <div className={`${cardBg} rounded-lg shadow ${cardBorder}`}>
            <div className="p-6">
              <h2 className={`text-lg font-semibold ${headerText} mb-4`}>
                Basic Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="title" className={`block text-sm font-medium ${labelText} mb-2`}>
                    <FileText className="inline h-4 w-4 mr-1" />
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`block w-full px-4 py-2 border ${inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${inputBg} ${inputText} ${inputPlaceholder}`}
                    placeholder="Enter a catchy title for your ad"
                  />
                </div>

                <div>
                  <label htmlFor="price" className={`block text-sm font-medium ${labelText} mb-2`}>
                    <DollarSign className="inline h-4 w-4 mr-1" />
                    Price *
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    className={`block w-full px-4 py-2 border ${inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${inputBg} ${inputText} ${inputPlaceholder}`}
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label htmlFor="category" className={`block text-sm font-medium ${labelText} mb-2`}>
                    <Tag className="inline h-4 w-4 mr-1" />
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`block w-full px-4 py-2 border ${inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${inputBg} ${inputText}`}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="location" className={`block text-sm font-medium ${labelText} mb-2`}>
                    <MapPin className="inline h-4 w-4 mr-1" />
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`block w-full px-4 py-2 border ${inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${inputBg} ${inputText} ${inputPlaceholder}`}
                    placeholder="City, State"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className={`${cardBg} rounded-lg shadow ${cardBorder}`}>
            <div className="p-6">
              <label htmlFor="description" className={`block text-sm font-medium ${labelText} mb-2`}>
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={6}
                value={formData.description}
                onChange={handleInputChange}
                className={`block w-full px-4 py-2 border ${inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${inputBg} ${inputText} ${inputPlaceholder} resize-none`}
                placeholder="Provide a detailed description of your product or service..."
              />
              <p className={`mt-2 text-sm ${subHeaderText}`}>
                Include key features, condition, and any important details buyers should know.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/vendor/manage')}
              className={`px-4 py-2 rounded-lg transition-colors ${secondaryButton}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-lg transition-colors ${primaryButton} ${disabledButton}`}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Updating...</span>
                </div>
              ) : (
                'Update Advertisement'
              )}
            </button>
          </div>
        </form>
      </div>
      {/* MessageBox is controlled by the App component for consistency */}
    </div>
  );
};
