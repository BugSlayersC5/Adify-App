import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router";
import SubmitButton from "../components/SubmitButton";
import { apiClient, apiFetcher } from "../../api/client";
import useSWR from "swr";
import {
  DollarSign,
  FileText,
  ImageIcon,
  MapPin,
  Tag,
  Upload,
} from "lucide-react";

const categories = [
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Automotive",
  "Sports",
  "Health & Beauty",
  "Services",
  "Real Estate",
  "Jobs",
  "Other",
];

// Constants for file UI
const MAX_TOTAL_IMAGE_SIZE_MB = 5;
const MAX_IMAGE_SIZE_MB_PER_FILE = 5;
const MAX_IMAGES = 5;

export default function EditAdvertPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useSWR(`/adverts/${id}`, apiFetcher);

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
          <h2 className="text-2xl font-bold text-white mb-4">
            Ad not found
          </h2>
          <button onClick={() => navigate("/")} className="btn-primary">
            Back to Browse
          </button>
        </div>
      </div>
    );
  }

  const patchAdvert = async (data) => {
    console.log("🧾 Payload being sent:", data);

    try {
      const response = await apiClient.put(`/adverts/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
        },
      });
      console.log("✅ Response:", response);
      navigate(-1);
    } catch (error) {
      console.log("❌ Error:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Edit Advert</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target;
            const updatedData = {
              title: form.title.value,
              price: form.price.value,
              category: form.category.value,
              location: form.location.value,
              description: form.description.value,
            };
            patchAdvert(updatedData);
          }}
          className="space-y-6"
        >
          {/* Image Section (UI only) */}
          <div className="card">
            <div className="p-6 relative">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                <ImageIcon className="inline h-4 w-4 mr-1" />
                Product Images
              </label>

              <div className="flex gap-2 flex-wrap mb-4">
                {data.images &&
                  data.images.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt={`Current image ${idx + 1}`}
                      className="w-24 h-24 object-cover rounded border"
                    />
                  ))}
              </div>

              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 mb-2">
                Click to upload new images or drag and drop
              </p>
              <p className="text-sm text-gray-500">
                PNG, JPG, GIF up to {MAX_IMAGE_SIZE_MB_PER_FILE}MB each. Total
                max {MAX_TOTAL_IMAGE_SIZE_MB}MB for {MAX_IMAGES} pictures.
              </p>

              <input
                type="file"
                name="images"
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
                  type="text"
                  name="title"
                  required
                  className="input-field"
                  placeholder="Enter a catchy title"
                  defaultValue={data.title}
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
                  defaultValue={data.price}
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
                  defaultValue={data.category}
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
                  defaultValue={data.location}
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
                defaultValue={data.description}
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/vendor-dashboard")}
            >
              Cancel
            </button>
            <SubmitButton className="btn-primary" title={"Update Advert"} />
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
