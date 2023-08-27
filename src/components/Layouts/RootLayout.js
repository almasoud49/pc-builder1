import React from 'react';
import Navbar from './UI/Navbar';
import Footer from './UI/Footer';

const RootLayout = ({children}) => {
    return (
        <div>
            <Navbar/>
            {children}
            <Footer/>
        </div>
    );
};

export default RootLayout;