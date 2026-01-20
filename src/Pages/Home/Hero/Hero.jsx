import React from 'react';
import MyContainer from '../../../Layouts/MyContainer';
import { ArrowRight, CheckCircle2, Layout, Zap } from 'lucide-react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Autoplay, Pagination } from 'swiper/modules';

import banner1img from "../../../assets/banner-1.webp";
import banner2img from "../../../assets/banner-2.webp";
import banner3img from "../../../assets/banner-3.webp";

const images = [banner1img, banner2img, banner3img]


const Hero = () => {
  return (
    <section className="bg-base-100 py-8 md:py-16 lg:py-28 overflow-hidden">
      <MyContainer>
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ">
          
          {/* Left Content */}
          <div className="flex-1 order-2 lg:order-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg mb-6">
              <Zap size={16} className="text-primary fill-primary" />
              <span className="text-xs font-black uppercase tracking-widest text-primary">
                Interior Excellence
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-base-content uppercase tracking-tighter leading-none mb-6">
              Modern Spaces <br />
              For <span className="text-primary">Better Living</span>
            </h1>

            <p className="text-base-content/70 text-lg md:text-xl max-w-xl mb-10 font-medium leading-relaxed">
              Transform your house into a masterpiece with our top-rated interior decorators. 
              Simple, functional, and aesthetically pleasing designs tailored for you.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button className="btn btn-primary btn-lg rounded-xl px-10 font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20">
                Start Planning
              </button>
              <button className="btn btn-outline border-2 btn-lg rounded-xl px-8 font-black uppercase tracking-widest text-sm">
                Our Gallery
              </button>
            </div>

            {/* Quick Benefits */}
            <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-primary" />
                <span className="text-sm font-bold uppercase tracking-tight">Expert Team</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-primary" />
                <span className="text-sm font-bold uppercase tracking-tight">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-primary" />
                <span className="text-sm font-bold uppercase tracking-tight">Best Pricing</span>
              </div>
            </div>
          </div>

          {/* Right Content: Clean Modern Image Grid */}
          <div className="flex-1 order-1 lg:order-2 w-full">
            <div className="relative">
              {/* Main Decorative Background */}
              <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] -z-10 rotate-3"></div>
              
              {/* Image Placeholder Frame */}
<div className="relative aspect-[4/3] w-full bg-base-200 border-2 border-base-300 rounded-[2.5rem] overflow-hidden shadow-2xl">
  
  {/* Background Pattern/Gradient (Ata thakbe jate image load hote deri holeo baje na lage) */}
  <div className="absolute inset-0 bg-gradient-to-br from-base-300 to-base-100 flex items-center justify-center">
                  {/* Ekhane div soriye direct img tag use kora hoyeche */}
                  
                  <Swiper
        pagination={{
          dynamicBullets: true,
                    }}
                    autoplay={{
          delay: 2500,
          disableOnInteraction: false,
                    }}
                    
                    loop={true}
        modules={[Pagination, Autoplay]}
        className="mySwiper w-full h-full"
      >
                    {images.map((image, i)=> <SwiperSlide key={i}>
                       <img 
      src={image} 
      alt="Banner" 
      className="w-full h-full object-cover" 
    />
        </SwiperSlide>)}
      </Swiper>
   
  </div>

  {/* Overlapping Info Tag */}
  <div className="absolute top-8 left-8 bg-base-100/80 backdrop-blur-md px-5 py-3 rounded-2xl border border-base-300 shadow-sm z-10">
    <div className="flex items-center gap-3">
      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
      <span className="text-xs font-black uppercase tracking-widest text-base-content">
        Active Projects
      </span>
    </div>
  </div>
</div>

              {/* Action Button Overlay */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary rounded-full flex items-center justify-center border-8 border-base-100 shadow-xl cursor-pointer hover:scale-110 transition-transform duration-300 z-10">
                <ArrowRight size={32} className="text-primary-content" />
              </div>
            </div>
          </div>

        </div>

        
     {/* Add Something Div -> Trusted Stats/Brands Bar */}
<div className="mt-16 h-24 w-full border-y border-base-300 flex items-center justify-around bg-base-100/50 backdrop-blur-sm px-4 overflow-x-auto no-scrollbar">
  
  {/* Stat 1 */}
  <div className="flex flex-col items-center min-w-[120px]">
    <span className="text-2xl font-black text-primary tracking-tighter">12K+</span>
    <span className="text-[10px] font-bold uppercase opacity-50 tracking-[0.2em]">Dream Homes</span>
  </div>

  {/* Divider */}
  <div className="h-8 w-[1px] bg-base-300 hidden md:block"></div>

  {/* Stat 2 */}
  <div className="flex flex-col items-center min-w-[120px]">
    <span className="text-2xl font-black text-base-content tracking-tighter">4.9/5</span>
    <span className="text-[10px] font-bold uppercase opacity-50 tracking-[0.2em]">Client Rating</span>
  </div>

  {/* Divider */}
  <div className="h-8 w-[1px] bg-base-300 hidden md:block"></div>

  {/* Stat 3 */}
  <div className="flex flex-col items-center min-w-[120px]">
    <span className="text-2xl font-black text-base-content tracking-tighter">15+</span>
    <span className="text-[10px] font-bold uppercase opacity-50 tracking-[0.2em]">Awards Won</span>
  </div>

  {/* Divider */}
  <div className="h-8 w-[1px] bg-base-300 hidden md:block"></div>

  {/* Stat 4 */}
  <div className="flex flex-col items-center min-w-[120px]">
    <span className="text-2xl font-black text-base-content tracking-tighter">100%</span>
    <span className="text-[10px] font-bold uppercase opacity-50 tracking-[0.2em]">Handpicked Experts</span>
  </div>

</div>
      </MyContainer>

    </section>
  );
};

export default Hero;