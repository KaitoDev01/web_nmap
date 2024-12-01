//import { useState, useEffect } from 'react';
import { Router, Routes, Route } from 'react-router-dom';

import ScanHistory from './ScanHistory';

function Header() {
    <Router>
        <Routes>
            <Route path="/scan_history" element={<ScanHistory />} />
        </Routes>
    </Router >

    return (
        <div className='header'>
            <div className='container'>
                <div className='header-wrap'>
                    <a href="#" className='logo'>Nmap</a>
                    <nav className='nav'>
                        <ul className='menu-items'>
                            <li className='menu-item'>
                                <a href='/scan_history' className='link-item'>История сканирования</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Header;