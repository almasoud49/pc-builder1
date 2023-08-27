import React from 'react';
import PcNavbar from './UI/PcNavbar';
import Footer from './UI/Footer';

const RootLayout = ({children}) => {
    return (
        <div>
            <PcNavbar/>
            {children}
            <Footer/>
        </div>
    );
};

export default RootLayout;