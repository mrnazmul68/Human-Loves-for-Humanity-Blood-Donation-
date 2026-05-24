import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DonorCard from "../components/DonorCard";
import DonorCardSkeleton from "../components/DonorCardSkeleton";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../config/api";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const AllDonors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const donorsPerPage = 6;

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/users/donors`);
        const data = await res.json();
        if (data.success) {
          setDonors(data.donors);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        toast.error("Failed to fetch donors!");
      } finally {
        setLoading(false);
      }
    };
    fetchDonors();
  }, []);

  useEffect(() => {
    const bloodGroup = searchParams.get("bloodGroup");
    const upazila = searchParams.get("upazila");
    if (!bloodGroup && !upazila) {
      setSearchQuery("");
    }
    setCurrentPage(1);
  }, [searchParams]);

  const filteredDonors = donors.filter(
    (donor) => {
      const bloodGroupParam = searchParams.get("bloodGroup");
      const upazilaParam = searchParams.get("upazila");
      
      let matches = true;
      
      if (bloodGroupParam) {
        matches = matches && donor.bloodGroup && donor.bloodGroup.toLowerCase() === bloodGroupParam.toLowerCase();
      }
      if (upazilaParam) {
        matches = matches && (donor.upozila && donor.upozila.toLowerCase() === upazilaParam.toLowerCase());
      }
      
      if (searchQuery) {
        const matchesName = donor.name && donor.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesBloodGroup = donor.bloodGroup && donor.bloodGroup.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesUpazila = (donor.upozila && donor.upozila.toLowerCase().includes(searchQuery.toLowerCase()));
        matches = matches && (matchesName || matchesBloodGroup || matchesUpazila);
      }
      
      return matches;
    },
  );

  const indexOfLastDonor = currentPage * donorsPerPage;
  const indexOfFirstDonor = indexOfLastDonor - donorsPerPage;
  const currentDonors = filteredDonors.slice(
    indexOfFirstDonor,
    indexOfLastDonor,
  );
  const totalPages = Math.ceil(filteredDonors.length / donorsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getVisiblePages = () => {
    const maxVisible = 5;
    let startPage, endPage;

    if (totalPages <= maxVisible) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const half = Math.floor(maxVisible / 2);
      if (currentPage <= half) {
        startPage = 1;
        endPage = maxVisible;
      } else if (currentPage + half >= totalPages) {
        startPage = totalPages - maxVisible + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - half;
        endPage = currentPage + half;
      }
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="min-h-screen bg-black pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-sky-200 mb-8 text-center">
          All Donors
        </h1>

        <div className="mb-10  max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search by name, blood group, or upazila..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E11D48] focus:border-[#E11D48]"
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <DonorCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {currentDonors.map((donor) => (
                <DonorCard key={donor.id} donor={donor} />
              ))}
            </div>

            {filteredDonors.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                No donors found
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center justify-center ${
                    currentPage === 1
                      ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <FaChevronLeft />
                </button>

                {visiblePages.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => paginate(pageNumber)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentPage === pageNumber
                        ? "bg-[#E11D48] text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center justify-center ${
                    currentPage === totalPages
                      ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <FaChevronRight />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllDonors;
