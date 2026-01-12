import React from 'react';
import MyContainer from '../../Layouts/MyContainer';
import { HelpCircle, Search, MessageSquare, BookOpen, Settings, ShieldCheck, LifeBuoy } from 'lucide-react';

const HelpCenter = () => {
    const categories = [
        { icon: <BookOpen size={24} />, title: "Guides", desc: "Step-by-step tutorials" },
        { icon: <Settings size={24} />, title: "Setup", desc: "Account configurations" },
        { icon: <MessageSquare size={24} />, title: "Support", desc: "Talk to our experts" },
        { icon: <ShieldCheck size={24} />, title: "Security", desc: "Data protection info" },
    ];

    return (
        <div className="bg-transparent py-16 md:py-24 transition-colors duration-300">
            <MyContainer>
                {/* Header Section */}
                <div className='w-full mb-16 text-center'>
                    <div className="flex items-center justify-center gap-2 text-primary font-black text-xs uppercase tracking-[0.3em] mb-4">
                        <LifeBuoy size={16} /> Knowledge Hub
                    </div>
                    <h1 className='text-4xl md:text-6xl font-black text-base-content uppercase italic tracking-tighter'>
                        Help <span className='text-primary'>Center</span>
                    </h1>
                    
                    {/* Search Input */}
                    <div className='max-w-2xl mx-auto mt-10 relative px-4'>
                        <input 
                            type="text" 
                            placeholder="Find answers instantly..." 
                            className="w-full bg-base-100 border-2 border-base-300 rounded-2xl py-5 pl-14 pr-6 focus:border-primary outline-none text-sm font-bold uppercase tracking-widest transition-all shadow-xl text-base-content placeholder:opacity-30"
                        />
                        <Search className="absolute left-9 top-1/2 -translate-y-1/2 text-primary opacity-50" size={22} />
                    </div>
                </div>

                {/* Categories Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20'>
                    {categories.map((cat, i) => (
                        <div key={i} className='bg-base-100 border-2 border-base-300 p-8 rounded-[2.5rem] hover:border-primary transition-all duration-500 group shadow-sm hover:shadow-xl hover:shadow-primary/5'>
                            <div className='w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all'>
                                {cat.icon}
                            </div>
                            <h3 className='font-black text-lg text-base-content uppercase italic tracking-tight mb-2'>
                                {cat.title}
                            </h3>
                            <p className='text-[10px] font-black opacity-40 uppercase tracking-[0.2em]'>
                                {cat.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* FAQ Container */}
                <div className='max-w-4xl mx-auto'>
                    <div className='text-center mb-12'>
                        <h2 className='text-2xl md:text-3xl font-black text-base-content uppercase italic tracking-tight'>
                            Common <span className='text-primary'>Queries</span>
                        </h2>
                        <div className='h-1 w-12 bg-primary mx-auto mt-3 rounded-full'></div>
                    </div>

                    <div className='space-y-4'>
                        {[
                            { q: "How do I track my project status?", a: "You can track real-time progress through your 'Client Dashboard' under the 'Active Projects' tab." },
                            { q: "What is your refund policy?", a: "We offer a 100% satisfaction guarantee. If you're not happy with the initial concept, you can request a full refund within 48 hours." },
                            { q: "Do you offer international services?", a: "Currently, we operate across all major districts in Bangladesh with plans to expand globally soon." }
                        ].map((faq, i) => (
                            <details key={i} className="group bg-base-100 border-2 border-base-300 rounded-[1.5rem] transition-all duration-300 open:border-primary shadow-sm">
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none outline-none">
                                    <span className="text-sm font-black uppercase italic tracking-widest text-base-content group-hover:text-primary transition-colors">
                                        {faq.q}
                                    </span>
                                    <span className="transition-transform duration-300 group-open:rotate-180 text-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </span>
                                </summary>
                                <div className="px-6 pb-6 text-sm font-medium text-base-content opacity-70 leading-relaxed border-t border-base-300/50 pt-4">
                                    {faq.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>

                {/* Support Footer */}
                <div className='mt-24 bg-base-100 border-2 border-base-300 rounded-[3rem] p-10 text-center shadow-2xl shadow-primary/5'>
                    <p className='text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-6'>Cant find what you're looking for?</p>
                    <div className='flex flex-col sm:flex-row justify-center items-center gap-6'>
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-primary/10 rounded-xl text-primary"><LifeBuoy size={20}/></div>
                            <div className="text-left">
                                <p className="text-xs font-black uppercase italic text-base-content">24/7 Support</p>
                                <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Always Online</p>
                            </div>
                        </div>
                        <div className="h-10 w-[1px] bg-base-300 hidden sm:block"></div>
                        <button className='btn btn-primary rounded-xl px-12 font-black uppercase italic tracking-widest text-xs shadow-lg shadow-primary/20'>
                            Contact Experts
                        </button>
                    </div>
                </div>
            </MyContainer>
        </div>
    );
};

export default HelpCenter;