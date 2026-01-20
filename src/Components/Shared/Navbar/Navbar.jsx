import React, { useState, useEffect } from "react";
import MyLink from "../../UI/MyLink/MyLink";
import Logo from "../../UI/Logo/Logo";
import { LogOut, Menu, X, LayoutDashboard, UserCircle, Moon, Sun } from "lucide-react";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { user, loading, logOutUser } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => setMounted(true), []);

  // --- স্ক্রল লক করার লজিক ---
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  const handleSignOut = () => {
    logOutUser()
      .then(() => {
        toast.warning("Logged out!");
        setOpen(false);
      })
      .catch((err) => toast.error(err.message));
  };

  const navLinks = (
    <>
      <li><MyLink to="/">Home</MyLink></li>
      <li><MyLink to="/services">Services</MyLink></li>
      <li><MyLink to="/about">About</MyLink></li>
      <li><MyLink to="/decorator-apply">Apply</MyLink></li>
      {user && <li><MyLink to="/dashboard/my-bookings">Dashboard</MyLink></li>}
    </>
  );

  return (
    <>
      <header className="sticky top-0 z-[100] w-full bg-base-100/80 backdrop-blur-lg border-b border-base-300">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setOpen(true)} 
              className="md:hidden p-2 hover:bg-base-200 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
            <Logo />
          </div>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-8 font-semibold">
              {navLinks}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {mounted && (
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2.5 rounded-full bg-base-200 hover:bg-base-300 transition-all active:scale-95"
              >
                {theme === 'dark' ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-primary" />}
              </button>
            )}

            {loading ? (
              <div className="w-10 flex justify-center"><PuffLoader color="var(--p)" size={24} /></div>
            ) : user ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="avatar hover:opacity-80 transition-opacity">
                  <div className="w-11 h-11 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={user?.photoURL} alt="User" />
                  </div>
                </div>
                <ul tabIndex={0} className="dropdown-content z-[110] menu p-2 shadow-xl bg-base-100 border border-base-300 rounded-2xl w-64 mt-4 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-3 mb-2 border-b border-base-200">
                    <p className="font-bold text-base truncate">{user.displayName}</p>
                    <p className="text-xs opacity-60 truncate">{user.email}</p>
                  </div>
                  <li><button onClick={() => navigate('/dashboard/my-profile')} className="py-3"><UserCircle size={18} /> My Profile</button></li>
                  <li><button onClick={() => navigate('/dashboard/my-bookings')} className="py-3"><LayoutDashboard size={18} /> Dashboard</button></li>
                  <div className="divider my-0"></div>
                  <li><button onClick={handleSignOut} className="text-error py-3"><LogOut size={18} /> Logout</button></li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary btn-md px-6 rounded-xl font-bold hidden sm:flex shadow-lg shadow-primary/20">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* --- MOBILE DRAWER WITH SMOOTH TRANSITION --- */}
      <div className={`fixed inset-0 z-[200] md:hidden transition-all duration-300 ${open ? "visible" : "invisible"}`}>
        {/* Overlay */}
        <div 
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        />

        {/* Drawer Body */}
        <aside className={`absolute left-0 top-0 h-full w-[300px] bg-base-100 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${open ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex items-center justify-between p-6 border-b border-base-200">
            <Logo />
            <button 
              onClick={() => setOpen(false)} 
              className="p-2 hover:bg-base-200 rounded-full transition-colors text-base-content"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 p-6">
            <ul 
              className="flex flex-col gap-2 menu menu-lg p-0" 
              onClick={() => setOpen(false)}
            >
              {navLinks}
            </ul>
          </nav>

          <div className="p-6 border-t border-base-200 bg-base-200/30">
             {user ? (
                <button onClick={handleSignOut} className="btn btn-error btn-outline w-full gap-3">
                  <LogOut size={18} /> Logout
                </button>
             ) : (
                <Link to="/login" onClick={() => setOpen(false)} className="btn btn-primary w-full text-white">Sign In</Link>
             )}
            <p className="text-[10px] text-center mt-6 opacity-40 font-bold uppercase tracking-widest">
              Interior Decor © 2026
            </p>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Navbar;