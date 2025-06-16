// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CursorEffects from './components/CursorEffects'; // Import cursor effects
import Home from './pages/Home';
import Recommendations from './pages/Recommendations';
import './styles.css'; // Import your global styles (where the CSS for hamburger is located)

// Custom hook to handle scrolling to hash on route change
const ScrollToHashElement = () => {
    const location = useLocation();
    useEffect(() => {
        // If there is a hash in the URL (e.g., /#portfolio)
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                // Delay scroll slightly to allow page content to render
                setTimeout(() => {
                    window.scrollTo({
                        top: element.offsetTop - 80, // Adjust for fixed header
                        behavior: 'smooth'
                    });
                }, 100); // Small delay
            }
        } else {
            // Scroll to top on regular route changes if no hash
            window.scrollTo(0, 0); 
        }
    }, [location]); // Dependency on location ensures it re-runs on route changes
    return null;
};

const App = () => {
    return (
        <Router>
            {/* CursorEffects is correctly placed here, as it's a global effect */}
            <CursorEffects /> 
            
            {/* Header is correctly placed outside the Routes, as it's static */}
            <Header />
            
            {/* ScrollToHashElement needs to be inside Router as it uses useLocation */}
            <ScrollToHashElement /> 
            
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/recommendations" element={<Recommendations />} />
                </Routes>
            </main>
            
            {/* Footer is correctly placed outside the Routes, as it's static */}
            <Footer />
        </Router>
    );
};

export default App;
