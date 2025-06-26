import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { Edit, Trash2, Eye, Plus } from "lucide-react";
import Modal from "../components/Modal";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import useSWR, { mutate } from "swr";
import { apiClient, apiFetcher } from "../../api/client";
import AdCard from "../components/AdCard";
import ShoppingBagLoader from "../components/loader"; // Make sure this path is correct

export default function ManageAdvertsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false); // track deletion loading

  const { data, isLoading, error } = useSWR(`adverts/my-adverts`, apiFetcher);
  console.log("mydata:", data);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen ">
        <ShoppingBagLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#192D64]">
        <p className="text-red-500">
          Error loading advertisements. Please try again later.
        </p>
      </div>
    );
  }

  const handleDelete = async (adId) => {
    if (confirm("Are you sure you want to delete this advert?")) {
      try {
        setDeleting(true);
        await apiClient.delete(`/adverts/${adId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
          },
        });
        console.log("✅ Advert deleted:", adId);
        mutate(`adverts/my-adverts`);
      } catch (error) {
        console.error("❌ Failed to delete advert:", error);
        alert("Failed to delete advert. Please try again.");
      } finally {
        setDeleting(false);
      }
    }
  };

  return (
    <section className="bg-[#192D64]">
      {deleting && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <ShoppingBagLoader />
        </div>
      )}
      <Navbar />
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Manage Advertisements
              </h1>
            </div>
            <p className="text-gray-400">
              View and manage all your posted advertisements
            </p>
            {/* <Link
              to="/post-advert"
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="h-4 w-4" /> Post New Ad
            </Link> */}
          </div>

          {data?.adverts?.length === 0 ? (
            <div className="text-center text-white mt-20">
              <p className="text-lg">You haven’t posted any ads yet.</p>
              <Link to="/post-advert" className="mt-4 inline-block btn-primary">
                Post Your First Ad
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.adverts.map((ad) => (
                <AdCard
                  key={ad.id}
                  ad={ad}
                  viewMode="grid"
                  onEdit={(adId) => {
                    navigate(`/edit-advert/${adId}`);
                  }}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </section>
  );
}
