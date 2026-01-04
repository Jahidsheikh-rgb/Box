import React from 'react';
import Navber from '../../Components/Navber/Navber';
import { Outlet } from 'react-router-dom';
import ComplaintFeed from '../Feed/ComplaintFeed';

const Student_Home = () => {
    return (
        <div>
            <ComplaintFeed/>
            

            
        </div>
    );
};

export default Student_Home;