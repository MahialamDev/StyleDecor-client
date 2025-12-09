import React from "react";
import { motion } from "framer-motion";
import { IoBrushOutline, IoPeopleOutline, IoShieldCheckmarkOutline } from "react-icons/io5";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-2 md:px-6 py-5 md:py-16 space-y-16">
      {/* Page Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl md:text-4xl font-semibold text-gray-800 text-center"
          >
              <p className="text-[16px] uppercase leading-slug text-gray-500">About</p>
               Style Decor
              <span className='block h-1 mx-auto w-10 bg-secondary mt-1'></span>
      </motion.h1>

      {/* Who We Are Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row items-center gap-12"
      >
        <img
          src="https://media.gettyimages.com/id/941782244/photo/portrait-of-a-young-school-boy-smiling.jpg?s=612x612&w=gi&k=20&c=Wux2VHow3B-MWiUmXrCp4fr5_HFDSFSbknTF3qJvfXA=" 
          alt="About StyleDecor"
          className="w-full md:w-1/2 rounded-xl shadow-xl"
        />
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">Who We Are</h2>
          <p className="text-gray-600 leading-relaxed">
            StyleDecor is a modern appointment & service management system for local decoration businesses. 
            Users can book services, schedule consultations, check availability, make payments, and track service progress.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to digitalize traditional workflows, reduce waiting times, and provide a seamless solution for both users and decorators.
          </p>
        </div>
      </motion.div>

      {/* Our Values Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="grid md:grid-cols-3 gap-8"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-8 bg-white shadow-lg rounded-xl text-center flex flex-col items-center gap-4"
        >
          <IoBrushOutline className="text-primary text-4xl" />
          <h3 className="text-xl font-semibold">Creative Designs</h3>
          <p className="text-gray-600">
            We deliver unique and stylish decoration packages tailored to your event.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-8 bg-white shadow-lg rounded-xl text-center flex flex-col items-center gap-4"
        >
          <IoPeopleOutline className="text-primary text-4xl" />
          <h3 className="text-xl font-semibold">Customer Focused</h3>
          <p className="text-gray-600">
            Our platform ensures a smooth experience for users and real-time updates on service progress.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-8 bg-white shadow-lg rounded-xl text-center flex flex-col items-center gap-4"
        >
          <IoShieldCheckmarkOutline className="text-primary text-4xl" />
          <h3 className="text-xl font-semibold">Trusted Decorators</h3>
          <p className="text-gray-600">
            We collaborate only with verified and experienced decorator teams.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
