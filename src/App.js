// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CursorEffects from './components/CursorEffects'; // Import cursor effects
import Home from './pages/Home';
import Recommendations from './pages/Recommendations';
import './styles.css'; // Import your global styles

// Custom hook to handle scrolling to hash on route change
const ScrollToHashElement = () => {
    const location = useLocation();
    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                window.scrollTo({
                    top: element.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        } else {
            window.scrollTo(0, 0); // Scroll to top on regular route changes
        }
    }, [location]);
    return null;
};

const App = () => {
    return (
        <Router>
            <CursorEffects /> {/* Render cursor effects globally */}
            <Header />
            <ScrollToHashElement /> {/* Handle scrolling to hash links */}
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Recommendations" element={<Recommendations />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
};

export default App;