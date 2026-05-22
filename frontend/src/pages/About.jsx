import React from "react";
// Importing premium equivalents from react-icons
import { 
  FaHeart, 
  FaDroplet, 
  FaUsers, 
  FaRegCalendarDays, 
  FaRegLightbulb,
  FaPlay, 
  FaFacebookF, 
  FaXTwitter, 
  FaLinkedinIn,
  FaShirt
} from "react-icons/fa6";
import { BiShieldQuarter } from "react-icons/bi";

export default function About() {
  // Data for Image Gallery Grid with updated React Icons
  const galleryItems = [
    {
      id: 1,
      title: "Ramadan Iftar Event",
      tag: "Community",
      desc: "Distributing balanced meals to underprivileged families and breaking fast together as one big collective community.",
      icon: <FaRegLightbulb className="w-5 h-5 text-rose-500" />,
      bgIcon: <FaRegLightbulb className="w-24 h-24 stroke-[0.5]" />
    },
    {
      id: 2,
      title: "Blood Donation Campaign",
      tag: "Emergency Response",
      desc: "Our recurring flagship drive collecting precious units of blood and building a rapid-response local donor directory.",
      icon: <FaDroplet className="w-5 h-5 text-rose-500" />,
      bgIcon: <FaDroplet className="w-24 h-24 stroke-[0.5]" />
    },
    {
      id: 3,
      title: "Social Work Activities",
      tag: "Humanity",
      desc: "Emergency disaster relief and operational development assistance provided to marginalized localized groups.",
      icon: <FaHeart className="w-5 h-5 text-rose-500" />,
      bgIcon: <FaHeart className="w-24 h-24 stroke-[0.5]" />
    },
    {
      id: 4,
      title: "Madhok Birodhi Onusthan",
      tag: "Awareness Campaign",
      desc: "Anti-Drug awareness programs engineered to guide young generations into healthy lifestyles and safe social choices.",
      icon: <BiShieldQuarter className="w-5 h-5 text-rose-500" />,
      bgIcon: <BiShieldQuarter className="w-24 h-24 stroke-[0.5]" />
    },
    {
      id: 5,
      title: "Winter Clothing Drive",
      tag: "Care Services",
      desc: "Distributing thick blankets and warm insulated jackets to vulnerable communities facing freezing conditions.",
      icon: <FaShirt className="w-5 h-5 text-rose-500" />,
      bgIcon: <FaShirt className="w-24 h-24 stroke-[0.5]" />
    },
    {
      id: 6,
      title: "Community Outreach",
      tag: "Global Good",
      desc: "Free medical checking checkups, basic sanitary education, and continuous general welfare support setups.",
      icon: <FaUsers className="w-5 h-5 text-rose-500" />,
      bgIcon: <FaUsers className="w-24 h-24 stroke-[0.5]" />
    },
  ];

  // Mock Data for Team Members
  const teamMembers = [
    {
      name: "Ahmed Rayan",
      role: "Founder & Director",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&fit=crop",
    },
    {
      name: "Nusrat Jahan",
      role: "Chief Volunteer Coordinator",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&h=256&fit=crop",
    },
    {
      name: "Tahmid Hasan",
      role: "Blood Logistics Lead",
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=256&h=256&fit=crop",
    },
    {
      name: "Sadia Afrin",
      role: "Community Organizer",
      img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=256&h=256&fit=crop",
    },
  ];

  // Mock Data for Impact Statistics
  const stats = [
    {
      count: "4,500+",
      label: "Registered Donors",
      icon: <FaDroplet className="w-6 h-6 text-rose-500" />,
    },
    {
      count: "12,200+",
      label: "Lives Saved & Assisted",
      icon: <FaHeart className="w-6 h-6 text-rose-500" />,
    },
    {
      count: "180+",
      label: "Events Conducted",
      icon: <FaRegCalendarDays className="w-6 h-6 text-rose-500" />,
    },
    {
      count: "350+",
      label: "Active Volunteers",
      icon: <FaUsers className="w-6 h-6 text-rose-500" />,
    },
  ];

  return (
    <div className="bg-slate-950  text-slate-100 min-h-screen font-sans selection:bg-rose-500 selection:text-white overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative flex-col min-h-[90vh] flex items-center justify-center px-4 py-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-950/30 via-slate-950 to-slate-950">
        <h1 className="text-4xl text-red-500">Under Development</h1> 
        <h1 className="text-4xl text-slate-400">You can see our development below</h1>
      </section>

      {/* 2. ABOUT ORGANIZATION */}
      <section className="py-24 px-4 max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Who We Are & <br />
              <span className="text-rose-500">Why Our Mission Matters</span>
            </h2>
            <p className="text-slate-400 leading-relaxed text-base sm:text-lg">
              Matoma Blood Group is a community-driven, purely humanitarian
              network focused on transforming emergency blood availability.
              Founded upon transparent assistance policies, we unite real-time
              digital networking with ground-level activation across dynamic
              socio-welfare events.
            </p>
            <p className="text-slate-400 leading-relaxed">
              We operate completely voluntarily, ensuring zero financial
              exploitation occurs within crucial, lifesaving transfusion
              pipelines.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm hover:border-rose-500/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center mb-4 border border-rose-500/20">
                <FaHeart className="w-5 h-5 text-rose-500" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Our Mission</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                To optimize local donor speeds, lower stress indexes for family
                members, and maximize available resources instantly.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm hover:border-rose-500/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center mb-4 border border-rose-500/20">
                <FaUsers className="w-5 h-5 text-rose-500" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Our Vision</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                A society where no human life is compromised simply due to
                logistical shortages or blood inventory delay factors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR WORK SHOWCASE GALLERY GRID */}
      <section className="py-24 px-4 bg-slate-900/20 border-y border-slate-900">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Our Action Showcase
            </h2>
            <p className="text-slate-400">
              From blood mobilization setups to deep seasonal humanitarian
              welfare programs — see our real-world footfall.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden shadow-xl transition-all duration-500 hover:scale-[1.02] hover:border-rose-500/30"
              >
                <div className="h-56 w-full relative bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-rose-950/10 group-hover:bg-rose-950/40 transition-all duration-500 z-10"></div>
                  <div className="text-slate-700/40 group-hover:text-rose-900/30 transition-colors duration-500 transform group-hover:scale-110 duration-700">
                    {React.cloneElement(item.bgIcon)}
                  </div>
                  <span className="absolute top-4 left-4 z-20 px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-900/90 border border-slate-800 text-rose-400 backdrop-blur-sm">
                    {item.tag}
                  </span>
                </div>

                <div className="p-6 space-y-3 relative bg-slate-900/90 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-rose-400 transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed pt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HIGHLIGHT / REEL SECTION */}
      <section className="py-24 px-4 max-w-5xl mx-auto">
        <div className="relative rounded-3xl bg-slate-900/80 border border-slate-800/80 p-8 sm:p-12 overflow-hidden text-center space-y-8 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-900/10 to-transparent pointer-events-none"></div>

          <div className="max-w-xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Watch Our Journey
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Take a multi-minute visual walkthrough across real operational
              setups, public field events, and our structural daily volunteer
              movements.
            </p>
          </div>

          {/* Video Placeholder Box */}
          <div className="relative max-w-2xl mx-auto aspect-video bg-gradient-to-b from-slate-800 to-slate-950 rounded-2xl border border-slate-700/60 flex items-center justify-center group cursor-pointer shadow-inner">
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 rounded-2xl"></div>

            {/* Pulsing Play Button */}
            <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-rose-600 group-hover:bg-rose-500 flex items-center justify-center text-white shadow-xl shadow-rose-600/40 transform transition-all duration-300 group-hover:scale-110 pl-1">
              <FaPlay className="w-5 h-5" />
            </div>

            {/* Floating Frame Tag */}
            <span className="absolute bottom-4 right-4 text-xs font-mono text-slate-400 bg-slate-900/80 px-2 py-1 rounded border border-slate-800 backdrop-blur-sm">
              03:45 HD
            </span>
          </div>
        </div>
      </section>

      {/* 5. OUR TEAM / PEOPLE */}
      <section className="py-24 px-4 max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            The People Behind Matoma
          </h2>
          <p className="text-slate-400">
            Our operations run seamlessly because of dedicated managers and
            volunteers working day in and day out.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 text-center space-y-4 hover:border-slate-700 transition-all duration-300 group"
            >
              <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden p-1 border-2 border-rose-500/20 group-hover:border-rose-500/60 transition-all duration-500">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-wide">
                  {member.name}
                </h3>
                <p className="text-sm text-rose-400 font-medium mt-0.5">
                  {member.role}
                </p>
              </div>

              {/* Social Channels icon footer */}
              <div className="flex justify-center gap-4 text-slate-500 pt-2">
                <a href="#" className="hover:text-rose-400 transition-colors">
                  <FaFacebookF className="w-4 h-4" />
                </a>
                <a href="#" className="hover:text-rose-400 transition-colors">
                  <FaXTwitter className="w-4 h-4" />
                </a>
                <a href="#" className="hover:text-rose-400 transition-colors">
                  <FaLinkedinIn className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. IMPACT STATS */}
      <section className="py-20 px-4 max-w-7xl mx-auto relative">
        <div className="absolute inset-0 bg-rose-500/5 blur-[120px] rounded-full max-w-3xl mx-auto pointer-events-none"></div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-2 backdrop-blur-md"
            >
              <div className="mx-auto w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-3">
                {stat.icon}
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                {stat.count}
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CALL TO ACTION */}
      <section className="py-24 px-4 bg-gradient-to-b from-slate-950 to-slate-900 border-t border-slate-900">
        <div className="max-w-4xl mx-auto text-center space-y-8 bg-gradient-to-r from-slate-900 to-slate-900/40 border border-slate-800 p-8 sm:p-16 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/5 blur-[80px] pointer-events-none"></div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Ready to Make a <span className="text-rose-500">Difference?</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Your single step or donor registration card can grant a family
            immediate relief during an active health emergency. Join our squad
            today.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="w-full sm:w-auto px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white font-semibold rounded-2xl shadow-lg transition-all duration-300 transform active:scale-95">
              Donate Blood
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-300 font-semibold rounded-2xl transition-all duration-300">
              Register Volunteer
            </button>
            <button className="w-full sm:w-auto px-8 py-4 text-slate-400 hover:text-white font-medium transition-colors">
              Contact Team
            </button>
          </div>
        </div>
      </section>

      {/* SIMPLE FOOTER */}
      <footer className="py-8 text-center text-xs text-slate-600 border-t border-slate-900">
        © {new Date().getFullYear()} Matoma Blood Group. Built for life saving
        impact. All rights reserved.
      </footer>
    </div>
  );
}