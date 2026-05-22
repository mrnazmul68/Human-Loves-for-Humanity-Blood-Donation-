import { useState, useEffect, useCallback } from "react";
import { 
  FaUser, FaEnvelope, FaPhone, FaCalendar, FaMapMarkerAlt, 
  FaTint, FaCamera, FaHeartbeat, FaIdBadge, FaLocationArrow, FaCheck, FaTimes 
} from "react-icons/fa";
import { useNavigate, useBeforeUnload } from "react-router-dom";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../config/api";
import upozilas from "../assets/data/upozilas.js";
import ProfileSkeleton from "../components/ProfileSkeleton";
import Cropper from "react-easy-crop";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const MatomaProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    upozila: "",
    isDonor: "non-donor",
    bloodGroup: "",
    mobile: "",
    profilePicture: null,
    hasDonated: false,
    lastDonationDate: null,
  });
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [isProfileComplete, setIsProfileComplete] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUpozilas, setFilteredUpozilas] = useState([]);
  const [isUpozilaFocused, setIsUpozilaFocused] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [showCropModal, setShowCropModal] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const navigate = useNavigate();

  const checkProfileComplete = (data) => {
    if (data.isDonor === "donor") {
      return (
        data.name &&
        data.email &&
        data.age &&
        data.bloodGroup &&
        data.mobile &&
        data.upozila
      );
    }
    return true;
  };

  useBeforeUnload(
    useCallback(
      (event) => {
        if (isDirty) {
          event.preventDefault();
          event.returnValue = "";
          return "";
        }
      },
      [isDirty],
    ),
  );

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        try {
          const res = await fetch(`${API_BASE_URL}/api/users/${user.id}`);
          const data = await res.json();
          if (data.success) {
            setCurrentUser(data.user);
            setFormData({
              ...formData,
              ...data.user,
              profilePicture: data.user.profilePicture,
            });
            setSearchTerm(data.user.upozila || "");
            setIsProfileComplete(checkProfileComplete(data.user));
            localStorage.setItem("currentUser", JSON.stringify(data.user));
          }
        } catch (err) {
          console.error("Failed to fetch user:", err);
          setCurrentUser(user);
          setFormData({
            ...formData,
            ...user,
            profilePicture: user.profilePicture,
          });
          setSearchTerm(user.upozila || "");
          setIsProfileComplete(checkProfileComplete(user));
        }
      } else {
        navigate("/signup");
      }
      setIsFetching(false);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const complete = checkProfileComplete(formData);
    setIsProfileComplete(complete);
    if (currentUser) {
      localStorage.setItem("isProfileComplete", JSON.stringify(complete));
    }
  }, [formData, currentUser]);

  useEffect(() => {
    const filtered = upozilas.filter((u) =>
      u.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredUpozilas(filtered);
  }, [searchTerm]);

  useEffect(() => {
    if (formData.hasDonated && formData.lastDonationDate) {
      const lastDonation = new Date(formData.lastDonationDate);
      const targetDate = new Date(lastDonation);
      targetDate.setDate(targetDate.getDate() + 120);

      const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;

        if (distance < 0) {
          setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        } else {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          );
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60),
          );
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          setCountdown({ days, hours, minutes, seconds });
        }
      };

      updateCountdown();
      const interval = setInterval(updateCountdown, 1000);
      return () => clearInterval(interval);
    }
  }, [formData.hasDonated, formData.lastDonationDate]);

  useBeforeUnload(
    useCallback(
      (e) => {
        if (isDirty && formData.isDonor === "donor") {
          e.preventDefault();
          e.returnValue = "";
        }
      },
      [isDirty, formData.isDonor],
    ),
  );

  useEffect(() => {
    const handleBeforeNavigate = (e) => {
      if (isDirty && formData.isDonor === "donor") {
        const answer = window.confirm(
          "You have unsaved changes. Are you sure you want to leave?",
        );
        if (!answer) {
          e.preventDefault();
        }
      }
    };
    window.addEventListener("popstate", handleBeforeNavigate);
    return () => window.removeEventListener("popstate", handleBeforeNavigate);
  }, [isDirty, formData.isDonor]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setIsDirty(true);
  };

  const handleUpozilaSelect = (upozila) => {
    setFormData((prev) => ({ ...prev, upozila }));
    setSearchTerm(upozila);
    setIsUpozilaFocused(false);
    setIsDirty(true);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setTempImageSrc(URL.createObjectURL(file));
      setShowCropModal(true);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
    }
  };

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;
    });

  const getCroppedImg = async (imageSrc, pixelCrop) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const targetSize = 400;

    canvas.width = targetSize;
    canvas.height = targetSize;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      targetSize,
      targetSize
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/jpeg', 0.9);
    });
  };

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleSaveCroppedImage = async () => {
    try {
      const croppedBlob = await getCroppedImg(tempImageSrc, croppedAreaPixels);
      const croppedFile = new File([croppedBlob], 'cropped-profile.jpg', { type: 'image/jpeg' });
      
      setFormData((prev) => ({
        ...prev,
        profilePicture: URL.createObjectURL(croppedBlob),
      }));
      setProfilePictureFile(croppedFile);
      setIsDirty(true);
      setShowCropModal(false);
      setTempImageSrc(null);
    } catch (error) {
      console.error('Error cropping image:', error);
      toast.error('Failed to crop image');
    }
  };

  const validateDonorFields = () => {
    if (formData.isDonor === "donor") {
      if (!formData.bloodGroup) {
        toast.error("Please select your blood group");
        return false;
      }
      if (!formData.age) {
        toast.error("Please enter your age");
        return false;
      }
      if (!formData.mobile) {
        toast.error("Please enter your mobile number");
        return false;
      }
      if (!formData.upozila) {
        toast.error("Please select your upozila");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateDonorFields()) return;

    setLoading(true);
    try {
      let updatedFormData = { ...formData };

      if (updatedFormData.hasDonated && !updatedFormData.lastDonationDate) {
        updatedFormData.lastDonationDate = new Date()
          .toISOString()
          .split("T")[0];
      }

      setFormData(updatedFormData);

      const formDataToSend = new FormData();

      Object.keys(updatedFormData).forEach((key) => {
        if (
          updatedFormData[key] !== null &&
          updatedFormData[key] !== undefined
        ) {
          formDataToSend.append(key, updatedFormData[key]);
        }
      });

      if (profilePictureFile) {
        formDataToSend.append("profilePicture", profilePictureFile);
      }

      const res = await fetch(
        `${API_BASE_URL}/api/users/${currentUser.id}`,
        {
          method: "PUT",
          body: formDataToSend,
        },
      );

      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        setCurrentUser(data.user);
        setIsDirty(false);
        setProfilePictureFile(null);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    if (isDirty) {
      const confirmLeave = window.confirm(
        "You have unsaved changes! Are you sure you want to leave?",
      );
      if (!confirmLeave) return;
    }
    if (currentUser && currentUser.isDonor === "donor" && !isProfileComplete) {
      toast.error("Please complete your profile first!");
    } else {
      navigate("/");
    }
  };

  if (isFetching) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="min-h-screen bg-black text-white pt-16 pb-12 px-4">
      {showCropModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-zinc-800">
            <h2 className="text-xl font-semibold">Crop Profile Picture</h2>
            <button
              onClick={() => setShowCropModal(false)}
              className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>
          <div className="flex-1 relative bg-zinc-900">
            <Cropper
              image={tempImageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onCropComplete={handleCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div className="p-6 border-t border-zinc-800 bg-zinc-900">
            <div className="mb-6">
              <label className="block text-sm font-medium text-zinc-300 mb-2">Zoom</label>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full accent-red-600"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowCropModal(false)}
                className="flex-1 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCroppedImage}
                className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <FaCheck /> Save
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <button
            onClick={handleBackToHome}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl hover:bg-zinc-700 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Left Side - Profile Picture and Details */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              {formData.isDonor === "donor" && (
                <>
                  <div className="mb-4">
                    <label className="flex items-center gap-3 p-3 bg-zinc-800 rounded-xl cursor-pointer w-full border border-zinc-700 hover:border-red-500 transition-colors">
                      <input
                        type="checkbox"
                        name="hasDonated"
                        checked={formData.hasDonated}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            hasDonated: e.target.checked,
                            lastDonationDate: e.target.checked
                              ? new Date().toISOString().split("T")[0]
                              : null,
                          }));
                          setIsDirty(true);
                        }}
                        className="w-5 h-5 text-red-600 bg-zinc-700 border-zinc-600 rounded"
                      />
                      <span className="text-zinc-200 font-medium">
                        I have donated recently
                      </span>
                    </label>
                  </div>
                  {formData.hasDonated && (
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Last Donation Date
                      </label>
                      <input
                        type="date"
                        name="lastDonationDate"
                        value={formData.lastDonationDate || ""}
                        onChange={handleInputChange}
                        max={new Date().toISOString().split("T")[0]}
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:outline-none focus:border-red-500 transition-colors"
                      />
                    </div>
                  )}
                </>
              )}
              <div className="flex flex-col items-center">
                <div className="relative mb-6">
                  <div className="w-40 h-40 rounded-full bg-zinc-800 border-4 border-zinc-700 flex items-center justify-center overflow-hidden">
                    {formData.profilePicture ? (
                      <img
                        src={
                          formData.profilePicture.includes('cloudinary')
                            ? formData.profilePicture.replace('/upload/', '/upload/w_800,q_auto,f_auto/')
                            : formData.profilePicture
                        }
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaUser className="text-5xl text-zinc-500" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-red-600 p-3 rounded-full cursor-pointer hover:bg-red-700 transition-colors shadow-lg">
                    <FaCamera className="text-lg" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>

                <h2 className="text-2xl font-bold mb-1">
                  {formData.name || "Your Name"}
                </h2>
                <p className="text-zinc-400 flex items-center gap-2 mb-4">
                  <FaIdBadge />{" "}
                  {formData.isDonor === "donor"
                    ? "Blood Donor"
                    : "Community Member"}
                </p>

                {formData.isDonor === "donor" && formData.bloodGroup && (
                  <div className="bg-red-900/30 border border-red-700/50 px-6 py-3 rounded-xl mb-4">
                    <span className="text-red-300 font-semibold">
                      <FaTint className="inline mr-2" /> {formData.bloodGroup}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-4 pt-6 border-t border-zinc-800">
                <div className="flex items-center gap-3 text-zinc-300">
                  <div className="bg-zinc-800 p-2 rounded-lg">
                    <FaEnvelope className="text-red-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-zinc-500 uppercase tracking-wider">
                      Email
                    </p>
                    <p className="text-sm truncate">
                      {formData.email || "Not set"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-zinc-300">
                  <div className="bg-zinc-800 p-2 rounded-lg">
                    <FaPhone className="text-red-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-zinc-500 uppercase tracking-wider">
                      Mobile
                    </p>
                    <p className="text-sm truncate">
                      {formData.mobile || "Not set"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-zinc-300">
                  <div className="bg-zinc-800 p-2 rounded-lg">
                    <FaCalendar className="text-red-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-zinc-500 uppercase tracking-wider">
                      Age
                    </p>
                    <p className="text-sm">
                      {formData.age ? `${formData.age} years` : "Not set"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-zinc-300">
                  <div className="bg-zinc-800 p-2 rounded-lg">
                    <FaLocationArrow className="text-red-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-zinc-500 uppercase tracking-wider">
                      Location
                    </p>
                    <p className="text-sm truncate">
                      {formData.upozila || "Not set"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {formData.isDonor === "donor" &&
              formData.hasDonated &&
              formData.lastDonationDate && (
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FaHeartbeat className="text-red-500" /> Next Donation
                  </h3>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { label: "Days", value: countdown.days },
                      { label: "Hours", value: countdown.hours },
                      { label: "Mins", value: countdown.minutes },
                      { label: "Secs", value: countdown.seconds },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="bg-zinc-800 rounded-lg p-3 text-center"
                      >
                        <div className="text-2xl font-bold text-red-500">
                          {String(item.value).padStart(2, "0")}
                        </div>
                        <div className="text-xs text-zinc-400 mt-1">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>

          {/* Right Side - Form Inputs */}
          <div className="lg:col-span-8 space-y-6">
            {/* Top - Donor Selection */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Donor Status</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex items-center gap-3 p-4 border border-zinc-700 rounded-xl cursor-pointer hover:border-red-500 transition-colors">
                  <input
                    type="radio"
                    name="isDonor"
                    value="donor"
                    checked={formData.isDonor === "donor"}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-red-600 bg-zinc-700 border-zinc-600"
                  />
                  <div>
                    <span className="font-semibold text-white">Donor</span>
                    <p className="text-sm text-zinc-400">
                      I want to donate blood
                    </p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 border border-zinc-700 rounded-xl cursor-pointer hover:border-red-500 transition-colors">
                  <input
                    type="radio"
                    name="isDonor"
                    value="non-donor"
                    checked={formData.isDonor === "non-donor"}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-red-600 bg-zinc-700 border-zinc-600"
                  />
                  <div>
                    <span className="font-semibold text-white">Non-Donor</span>
                    <p className="text-sm text-zinc-400">
                      Just a community member
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Bottom - Other Inputs */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-6">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2 flex items-center gap-2">
                    <FaUser className="text-zinc-500" /> Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:outline-none focus:border-red-500 transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2 flex items-center gap-2">
                    <FaEnvelope className="text-zinc-500" /> Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:outline-none focus:border-red-500 transition-colors"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2 flex items-center gap-2">
                    <FaCalendar className="text-zinc-500" /> Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                    min="18"
                    max="65"
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:outline-none focus:border-red-500 transition-colors"
                    placeholder="Your age"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2 flex items-center gap-2">
                    <FaPhone className="text-zinc-500" /> Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:outline-none focus:border-red-500 transition-colors"
                    placeholder="+880 1XXXXXXXXX"
                  />
                </div>

                <div className="md:col-span-2 relative">
                  <label className="block text-sm font-medium text-zinc-300 mb-2 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-zinc-500" /> Upozila/Area
                  </label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsUpozilaFocused(true)}
                    onBlur={() =>
                      setTimeout(() => setIsUpozilaFocused(false), 200)
                    }
                    required
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:outline-none focus:border-red-500 transition-colors"
                    placeholder="Search your area (Dhaka, Chittagong, Cumilla, etc.)"
                  />
                  {isUpozilaFocused && filteredUpozilas.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-800 border border-zinc-700 rounded-xl shadow-2xl max-h-64 overflow-y-auto z-50">
                      {filteredUpozilas.map((upozila, index) => (
                        <button
                          key={index}
                          type="button"
                          onMouseDown={() => handleUpozilaSelect(upozila)}
                          className="w-full text-left px-4 py-3 hover:bg-zinc-700 transition-colors text-zinc-200 border-b border-zinc-700 last:border-0"
                        >
                          {upozila}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {formData.isDonor === "donor" && (
                  <div className="md:col-span-2 pt-6 border-t border-zinc-800">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2 flex items-center gap-2">
                        <FaTint className="text-red-500" /> Blood Group
                      </label>
                      <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:outline-none focus:border-red-500 transition-colors"
                      >
                        <option value="">Select blood group</option>
                        {bloodGroups.map((group) => (
                          <option key={group} value={group}>
                            {group}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-xl transition-all hover:shadow-lg hover:shadow-red-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <FaUser /> {loading ? "Saving..." : "Save Profile"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MatomaProfile;
