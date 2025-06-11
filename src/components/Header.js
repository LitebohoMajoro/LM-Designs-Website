// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette, faBars } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Close mobile menu when a navigation link is clicked
    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    // Handle smooth scrolling for internal links (e.g., #portfolio)
    const handleSmoothScroll = (e, targetId) => {
        if (window.location.pathname === '/') { // Only handle smooth scroll on the homepage
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        }
        closeMobileMenu(); // Close mobile menu after clicking any link
    };

    return (
        <header>
            <div className="container navbar">
                <div className="logo">
                    <FontAwesomeIcon icon={faPalette} />
                    LMDesigns
                </div>
                <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                    <li>
                        <Link to="/" onClick={(e) => handleSmoothScroll(e, '#home')}>Home</Link>
                    </li>
                    <li>
                        <Link to="/#portfolio" onClick={(e) => handleSmoothScroll(e, '#portfolio')}>Portfolio</Link>
                    </li>
                    <li>
                        <Link to="/recommendations" onClick={closeMobileMenu}>Recommendations</Link>
                    </li>
                </ul>
                <div className="hamburger" onClick={toggleMobileMenu}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
            </div>
        </header>
    );
};

export default Header;