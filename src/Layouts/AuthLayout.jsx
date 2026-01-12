import Lottie from 'lottie-react';
import React from 'react';
import sigInEffect from "../Components/Animation/SignIn/SignIn.json";
import Logo from '../Components/UI/Logo/Logo';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        /* bg-base-200 replaces the hardcoded light gray for dark mode compatibility */
        <section className='w-full md:h-screen flex items-center justify-center bg-base-200 transition-colors duration-300'>
            <div className='max-w-7xl border border-primary/20 h-full md:h-[700px] w-full rounded-2xl relative flex flex-col md:grid grid-cols-1 md:grid-cols-2 gap-2 bg-base-100 md:overflow-hidden shadow-xl'>
                
                {/* LoGo */}
                <div className='absolute top-10 left-10 z-10'>
                    <Logo />
                </div>

                {/* Lottie animation */}
                <div className='p-10 md:p-20 flex items-center justify-center bg-base-200/30'>
                    <div className='w-full max-w-[450px]'>
                        <Lottie animationData={sigInEffect} loop={true}></Lottie>
                    </div>
                </div>

                {/* Changable Outlet login Register */}
                {/* Added border-base-300 for mobile separation and adjusted shadows */}
                <div className='md:mt-0 md:py-10 shadow-inner md:shadow-2xl w-full flex items-center justify-center p-4 bg-base-100'>
                    <div className='w-full max-w-[400px]'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AuthLayout;