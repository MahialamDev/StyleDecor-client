import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router";

import banner1img from "../../../assets/banner-1.webp";
import banner2img from "../../../assets/banner-2.webp";
import banner3img from "../../../assets/banner-3.webp";

import "swiper/css";
import "swiper/css/pagination";

const Hero = () => {
  const navigate = useNavigate();
  const banners = [banner1img, banner2img, banner3img];

  return (
    // bg-base-100 dark theme switch hole auto dark background nibe
    <section className="w-full md:px-6 max-w-7xl mx-auto min-h-[90vh] overflow-x-hidden flex flex-col justify-center bg-base-100">
      
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-20 h-full py-10 md:py-0">
        
        {/* Left Side Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          // text-base-content bebohar korle dark/light auto thik hobe
          className="flex-1 max-w-lg space-y-6 text-base-content p-4"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-snug">
            Interior Design <span className="block text-primary">Solution</span>
          </h1>

          <p className="opacity-80 text-lg font-medium">
            Elevate your home with modern and elegant interior designs. Tailored
            solutions for every space, combining style, comfort, and functionality.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4">
            <button
              onClick={() => navigate("/services")}
              className="btn btn-primary text-white" 
            >
              Book Decoration Service
            </button>
            
            {/* Outline button automatic primary/secondary color theme onujayi change hobe */}
            <button className="btn btn-outline btn-secondary flex items-center gap-2">
              <CiSearch size={18} /> Explore
            </button>
          </div>

          {/* Decorative lines */}
          <div className="flex gap-3 mt-6">
            <div className="w-10 h-1 bg-primary rounded-full"></div>
            <div className="w-6 h-1 bg-base-300 rounded-full"></div>
            <div className="w-4 h-1 bg-base-200 rounded-full"></div>
          </div>
        </motion.div>

        {/* Right Side Swiper */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 w-full md:max-w-xl h-[350px] md:h-[450px] overflow-hidden md:rounded-2xl shadow-2xl"
        >
          <Swiper
            loop
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ dynamicBullets: true, clickable: true }}
            modules={[Pagination, Autoplay]}
            className="w-full h-full"
          >
            {banners.map((banner, i) => (
              <SwiperSlide key={i}>
                <div className="w-full h-full relative">
                   <img
                    src={banner}
                    alt={`banner-${i + 1}`}
                    className="w-full h-full object-cover md:rounded-2xl"
                  />
                  {/* Dark overlay for better look in dark mode (Optional) */}
                  <div className="absolute inset-0 bg-black/5 dark:bg-black/20 md:rounded-2xl transition-all"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;