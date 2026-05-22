import img from "../assets/banner.jpg";
import { FaHeart, FaHandHoldingMedical, FaTint } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="pt-20 px-4 bg-black text-white grid md:grid-cols-2 md:px-16 py-20 gap-10 grid-cols-1">
      {/* IMAGE SECTION */}
      <div className="md:h-[76vh] h-[36vh] w-[80vw] md:w-[40vw] relative rounded-2xl">
        <img
          className="h-full w-full object-cover object-center"
          src={img}
          alt="MATOMA Blood Donation"
          loading="lazy"
        />
   
   {/* small card on image */}

        <div className="h-42 p-3 flex flex-col gap-2 w-58 border  border-gray-800 rounded-2xl backdrop-blur-2xl absolute -bottom-10 -right-10">
          <h1 className="opacity-80">Life Saving Network</h1>

          <p className="text-[12px] opacity-75">
            Connecting voluntary blood donors with patients in critical need —
            fast, reliable, and life-saving coordination
          </p>

          <div className="flex justify-between items-center">
            <div className="flex gap-1 items-center">
              <h1>Donor Activity</h1>
            </div>

            <h1 className="font-bold text-red-500 text-[12px]">LIVE <span className="animate-pulse text-4xl">•</span></h1>
          </div>
        </div>
      </div>

      {/* TEXT SECTION */}
      <div className="flex pt-10 md:pt-0 flex-col gap-3">
        <div className="relative inline-block px-2 w-fit md:px-6 py-1.5">
          <div
            className="absolute inset-0 bg-primary z-0"
            style={{
              clipPath:
                "polygon(2% 15%, 0% 50%, 3% 85%, 15% 95%, 50% 90%, 85% 95%, 98% 80%, 100% 50%, 97% 20%, 85% 5%, 50% 10%, 15% 5%)",
            }}
          ></div>

          <h1 className="relative z-10 text-black md:text-1xl text-[10px] font-black tracking-[1px] uppercase font-sans">
            Save Lives Today
          </h1>
        </div>

        <h1 className="text-4xl opacity-90 py-4">
          MATOMA – A Blood Donation Lifeline
        </h1>

        <p className="opacity-75">
          Join a powerful network of blood donors and help save lives in
          emergency situations. One donation can give someone a second chance at
          life.
        </p>

        <p className="opacity-75">
          Easily find donors by blood group and location, or register yourself
          to become a life saver. Fast coordination during critical medical
          emergencies.
        </p>

        <p className="opacity-75">
          Built for hospitals, patients, and volunteers — MATOMA ensures no one
          dies waiting for blood.
        </p>

        {/* ICON SECTION */}
        <div className="text-4xl text-red-400 grid grid-cols-3 place-items-center pt-10">
          <div className="w-full flex justify-center border-r border-red-900/40">
            <FaHeart />
          </div>

          <div className="w-full flex justify-center border-r border-red-900/40">
            <FaHandHoldingMedical />
          </div>

          <div className="w-full flex justify-center">
            <FaTint />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
