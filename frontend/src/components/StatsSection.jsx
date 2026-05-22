import { FaUsers, FaHandshake, FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api";

const StatsSection = () => {
  const [stats, setStats] = useState({
    activeDonors: 0,
    totalDonations: 0,
    totalUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/users/stats`);
        const data = await res.json();
        if (data.success) {
          setStats(data.stats);
        }
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statsData = [
    {
      title: "Active Donors",
      number: stats.activeDonors,
      icon: <FaUsers />,
      color: "text-[#E11D48]",
    },
    {
      title: "Total Donations",
      number: stats.totalDonations,
      icon: <FaHandshake />,
      color: "text-[#E11D48]",
    },
    {
      title: "Total Users",
      number: stats.totalUsers,
      icon: <FaHeart />,
      color: "text-[#E11D48]",
    },
  ];

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-900 border border-gray-800 flex justify-center items-center flex-col p-8 rounded shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className={`text-3xl text-red-400 animate-pulse mb-4 ${stat.color}`}>
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-red-200 mb-2">
                {loading ? "..." : `${stat.number}+`}
              </h3>
              <p className="text-gray-400 uppercase font-bold text-[14px]">
                {stat.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
