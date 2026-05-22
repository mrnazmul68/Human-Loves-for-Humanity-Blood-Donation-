import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import StatsSection from "../components/StatsSection";
import SearchForm from "../components/SearchForm";
import FeaturedDonors from "../components/FeaturedDonors";
import HowItWorks from "../components/HowItWorks";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import { FaHeart } from "react-icons/fa";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const shouldScroll = sessionStorage.getItem("scrollToSearch");
    if (shouldScroll === "true") {
      sessionStorage.removeItem("scrollToSearch");
      const timeoutId = setTimeout(() => {
        const el = document.getElementById("search-donor-form");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
      return () => clearTimeout(timeoutId);
    }
  }, [location]);

  useEffect(() => {
    if (isLoading) return;
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");

    let w = (c.width = window.innerWidth);
    let h = (c.height = window.innerHeight);

    const clearColor = "rgba(0, 0, 0, .1)";
    const max = 30;
    const drops = [];

    function random(min, maxValue) {
      return Math.random() * (maxValue - min) + min;
    }

    function Drop() {}

    Drop.prototype = {
      init() {
        this.x = random(0, w);
        this.y = 0;
        this.color = "hsl(0, 100%, 50%)";
        this.w = 2;
        this.h = 1;
        this.vy = random(4, 5); // ✅ SAME SPEED
        this.vw = 3;
        this.vh = 1;
        this.size = 2;
        this.hit = random(h * 0.8, h * 0.9); // ✅ SAME HIT RANGE
        this.a = 1;
        this.va = 0.96;
      },

      draw() {
        if (this.y > this.hit) {
          ctx.beginPath();
          ctx.moveTo(this.x, this.y - this.h / 2);

          ctx.bezierCurveTo(
            this.x + this.w / 2,
            this.y - this.h / 2,
            this.x + this.w / 2,
            this.y + this.h / 2,
            this.x,
            this.y + this.h / 2,
          );

          ctx.bezierCurveTo(
            this.x - this.w / 2,
            this.y + this.h / 2,
            this.x - this.w / 2,
            this.y - this.h / 2,
            this.x,
            this.y - this.h / 2,
          );

          ctx.strokeStyle = `hsla(0, 100%, 50%, ${this.a})`;
          ctx.stroke();
          ctx.closePath();
        } else {
          ctx.fillStyle = this.color;
          ctx.fillRect(this.x, this.y, this.size, this.size * 5);
        }

        this.update();
      },

      update() {
        if (this.y < this.hit) {
          this.y += this.vy;
        } else if (this.a > 0.03) {
          this.w += this.vw;
          this.h += this.vh;

          if (this.w > 100) {
            this.a *= this.va;
            this.vw *= 0.98;
            this.vh *= 0.98;
          }
        } else {
          this.init();
        }
      },
    };

    function resize() {
      w = c.width = window.innerWidth;
      h = c.height = window.innerHeight;
    }

    function setup() {
      for (let i = 0; i < max; i++) {
        setTimeout(() => {
          const drop = new Drop();
          drop.init();
          drops.push(drop);
        }, i * 200); // ✅ SAME SPAWN TIMING
      }
    }

    let animationFrameId;

    function animate() {
      ctx.fillStyle = clearColor;
      ctx.fillRect(0, 0, w, h);

      drops.forEach((drop) => drop.draw());

      animationFrameId = requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resize);

    setup();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="w-full h-screen bg-black relative overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
        />

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-3 py-2 mb-4 rounded-full border border-rose-500/30 bg-rose-500/10 backdrop-blur-md text-rose-400 text-xs sm:text-sm font-medium tracking-wide animate-pulse">
              <FaHeart className="w-3.5 h-3.5" /> Every Drop Counts — Matoma
              Blood Group
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-sky-200 mb-4 tracking-tight">
              Save Lives with{" "}
              <span className="inline-flex">
                {"MATOMA".split("").map((letter, index) => (
                  <span
                    key={index}
                    className="drop-letter text-red-200"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-red-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              The next-generation logistics platform for life-saving blood
              coordination. Connecting donors with those in critical need
              through precision technology.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById("search-donor-form");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="px-6 py-3 bg-[#E11D48] text-white active:scale-95 animate-pulse text-base font-semibold rounded-xl hover:bg-[#BE123C] transition-all hover:shadow-lg hover:shadow-[#E11D48]/40 transform hover:-translate-y-1 w-full sm:w-auto text-center"
              >
                Find Blood Donor
              </button>
              <Link
                to="/signup"
                className="px-6 py-3 border-2 border-white text-white text-base font-semibold rounded-xl hover:bg-white hover:text-black transition-all transform hover:-translate-y-1 w-full sm:w-auto text-center"
              >
                Become a Donor
              </Link>
            </div>
          </div>
        </div>
      </div>

      <SearchForm />
      <StatsSection />
      <FeaturedDonors />
      <HowItWorks />
      <Banner />
      <Footer />
    </div>
  );
};

export default Home;
