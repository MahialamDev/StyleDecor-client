import React, { useState } from 'react';
import { IoCallOutline, IoLocationOutline, IoTimeOutline } from 'react-icons/io5';
import { MdOutlineEmail } from 'react-icons/md';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert('Message Sent!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className='max-w-7xl mx-auto px-4 md:px-6 py-20 bg-transparent text-base-content transition-colors duration-300'>
      
      {/* Header Updated to match Feature Section Style */}
      <div className='text-center mb-16'>
        <h1 className='text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase italic'>
          Get in <span className='text-primary'>Touch</span>
        </h1>
        <p className='text-base-content/60 max-w-2xl mx-auto font-medium'>
          We'd love to hear from you! Fill out the form below or reach us using our contact details. 
          StyleDecor is here to assist your interior needs.
        </p>
      </div>

      {/* Content Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch'>
        
        {/* Contact Info Cards */}
        <div className='flex flex-col gap-4 h-full'>
          {[
            { icon: <IoLocationOutline />, text: "Jamalpur, Bangladesh" },
            { icon: <IoTimeOutline />, text: "Monday - Friday: 9:00 AM - 6:00 PM" },
            { icon: <IoCallOutline />, text: "+880 1979-922268", link: "tel:+8801979922268" },
            { icon: <MdOutlineEmail />, text: "support@smart-decor.com", link: "mailto:support@smart-decor.com" }
          ].map((item, idx) => (
            <div key={idx} className='flex-1 flex items-center gap-5 bg-base-100 p-6 rounded-[2rem] border-2 border-base-300 transition-all hover:border-primary group shadow-sm'>
              <div className='text-primary text-3xl shrink-0 p-3 bg-primary/10 rounded-2xl group-hover:scale-110 transition-transform duration-300'>
                {item.icon}
              </div>
              {item.link ? (
                <a href={item.link} className='hover:text-primary transition-colors truncate font-bold uppercase text-sm tracking-tight'>
                  {item.text}
                </a>
              ) : (
                <p className='font-bold uppercase text-sm tracking-tight opacity-80'>{item.text}</p>
              )}
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <form 
          onSubmit={handleSubmit} 
          className='flex flex-col gap-5 bg-base-100 p-10 rounded-[2.5rem] border-2 border-base-300 h-full shadow-sm'
        >
          <div className='flex flex-col gap-2 flex-1'>
            <label className='text-[10px] font-black uppercase tracking-[0.2em] opacity-50 ml-1'>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className='bg-base-200 border-2 border-base-300 rounded-2xl p-4 focus:outline-none focus:border-primary text-base-content w-full transition-all font-medium placeholder:opacity-30'
            />
          </div>

          <div className='flex flex-col gap-2 flex-1'>
            <label className='text-[10px] font-black uppercase tracking-[0.2em] opacity-50 ml-1'>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className='bg-base-200 border-2 border-base-300 rounded-2xl p-4 focus:outline-none focus:border-primary text-base-content w-full transition-all font-medium placeholder:opacity-30'
            />
          </div>

          <div className='flex flex-col gap-2 flex-[2]'>
            <label className='text-[10px] font-black uppercase tracking-[0.2em] opacity-50 ml-1'>Your Message</label>
            <textarea
              name="message"
              rows="4"
              placeholder="How can we help your space?"
              value={formData.message}
              onChange={handleChange}
              required
              className='bg-base-200 border-2 border-base-300 rounded-2xl p-4 focus:outline-none focus:border-primary text-base-content w-full transition-all resize-none font-medium placeholder:opacity-30'
            />
          </div>

          <button
            type="submit"
            className='btn btn-primary h-16 rounded-2xl font-black uppercase tracking-widest text-xs mt-2 shadow-lg shadow-primary/20'
          >
            Send Secure Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;