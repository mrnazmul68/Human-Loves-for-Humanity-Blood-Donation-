import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import  upazilas  from "../assets/data/upozilas.js";



const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const SearchForm = () => {
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const filteredUpazilas = upazilas.filter((upazila) =>
    upazila.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedBloodGroup) params.append("bloodGroup", selectedBloodGroup);
    if (selectedUpazila) params.append("upazila", selectedUpazila);
    navigate(`/all-donors?${params.toString()}`);
  };

  return (
    <section
      id="search-donor-form"
      className="py-20 bg-linear-to-b from-black to-gray-950"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-sky-200 mb-12 text-center">
          Find a Blood Donor
        </h2>

        <div className="bg-gray-950 border border-gray-800 p-8 rounded-2xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="blood-group" className="block text-sm text-gray-400 mb-2">
                Blood Group
              </label>
              <select
                id="blood-group"
                value={selectedBloodGroup}
                onChange={(e) => setSelectedBloodGroup(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#E11D48] focus:border-[#E11D48]"
              >
                <option value="">Select Blood Group</option>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <label htmlFor="upazila" className="block text-sm text-gray-400 mb-2">
                Upazila
              </label>
              <div className="relative">
                <input
                  id="upazila"
                  type="text"
                  value={selectedUpazila || searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsDropdownOpen(true);
                    setSelectedUpazila("");
                  }}
                  onFocus={() => setIsDropdownOpen(true)}
                  onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#E11D48] focus:border-[#E11D48]"
                  placeholder="Search Upazila"
                />
                {isDropdownOpen && filteredUpazilas.length > 0 && (
                  <ul className="absolute top-full left-0 right-0 bg-gray-800 border border-gray-700 rounded mt-1 max-h-60 overflow-y-auto z-10">
                    {filteredUpazilas.map((upazila, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          setSelectedUpazila(upazila);
                          setSearchQuery(upazila);
                          setIsDropdownOpen(false);
                        }}
                        className="px-4 py-3 text-white hover:bg-[#E11D48] cursor-pointer transition-colors"
                      >
                        {upazila}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#E11D48] text-white font-semibold rounded-lg hover:bg-[#BE123C] transition-all hover:shadow-lg hover:shadow-[#E11D48]/40 flex items-center justify-center gap-2"
            >
              <FaSearch /> Search Donor
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SearchForm;
