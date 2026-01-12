import React from 'react';
import styleDecorLogo from '../../../assets/style-deco-logo.png'
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link 
            to='/' 
            className='h-7 md:h-9 flex items-center group transition-transform duration-300 hover:scale-105'
        >
            {/* Logo Image */}
            <img 
                className='h-full object-contain' 
                src={styleDecorLogo} 
                alt="Style Decor Logo" 
            />
            
            {/* Logo Text: Matches the site's bold industrial typography */}
            <span className='text-xl md:text-2xl inline-block -ml-2.5 font-black uppercase italic tracking-tighter text-base-content'>
                tyle<span className='text-primary'>Decor</span>
            </span>
        </Link>
    );
};

export default Logo;