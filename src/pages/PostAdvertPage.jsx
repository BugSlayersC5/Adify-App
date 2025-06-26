
import { Upload, X, DollarSign, Tag, MapPin, FileText, Image as ImageIcon, } from 'lucide-react';
import Footer from '../components/Footer';
import Navbar from '../components/NavBar';
import { apiClient } from '../../api/client';
import SubmitButton from '../components/SubmitButton';

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
  'Other',
];

// CONSTANTS FOR IMAGE LIMITS
const MAX_TOTAL_IMAGE_SIZE_MB = 5; // Total limit for all images combined
const MAX_IMAGE_SIZE_MB_PER_FILE = 5; // Individual file size limit (can be same or smaller than total)
const MAX_IMAGES = 5; // Maximum number of images allowed

export default function PostAdvertPage() {
  const postAd = async (data) => {

    try {
      const response = await apiClient.post('/adverts', data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
        }
      });

    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <section>
      <Navbar />
      <div className="min-h-screen py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Post New Advertisement
            </h1>
            <p className="text-gray-400">
              Create a compelling ad to reach potential customers
            </p>
          </div>

          <form action={postAd} className="space-y-6">
            {/* Image Upload */}
            <div className="card">
              <div className="p-6 relative">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  <ImageIcon className="inline h-4 w-4 mr-1" />
                  Product Images
                </label>

                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">
                  Click to upload images or drag and drop
                </p>
                <p className="text-sm text-gray-500">
                  PNG, JPG, GIF up to {MAX_IMAGE_SIZE_MB_PER_FILE}MB each.
                  Total max {MAX_TOTAL_IMAGE_SIZE_MB}MB for {MAX_IMAGES} pictures.
                </p>
                <input
                  type="file"
                  name='images'
                  accept="image/*"
                  multiple
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

              </div>
            </div>

            {/* Basic Info */}
            <div className="card">
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <FileText className="inline h-4 w-4 mr-1" /> Title *
                  </label>
                  <input
                  type='text'
                    name="title"
                    required
                    className="input-field"
                    placeholder="Enter a title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <DollarSign className="inline h-4 w-4 mr-1" /> Price *
                  </label>
                  <input
                    type="number"
                    name="price"
                    required
                    min="0"
                    className="input-field"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Tag className="inline h-4 w-4 mr-1" /> Category *
                  </label>
                  <select
                    name="category"
                    required
                    className="input-field"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <MapPin className="inline h-4 w-4 mr-1" /> Location
                  </label>
                  <input
                    name="location"
                    className="input-field"
                    placeholder="City"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="card">
              <div className="p-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  required
                  rows={5}
                  className="input-field resize-none"
                  placeholder="Provide a detailed description..."
                />
              </div>
            </div>




            {/* Submit */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate('/vendor-dashboard')}
              >
                Cancel
              </button>
              <SubmitButton className="btn-primary" title={'Post Advertisment'} />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </section>
  );
}