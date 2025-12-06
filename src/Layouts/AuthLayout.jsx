import Lottie from 'lottie-react';
import React from 'react';
import sigInEffect from "../Components/Animation/SignIn/SignIn.json";
import Logo from '../Components/UI/Logo/Logo';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <section className='w-full md:h-screen flex items-center justify-center bg-[#F5F5F5]'>
            <div className='max-w-7xl border border-primary/40 h-full md:h-[700px] w-full rounded-2xl relative flex flex-col md:grid grid-cols-1 md:grid-cols-2 gap-2 bg-base-100 md:overflow-hidden shadow-md'>
                {/* LoGo */}
                <div className=' absolute top-10 left-10'>
                    <Logo />
                </div>
                {/* Lottie animation */}
                <div className='p-20 flex items-center justify-center'>
                    <Lottie animationData={sigInEffect} loop={true}></Lottie>
                </div>
                {/* Changable Outlet login Register */}
                <div className='md:mt-0 md:py-10 shadow-2xl w-full flex items-center justify-center p-4'>
                    <Outlet />
                </div>
            </div>
        </section>
    );
};

export default AuthLayout;