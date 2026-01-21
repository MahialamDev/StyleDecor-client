import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosInstance from "../../Hooks/useAxiosInstance";
import MySection from "../../Layouts/MySection";
import MyContainer from "../../Layouts/MyContainer";
import { useParams, Link } from "react-router";
import ScreenLoading from "../../Components/Animation/ScreenLoading/ScreenLoading";
import TransparentBtn from "../../Components/UI/TransparentBtn/TransparentBtn";
import { Search, Filter } from "lucide-react";
import useAuth from "../../Hooks/useAuth";
import ServiceGrid from "./ServiceGrid";

const Services = () => {
  const { searchText, setSearchText, order, setOrder } = useAuth();

  return (
    <MySection className="bg-base-100 text-base-content transition-colors duration-300">
      <MyContainer>
        <div className="-mt-5">
          <div className="text-center mb-12">
            {/* Small accent label matching the rest of the site */}
            <div className="flex items-center justify-center gap-2 text-primary font-black text-xs uppercase tracking-[0.3em] mb-3">
              Premium Solutions
            </div>

            {/* Main Title: font-black, uppercase, italic, tracking-tighter */}
            <h1 className="text-4xl md:text-5xl font-bold text-base-content uppercase tracking-tighter">
              Our <span className="text-primary">Services</span>
            </h1>

            {/* Industrial Underline */}
            <span className="block h-1.5 mx-auto w-20 bg-primary mt-4 rounded-full"></span>
          </div>

          {/* Search & Sort Wrapper */}
          <div className="mt-10 p-6 bg-base-200 border border-base-300 rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-5">
            {/* Sort Dropdown */}
            <div className="relative w-full md:w-64 group">
              <select
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                className="select select-bordered w-full bg-base-100 focus:select-primary transition-all pl-10"
              >
                <option value="">Sort By Price</option>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </select>
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-4 h-4" />
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <input
                type="search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search for your style..."
                className="input input-bordered w-full bg-base-100 focus:input-primary transition-all pl-12"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5 z-20" />
            </div>
          </div>

          <ServiceGrid />
        </div>
      </MyContainer>
    </MySection>
  );
};

export default Services;
