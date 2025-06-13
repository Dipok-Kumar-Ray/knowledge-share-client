import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

const MainLayout = () => {
    return (
        <div>
            <Navbar/>
           <main style={{ minHeight: 'calc(100vh - 137px)' }} className='flex justify-center items-center' >
             <Outlet/>
           </main>
            <Footer/>
        </div>
    );
};

export default MainLayout;