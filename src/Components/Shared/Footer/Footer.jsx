import React from 'react';
import { Link } from 'react-router';
import Logo from '../../UI/Logo/Logo';
import { IoCallOutline, IoLocationOutline, IoTimeOutline } from 'react-icons/io5';
import { MdOutlineEmail } from 'react-icons/md';
import { SiFacebook, SiInstagram, SiLinkedin, SiX } from 'react-icons/si';
import { ArrowUp } from 'lucide-react';

const Footer = () => {
    // Scroll to top function for the footer button
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer className='border-t-2 border-base-300 bg-base-100 text-base-content/70'>
            {/* Top Footer Content */}
            <div className='px-4 md:px-6 max-w-7xl mx-auto py-20'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8'>
                    
                    {/* Grid 1: Branding & Social */}
                    <div className='space-y-8'>
                        <div className="scale-110 origin-left">
                            <Logo />
                        </div>
                        <p className='text-sm font-medium leading-relaxed max-w-xs'>
                            Elevate your living spaces with our premium interior design solutions. 
                            Bringing elegance, comfort, and <span className="text-primary italic font-bold">modern luxury</span> to your doorstep.
                        </p>
                        <div className='flex items-center gap-3'>
                            {[
                                { icon: <SiFacebook size={18} />, link: "#" },
                                { icon: <SiX size={18} />, link: "#" },
                                { icon: <SiInstagram size={18} />, link: "#" },
                                { icon: <SiLinkedin size={18} />, link: "#" }
                            ].map((social, index) => (
                                <a 
                                    key={index}
                                    className='p-3 rounded-2xl bg-base-200 text-base-content hover:bg-primary hover:text-primary-content transition-all duration-300 border border-base-300' 
                                    href={social.link}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Grid 2: Quick Links */}
                    <div>
                        <h1 className='mb-8 font-black text-sm text-base-content uppercase italic tracking-[0.2em] flex items-center gap-2'>
                            <span className="w-6 h-[2px] bg-primary"></span> Explore
                        </h1>
                        <div className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest">
                            <Link to="/" className="transition-all hover:text-primary hover:translate-x-1 inline-block">Home</Link>
                            <Link to="/services" className="transition-all hover:text-primary hover:translate-x-1 inline-block">Services</Link>
                            <Link to="/cart" className="transition-all hover:text-primary hover:translate-x-1 inline-block">My Cart</Link>
                            <Link to="/profile" className="transition-all hover:text-primary hover:translate-x-1 inline-block">Profile</Link>
                        </div>
                    </div>

                    {/* Grid 3: Support */}
                    <div>
                        <h1 className='mb-8 font-black text-sm text-base-content uppercase italic tracking-[0.2em] flex items-center gap-2'>
                            <span className="w-6 h-[2px] bg-primary"></span> Support
                        </h1>
                        <div className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest">
                            <Link className="transition-all hover:text-primary hover:translate-x-1 inline-block">Help Center (FAQ)</Link>
                            <Link className="transition-all hover:text-primary hover:translate-x-1 inline-block">Contact Support</Link>
                            <Link to='' className="transition-all hover:text-primary hover:translate-x-1 inline-block">Privacy Policy</Link>
                            <Link className="transition-all hover:text-primary hover:translate-x-1 inline-block">Terms of Service</Link>
                        </div>
                    </div>

                    {/* Grid 4: Contact Info */}
                    <div>
                        <h1 className='mb-8 font-black text-sm text-base-content uppercase italic tracking-[0.2em] flex items-center gap-2'>
                            <span className="w-6 h-[2px] bg-primary"></span> Contact
                        </h1>
                        <div className='flex flex-col gap-6'>
                            <div className='flex items-start gap-4'>
                                <div className="p-2 bg-primary/10 rounded-lg text-primary"><IoLocationOutline size={20} /></div>
                                <span className="text-xs font-bold uppercase tracking-tighter leading-tight">Jamalpur, Mymensingh,<br /> Bangladesh, 2000</span>
                            </div>
                            
                            <a href="tel:+8801979922268" className='flex items-center gap-4 group'>
                                <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-content transition-all"><IoCallOutline size={20} /></div>
                                <span className="text-xs font-bold uppercase tracking-widest">+880 1979-922268</span>
                            </a>

                            <a href="mailto:support@smart-decor.com" className='flex items-center gap-4 group'>
                                <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-content transition-all"><MdOutlineEmail size={20} /></div>
                                <span className="text-xs font-bold tracking-tight lowercase">support@smart-decor.com</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer Section */}
            <div className='w-full bg-base-300/50 py-8 px-4 md:px-20 border-t-2 border-base-300'>
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">
                        © 2026 <span className='text-primary'>Style Decor</span>. Industrial Grade Interior Solutions.
                    </div>

                    {/* Scroll to Top Button */}
                    <button 
                        onClick={scrollToTop}
                        className="btn btn-circle btn-primary btn-sm shadow-lg shadow-primary/20 animate-bounce"
                    >
                        <ArrowUp size={16} />
                    </button>

                    <div className='text-[10px] font-black uppercase tracking-[0.2em] opacity-60'>
                        Engineered by <span className="text-primary italic">Mahialam Rahat</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;