import { 
  BrickWallShield, CircleDollarSign, Command, FilePlus, Handbag, ShieldUser, UserPen, Users, Menu, X, Home
} from 'lucide-react';
import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import ScreenLoading from '../Components/Animation/ScreenLoading/ScreenLoading';
import { useTheme } from 'next-themes';

const DashboardLayout2 = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading } = useAuth();
  const { role, isLoading: roleLoading } = useRole();
  const { theme, setTheme } = useTheme();

  const activeLink = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-xl transition-all duration-300 cursor-pointer font-medium ${
      isActive
        ? 'bg-primary text-primary-content shadow-lg shadow-primary/20'
        : 'text-base-content/70 hover:text-primary hover:bg-primary/10'
    }`;

  if (roleLoading || loading) {
    return <ScreenLoading />
  }

  // Common Menu Items Component to keep Mobile and Desktop in sync
  const MenuItems = () => (
    <>
      <p className="text-[10px] uppercase font-bold opacity-40 ml-2 mb-2 tracking-widest">Main Menu</p>
      <li>
        <NavLink to="/" onClick={() => setSidebarOpen(false)} className={activeLink}>
          <Home size={20} />
          <span>Homepage</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/my-profile" onClick={() => setSidebarOpen(false)} className={activeLink}>
          <UserPen size={20} />
          <span>My Profile</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/my-bookings" onClick={() => setSidebarOpen(false)} className={activeLink}>
          <Handbag size={20} />
          <span>My Bookings</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/my-payment-history" onClick={() => setSidebarOpen(false)} className={activeLink}>
          <CircleDollarSign size={20} />
          <span>Payments History</span>
        </NavLink>
      </li>

      {/* Admin Section */}
      {role === 'admin' && (
        <>
          <div className="divider opacity-10"></div>
          <p className="text-[10px] uppercase font-bold opacity-40 ml-2 mb-2 tracking-widest text-secondary">Admin Tools</p>
          <li>
            <NavLink to="/dashboard/manage-users" onClick={() => setSidebarOpen(false)} className={activeLink}>
              <Users size={20} />
              <span>Manage Users</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/add-new-service" onClick={() => setSidebarOpen(false)} className={activeLink}>
              <FilePlus size={20} />
              <span>Add Service</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manage-services" onClick={() => setSidebarOpen(false)} className={activeLink}>
              <BrickWallShield size={20} />
              <span>Manage Services</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manage-bookings" onClick={() => setSidebarOpen(false)} className={activeLink}>
              <Command size={20} />
              <span>Manage Bookings</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manage-decorators" onClick={() => setSidebarOpen(false)} className={activeLink}>
              <ShieldUser size={20} />
              <span>Manage Decorators</span>
            </NavLink>
          </li>
        </>
      )}

      {/* Decorator Section */}
      {role === 'decorator' && (
        <>
          <div className="divider opacity-10"></div>
          <p className="text-[10px] uppercase font-bold opacity-40 ml-2 mb-2 tracking-widest text-primary">Work Panel</p>
          <li>
            <NavLink to="/dashboard/earnings-summery" onClick={() => setSidebarOpen(false)} className={activeLink}>
              <CircleDollarSign size={20} />
              <span>Earnings Summary</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/my-assigned-projects" onClick={() => setSidebarOpen(false)} className={activeLink}>
              <FilePlus size={20} />
              <span>Assigned Projects</span>
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="flex h-screen bg-base-200 text-base-content overflow-hidden">
      
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex bg-base-100 border-r border-base-300 flex-col w-64 transition-colors duration-300">
        <div className="flex items-center justify-between p-6 border-b border-base-300">
          <h1 className="font-black text-2xl tracking-tight text-primary">SMART<span className='text-secondary'>DECOR</span></h1>
        </div>
        <ul className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
          <MenuItems />
        </ul>
      </aside>

      {/* Mobile Sidebar Overlay & Aside */}
      <div className={`fixed inset-0 z-[1000] lg:hidden flex transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}></div>
        <aside className={`relative bg-base-100 w-72 h-full shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between p-5 border-b border-base-300">
            <h1 className="font-black text-xl text-primary italic">DASHBOARD</h1>
            <button onClick={() => setSidebarOpen(false)} className="btn btn-ghost btn-sm btn-circle bg-base-200"><X size={20}/></button>
          </div>
          <ul className="flex-1 p-4 space-y-2 overflow-y-auto">
             <MenuItems />
          </ul>
        </aside>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-base-200">
        
        {/* Navbar */}
        <nav className="flex items-center justify-between p-4 bg-base-100 border-b border-base-300 sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <button className="lg:hidden btn btn-ghost btn-circle bg-base-200" onClick={() => setSidebarOpen(true)}>
              <Menu size={22} />
            </button>
            <h2 className="lg:hidden font-bold text-lg text-primary tracking-tighter">SMART DECOR</h2>
          </div>
          
          <div className='flex items-center gap-3 md:gap-6'>
            {/* Theme Toggle */}
            <label className="swap swap-rotate btn btn-ghost btn-circle bg-base-200">
              <input 
                onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')} 
                type="checkbox" 
                checked={theme === 'dark'}
              />
              <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
              <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.69Z"/></svg>
            </label>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col text-right leading-tight">
                <span className="font-bold text-sm">{user?.displayName}</span>
                <span className="text-[10px] uppercase tracking-widest font-black text-primary">{role}</span>
              </div>
              <div className="avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={user?.photoURL} alt="profile" referrerPolicy='no-referrer' />
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-3 md:p-6 overflow-auto bg-base-200">
          <div className="bg-base-100 rounded-[2.5rem] shadow-sm min-h-full p-4 md:p-10 border border-base-300">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout2;