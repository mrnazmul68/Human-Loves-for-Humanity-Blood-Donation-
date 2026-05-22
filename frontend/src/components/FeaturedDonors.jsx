import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import DonorCard from "./DonorCard";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../config/api";

const FeaturedDonors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/donors`);
        const data = await res.json();
        if (data.success) {
          setDonors(data.donors);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        toast.error("Failed to fetch donors!", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDonors();
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-sky-200">Featured Donors</h2>
        </div>
        <div className="flex justify-between mb-4 space-x-2">
          <button
            onClick={scrollLeft}
            className="p-3 bg-gray-800 text-white rounded-lg hover:bg-[#E11D48] transition-colors"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={scrollRight}
            className="p-3 bg-gray-800 text-white rounded-lg hover:bg-[#E11D48] transition-colors"
          >
            <FaChevronRight />
          </button>
        </div>

        <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            height: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #1a1a1a;
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #E11D48;
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #BE123C;
          }
        `}</style>
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600"></div>
          </div>
        ) : donors.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            No donors available yet.
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="flex space-x-6 overflow-x-auto pb-4 custom-scrollbar"
          >
            {donors.map((donor) => (
              <DonorCard key={donor.id} donor={donor} />
            ))}
          </div>
        )}

        <div className="text-center flex justify-end mt-8">
          <Link
            to="/all-donors"
            className="flex items-center gap-3 w-fit px-8 py-3 border-2 border-[#E11D48] text-[#E11D48] font-semibold rounded-lg hover:bg-[#E11D48] hover:text-white transition-all"
          >
            View All Donors <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDonors;
