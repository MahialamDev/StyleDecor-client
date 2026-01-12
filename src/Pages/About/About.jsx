import React from "react";
import { motion } from "framer-motion";
import { IoBrushOutline, IoPeopleOutline, IoShieldCheckmarkOutline } from "react-icons/io5";
import MyContainer from "../../Layouts/MyContainer";
import { Info } from "lucide-react";

const About = () => {
  return (
    <div className="py-16 md:py-24 bg-transparent transition-colors duration-300">
      <MyContainer>
        {/* Page Heading: Unified Design System */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-2 text-primary font-black text-xs uppercase tracking-[0.3em] mb-3">
            <Info size={14} /> Our Story
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-base-content uppercase italic tracking-tighter">
            About <span className="text-primary">Style Decor</span>
          </h1>
          <div className="mt-4 flex justify-center">
            <span className="h-1.5 w-20 bg-primary rounded-full"></span>
          </div>
        </motion.div>

        {/* Who We Are Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row items-center gap-12 mb-24"
        >
          {/* Image with Industrial Frame */}
          <div className="w-full lg:w-1/2 p-2 bg-base-100 border-2 border-base-300 rounded-[2.5rem] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop" 
              alt="About StyleDecor Interior"
              className="w-full h-[350px] md:h-[450px] object-cover rounded-[2rem]"
            />
          </div>

          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-3xl font-black text-base-content uppercase italic tracking-tight">
              Who <span className="text-primary">We Are</span>
            </h2>
            <p className="text-base-content/70 font-medium leading-relaxed text-lg">
              StyleDecor is an industrial-grade service management ecosystem 
              designed for the modern interior landscape. 
            </p>
            <p className="text-base-content/60 font-medium leading-relaxed">
              We provide a seamless digital workflow where users can book premium services, 
              schedule high-level consultations, and track project progress in real-time. 
              Our mission is to eliminate traditional bottlenecks and bring 
              <span className="text-primary italic font-bold"> transparency </span> 
              to every decoration phase.
            </p>
            
            <div className="pt-4">
               <button className="btn btn-primary rounded-xl px-10 font-black uppercase italic tracking-widest text-xs">
                  Discover Our Mission
               </button>
            </div>
          </div>
        </motion.div>

        {/* Our Values Section */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <IoBrushOutline />,
              title: "Creative Designs",
              desc: "We deliver unique and stylish decoration packages tailored specifically to your event architecture."
            },
            {
              icon: <IoPeopleOutline />,
              title: "Customer Focused",
              desc: "Our platform ensures a precision experience for users with real-time updates on every service phase."
            },
            {
              icon: <IoShieldCheckmarkOutline />,
              title: "Trusted Teams",
              desc: "We collaborate exclusively with verified, industrial-grade experienced decorator collectives."
            }
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="p-10 bg-base-100 border-2 border-base-300 rounded-[2.5rem] text-center flex flex-col items-center gap-6 group hover:border-primary transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-primary/5"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-4xl group-hover:bg-primary group-hover:text-white transition-all duration-300">
                {value.icon}
              </div>
              <h3 className="text-xl font-black text-base-content uppercase italic tracking-tight">
                {value.title}
              </h3>
              <p className="text-base-content/60 text-sm font-medium leading-relaxed">
                {value.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </MyContainer>
    </div>
  );
};

export default About;