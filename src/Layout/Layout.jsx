import React from 'react';
import Navber from '../Components/Navber/Navber';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer/Footer';

const Layout = () => {
    return (
        <div>
            <Navber/>
            
            
            <Outlet/>
            <Footer/>

        
            
        </div>
    );
};

export default Layout;