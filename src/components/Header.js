// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation to check current path

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation(); // Get current location to help with smooth scroll logic

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prevState => !prevState); // Use functional update for state
    };

    // Close mobile menu
    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    // Effect to handle body scrolling when menu opens/closes
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }

        // Cleanup function to remove no-scroll class when component unmounts
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [isMobileMenuOpen]); // Re-run effect when isMobileMenuOpen changes

    // Handle smooth scrolling for internal links (e.g., #portfolio)
    const handleSmoothScroll = (e, targetId) => {
        // Check if on the homepage ('/') or if navigating to a hash on the current page
        // react-router-dom's Link component might handle this differently,
        // but this logic ensures custom smooth scroll for hash links on the homepage.
        if (location.pathname === '/') { 
            e.preventDefault(); // Prevent default Link behavior for smooth scroll
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        }
        closeMobileMenu(); // Always close mobile menu after clicking any link
    };

    return (
        <header>
            <div className="container navbar">
                {/* Changed 'class' to 'className' for React JSX */}
                <div className="logo">
                    <i className="fas fa-palette"></i> {/* Changed 'class' to 'className' */}
                    LM Designs
                </div>
                {/* Conditionally apply 'active' class based on state */}
                <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                    <li>
                        {/* Updated Link to use onClick for smooth scroll and close menu */}
                        <Link to="/" onClick={(e) => handleSmoothScroll(e, '#home')}>Home</Link>
                    </li>
                    <li>
                        {/* Updated Link for portfolio, ensuring smooth scroll on homepage */}
                        <Link to="/#portfolio" onClick={(e) => handleSmoothScroll(e, '#portfolio')}>Portfolio</Link>
                    </li>
                    <li>
                        {/* This link does not involve smooth scroll on current page, just closes menu */}
                        <Link to="/recommendations" onClick={closeMobileMenu}>Recommendations</Link>
                    </li>
                </ul>
                {/* Conditionally apply 'active' class to hamburger for animation */}
                <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
                    {/* Hamburger bars */}
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>
        </header>
    );
};

export default Header;
