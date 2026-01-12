import React, { useState } from "react";
import MyLink from "../../UI/MyLink/MyLink";
import Logo from "../../UI/Logo/Logo";
import { BaggageClaim, Edit, LogOut, ShoppingCart, User } from "lucide-react";
import { CgMenuRightAlt } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import { PuffLoader } from "react-spinners";
import PrimaryBtn from "../../UI/PrimaryBtn/primaryBtn";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion"; // Fix: motion/react theke framer-motion e anai bhalo
import TransparentBtn from "../../UI/TransparentBtn/TransparentBtn";
import { useTheme } from "next-themes";
import { MdOutlineDashboard } from "react-icons/md";

const Navbar = () => {
  const { user, loading, logOutUser } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const links = (
    <>
      <li><MyLink to="/">Home</MyLink></li>
      <li><MyLink to="/services">Services</MyLink></li>
      <li><MyLink to="/about">About</MyLink></li>
      <li><MyLink to="/decorator-apply">Apply For Decorator</MyLink></li>
      {user && (
        <li><MyLink to="/dashboard/my-bookings">Dashboard</MyLink></li>
      )}
    </>
  );

  const handleSignOut = () => {
    logOutUser()
      .then(() => toast.warning("Sign Out Successfully!"))
      .catch((err) => toast.error(err.message));
  };

  return (
    /* bg-base-100/80 bebohar kora hoyeche dark mode e deep color pabar jonno */
    <header className="sticky top-0 bg-base-100/80 flex w-full py-5 border-b border-primary/20 backdrop-blur-md z-50 transition-colors duration-300">
      <div className="px-4 md:px-6 mx-auto max-w-7xl flex items-center justify-between w-full">
        
        {/* Mobile Menu Icon */}
        <CgMenuRightAlt
          onClick={() => setOpen(!open)}
          size={22}
          className="md:hidden cursor-pointer text-base-content"
        />
        
        <Logo />

        {/* Navlinks Desktop */}
        <nav className="hidden md:flex items-center">
          <ul className="flex items-center gap-10">{links}</ul>
        </nav>

        <AnimatePresence>
          {/* Navlinks Mobile */}
          {open && (
            <nav
              onClick={() => setOpen(false)}
              className="md:hidden fixed inset-0 z-50 h-screen w-full bg-black/60 backdrop-blur-sm"
            >
              <motion.div
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -200, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                className="bg-base-100 h-full w-[80%] p-6 shadow-2xl flex flex-col"
              >
                <div className="flex items-center justify-between mb-8">
                  <Logo />
                  <p
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-1 cursor-pointer text-sm font-bold text-error"
                  >
                    <RxCross2 size={20} /> Close
                  </p>
                </div>
                <ul className="flex flex-col gap-6 w-full text-lg">{links}</ul>
              </motion.div>
            </nav>
          )}
        </AnimatePresence>

        {/* Icons & Profile */}
        <div className="flex gap-4 md:gap-6 items-center">
          
          {/* Theme Controller */}
          <label className="swap swap-rotate text-base-content">
            <input 
              type="checkbox" 
              className="theme-controller hidden" 
              onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')} 
              checked={theme === 'dark'}
            />
            {/* Sun icon */}
            <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
            {/* Moon icon */}
            <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.69Z"/></svg>
          </label>

          <div className="relative text-base-content hover:text-primary transition-colors">
            <Link to="/dashboard/my-bookings">
              <MdOutlineDashboard size={24} />
              
            </Link>
          </div>

          {/* User Profile Img */}
          {loading ? (
            <PuffLoader color="#69C5D3" size={20} />
          ) : user ? (
            <div className="dropdown dropdown-bottom dropdown-end">
              <div tabIndex={0} role="button" className="m-1 cursor-pointer">
                <div className="w-9 h-9 border-2 border-primary rounded-full flex items-center justify-center overflow-hidden hover:scale-105 transition-transform">
                  <img
                    className="mx-auto object-cover w-full h-full"
                    src={user?.photoURL}
                    alt="profile"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content border border-base-300 menu bg-base-100 rounded-box z-[100] w-60 p-5 shadow-2xl mt-4 space-y-3"
              >
                <div className="w-12 h-12 border-2 border-primary rounded-full mx-auto overflow-hidden">
                  <img
                    className="object-cover w-full h-full"
                    src={user?.photoURL}
                    alt="profile"
                  />
                </div>
                <div className="text-center">
                  <p className="font-bold text-base-content leading-none">{user.displayName}</p>
                  <p className="text-[10px] opacity-50 truncate">{user.email}</p>
                </div>
                
                <div className="divider my-0"></div>

                <TransparentBtn onClick={()=> navigate('/dashboard/my-profile')} className='w-full flex items-center gap-2 justify-center border-base-300'>
                  <Edit size={16} /> View Profile
                </TransparentBtn>

                <PrimaryBtn
                  onClick={handleSignOut}
                  className="w-full flex gap-2 items-center justify-center text-white"
                >
                  <LogOut size={16} /> Log Out
                </PrimaryBtn>
              </ul>
            </div>
          ) : (
            <Link className="flex gap-2 items-center text-base-content font-medium hover:text-primary transition-colors" to="/login">
              <User size={22} /> <span className="hidden md:inline-block">Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;