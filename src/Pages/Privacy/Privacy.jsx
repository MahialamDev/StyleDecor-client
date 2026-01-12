import React from 'react';
import MyContainer from '../../Layouts/MyContainer';
import MySection from '../../Layouts/MySection';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

const Privacy = () => {
    const sections = [
        {
            icon: <Eye size={24} />,
            title: "Data Collection",
            details: "We collect information you provide directly to us, such as when you create an account, request a service, or communicate with our interior experts. This includes your name, email, and project details."
        },
        {
            icon: <Lock size={24} />,
            title: "Data Security",
            details: "We implement industrial-grade security measures to protect your personal data. Your credentials and project blueprints are encrypted and stored in secure sectors to prevent unauthorized access."
        },
        {
            icon: <ShieldCheck size={24} />,
            title: "Your Rights",
            details: "You have the right to access, update, or delete your personal information at any time. You can manage your data preferences directly through your StyleDecor profile dashboard."
        },
    ];

    return (
        <MySection className="bg-transparent">
            <MyContainer>
                {/* Header Updated to match Unified Design System */}
                <div className='w-full mb-16 text-center'>
                    <div className="flex items-center justify-center gap-2 text-primary font-black text-xs uppercase tracking-[0.3em] mb-3">
                        <FileText size={14} /> Legal Documentation
                    </div>
                    <h1 className='text-4xl md:text-5xl font-black text-base-content uppercase italic tracking-tighter'>
                        Privacy <span className='text-primary'>Policy</span>
                    </h1>
                    <div className='mt-4 flex justify-center'>
                        <span className='h-1.5 w-20 bg-primary rounded-full'></span>
                    </div>
                    <p className='text-base-content/60 max-w-2xl mx-auto font-medium mt-6'>
                        Last Updated: January 2026. Your privacy is our priority. We are committed to protecting 
                        the digital identity of our clients and partners.
                    </p>
                </div>

                {/* Content Grid */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-16'>
                    {sections.map((item, i) => (
                        <div 
                            key={i}
                            className='group bg-base-100 border-2 border-base-300 p-8 rounded-[2.5rem] hover:border-primary transition-all duration-500'
                        >
                            <div className='w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform'>
                                {item.icon}
                            </div>
                            <h2 className='text-xl font-black text-base-content uppercase italic mb-4 tracking-tight'>
                                {item.title}
                            </h2>
                            <p className='text-base-content/60 text-sm font-medium leading-relaxed'>
                                {item.details}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Detailed Text Block */}
                <div className='bg-base-100 border-2 border-base-300 rounded-[2.5rem] p-8 md:p-12'>
                    <article className='prose max-w-none text-base-content/80 font-medium space-y-6'>
                        <h3 className='text-2xl font-black uppercase italic text-base-content tracking-tight mb-4'>
                            Terms of <span className="text-primary">Engagement</span>
                        </h3>
                        <p>
                            At StyleDecor, we operate under a strict "No-Sale" policy regarding user data. We do not sell, 
                            trade, or rent your personal identification information to third parties. We may share generic 
                            aggregated demographic information not linked to any personal identification information regarding 
                            visitors and users with our business partners and trusted affiliates for the purposes outlined above.
                        </p>
                        <p>
                            We use "cookies" to enhance User experience. User's web browser places cookies on their hard drive 
                            for record-keeping purposes and sometimes to track information about them. You may choose to set 
                            your web browser to refuse cookies, or to alert you when cookies are being sent.
                        </p>
                        <div className="p-6 bg-base-200/50 border-l-4 border-primary rounded-r-2xl italic">
                            "Protecting your home design is just as important as protecting your digital footprint."
                        </div>
                    </article>
                </div>

                {/* Contact CTA */}
                <div className="text-center mt-12">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-4">
                        Have questions about your data?
                    </p>
                    <button className="btn btn-primary btn-outline rounded-2xl px-8 font-black uppercase italic tracking-widest text-xs">
                        Contact Legal Team
                    </button>
                </div>
            </MyContainer>
        </MySection>
    );
};

export default Privacy;