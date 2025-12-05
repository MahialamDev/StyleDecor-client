import React from 'react';
import Navbar from '../Components/Shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Shared/Footer/Footer';

const MainLayout = () => {
    return (
        <>
            <Navbar />

            <main>
                <Outlet />
            </main>

            <Footer />
            
        </>
    );
};

export default MainLayout;