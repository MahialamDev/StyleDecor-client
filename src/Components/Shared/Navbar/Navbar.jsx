import React from 'react';
import MyLink from '../../UI/MyLink/MyLink';
import Logo from '../../UI/Logo/Logo';

const Navbar = () => {
    const links =
        <>
            <li>
                <MyLink to='/'>Home</MyLink>
            </li>
            <li>
                <MyLink to='/all-services'>All Services</MyLink>
            </li>
        </>
    return (
        <header className='sticky top-0 bg-primary flex w-full py-4'>
            <div className='px-4 md:px-6 mx-auto max-w-7xl flex items-center justify-between w-full'>
                {/* Mobile Menu Icon */}
                <Logo />

                {/* Navlinks */}
                <nav>
                    <ul className='flex items-center gap-5'>{links}</ul>
                </nav>

                <button className='btn btn-accent'>Login</button>
                
            </div>

        </header>
    );
};

export default Navbar;