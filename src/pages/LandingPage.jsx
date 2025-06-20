import { useState, useEffect } from "react";
import { Filter, Grid, List } from "lucide-react";
import AdCard from "../components/AdCard";
import FilterSidebar from "../components/FilterSidebar";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import SearchWithSuggestions from "../components/SearchWithSuggestions";

const searchSuggestions = ["iPhone", "Samsung", "Toyota", "Dell", "Phones", "Laptops", "Vehicles"];

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

export default function LandingPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "All Categories",
    priceRange: [0, 100000],
    location: "",
    sortBy: "newest",
  });
  const [filteredAds, setFilteredAds] = useState([]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    const runFilter = () => {
      let results = mockAds.filter((ad) => ad.status === "approved");

      if (filters.category !== "All Categories") {
        results = results.filter((ad) => ad.category === filters.category);
      }

      results = results.filter(
        (ad) =>
          ad.price >= filters.priceRange[0] && ad.price <= filters.priceRange[1]
      );

      if (filters.location) {
        results = results.filter((ad) =>
          ad.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      if (searchQuery) {
        results = results.filter((ad) =>
          ad.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setFilteredAds(results);
    };

    runFilter();
  }, [filters, searchQuery]);

  return (
    <section className="dark:bg-[#192D64] bg-[#F2F7FE]">
      <Navbar />
      <div className="min-h-screen ">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeInUp">
                Find Amazing Deals
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-fadeInUp">
                Discover thousands of products from trusted vendors
              </p>
                <div className="max-w-2xl mx-auto animate-fadeInUp">
              <SearchWithSuggestions
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search for products, categories, or keywords..."
                suggestions={searchSuggestions}
              />
            </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8  ">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-72 flex-shrink-0">
              <div className="lg:hidden mb-4">
                <button
                  onClick={() => setShowFilters(true)}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </button>
              </div>

              <FilterSidebar
                isOpen={showFilters}
                onClose={() => setShowFilters(false)}
                filters={filters}
                onFiltersChange={handleFiltersChange}
              />
            </div>

            {/* Ads Grid */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {searchQuery
                      ? `Search Results for "${searchQuery}"`
                      : "All Ads"}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {filteredAds.length} ads found
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === "grid"
                        ? "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                        : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    }`}
                  >
                    <Grid className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === "list"
                        ?'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                    }`}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Ads Display */}
              {filteredAds.length === 0 ? (
                <div className="text-center text-gray-500">No ads found</div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAds.map((ad) => (
                    <AdCard key={ad.id} ad={ad} />
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
      </div>
      <Footer />
    </section>
  );
}
