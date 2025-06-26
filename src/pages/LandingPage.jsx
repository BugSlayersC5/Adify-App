import { useState, useEffect } from "react";
import useSWR from 'swr'; // Import useSWR
import { Filter, Grid, List } from "lucide-react";
import AdCard from "../components/AdCard";
import FilterSidebar from "../components/FilterSidebar";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import SearchWithSuggestions from "../components/SearchWithSuggestions";
import { apiClient } from '../../api/client';

const searchSuggestions = ["iPhone", "Samsung", "Toyota", "Dell", "Phones", "Laptops", "Vehicles"];

// Define a fetcher function for SWR
// This function will be passed to useSWR and is responsible for making the API call
const fetcher = async (url) => {
  const response = await apiClient.get(url);
  return response.data.data || response.data; // Adjust based on your API response structure
};

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

  // Use useSWR to fetch all ads
  // The first argument is the "key" (your API endpoint), the second is the fetcher function
  const { data: allAds, error, isLoading } = useSWR('/adverts/getAllAdverts?', fetcher);

  const [filteredAds, setFilteredAds] = useState([]); // State for filtered/searched ads

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    // This effect runs when filters, searchQuery, or 'allAds' (data from SWR) change
    if (!allAds) {
      setFilteredAds([]); // No data yet, so no filtered ads
      return;
    }

    let results = [...allAds]; // Start with all fetched ads

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
        ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ad.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Implement sorting
    if (filters.sortBy === "newest") {
      results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (filters.sortBy === "oldest") {
      results.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (filters.sortBy === "price_low_to_high") {
      results.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "price_high_to_low") {
      results.sort((a, b) => b.price - a.price);
    }

    setFilteredAds(results);
  }, [filters, searchQuery, allAds]); // Depend on 'allAds' from SWR

  if (isLoading) {
    return (
      <section className="bg-[#192D64]  min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">Loading advertisements...</p>
        </div>
        <Footer />
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-[#192D64] min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-500">Failed to load advertisements. Please try again later.</p>
        </div>
        <Footer />
      </section>
    );
  }

  
  return (
    <section className="bg-[#192D64] ">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8  ">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className=" fixed lg:sticky flex-shrink-0">
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
                        ? "bg-blue-900/20 text-blue-400"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <Grid className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === "list"
                        ?'bg-blue-900/20 text-blue-400'
                      : 'text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Ads Display */}
              {filteredAds.length === 0 ? (
                <div className="text-center dark:text-gray-400">No ads found matching your criteria.</div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAds.map((ad) => (
                    <AdCard key={ad._id || ad.id} ad={ad} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredAds.map((ad) => (
                    <AdCard key={ad._id || ad.id} ad={ad} />
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