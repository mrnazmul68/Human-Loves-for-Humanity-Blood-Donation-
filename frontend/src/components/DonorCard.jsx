import { FaPhoneAlt, FaMapMarkerAlt, FaUser, FaWhatsapp, FaCopy, FaCheck } from "react-icons/fa";
import toast from "react-hot-toast";
import { useState } from "react";

const DonorCard = ({ donor }) => {
  const [isCopied, setIsCopied] = useState(false);
  
  const handleBookNow = () => {
    const phone = donor.phone || donor.mobile;
    if (!phone) {
      toast.error("No phone number available!");
      return;
    }

    let cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.startsWith("0")) {
      cleanPhone = "880" + cleanPhone.substring(1);
    } else if (!cleanPhone.startsWith("880")) {
      cleanPhone = "880" + cleanPhone;
    }
    
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=Are%20you%20available%20to%20donate%20blood.%20I%20need%20Emergency%20blood.`;
    window.open(whatsappUrl, "_blank");
    toast.success("Opening WhatsApp...");
  };

  const handleCopyPhone = async () => {
    const phone = donor.phone || donor.mobile;
    if (!phone) {
      toast.error("No phone number available!");
      return;
    }
    try {
      await navigator.clipboard.writeText(phone);
      setIsCopied(true);
      toast.success("Phone number copied!");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy phone number!");
    }
  };

  return (
    <div className="relative group min-w-[280px]">
      {/* Glow Border Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#E11D48]/20 to-transparent blur opacity-0 group-hover:opacity-100 transition duration-300"></div>

      {/* Card */}
      <div className="relative bg-zinc-900 backdrop-blur-lg border border-zinc-800 p-6 rounded-2xl shadow-xl transition-all duration-300  group-hover:border-[#E11D48]/40">
        {/* Top Section */}
        <div className="flex items-center gap-4 mb-5">
          <img
            src={
              donor.profilePicture &&
              donor.profilePicture.includes("cloudinary")
                ? donor.profilePicture.replace(
                    "/upload/",
                    "/upload/w_150,q_auto,f_auto/",
                  )
                : donor.profilePicture ||
                  donor.image ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    donor.name,
                  )}&background=E11D48&color=fff`
            }
            alt={donor.name}
            className="h-16 w-16 rounded-full object-cover border-2 border-[#E11D48]"
          />

          <div>
            <h3 className="text-lg font-bold text-white">{donor.name}</h3>

            {/* Blood Badge */}
            <span className="inline-block mt-1 px-3 py-1 text-sm font-semibold bg-[#E11D48]/20 text-[#E11D48] rounded-full">
              {donor.bloodGroup}
            </span>
          </div>
        </div>

        {/* Info Section */}
        <div className="space-y-3 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-[#E11D48]" />
            <span>{donor.upazila || donor.upozila}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-[#E11D48]" />
            <span>{donor.phone || donor.mobile}</span>
            <button
              onClick={handleCopyPhone}
              className="ml-auto text-gray-400 hover:text-white transition-colors"
              title="Copy phone number"
            >
              {isCopied ? <FaCheck className="text-green-500" /> : <FaCopy />}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <FaUser className="text-[#E11D48]" />
            <span>{donor.age} years old</span>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleBookNow}
          className="w-full mt-6 py-3 hover:scale-110  duration-300 rounded-lg font-semibold text-white  hover:opacity-90 transition-all shadow-md border-2 border-[#E11D48]/50 flex items-center justify-center gap-2"
        >
          <FaWhatsapp /> Book Now
        </button>
      </div>
    </div>
  );
};

export default DonorCard;
