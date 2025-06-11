// src/components/Hero.js
import React, { useRef, useEffect } from 'react';
import DiteImage from '../assets/images/Dite.webp'; // Import the image directly

const Hero = () => {
    const heroTextRef = useRef(null);
    const heroPhotoRef = useRef(null);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        if (heroTextRef.current) observer.observe(heroTextRef.current);
        if (heroPhotoRef.current) observer.observe(heroPhotoRef.current);

        // Cleanup observer on component unmount
        return () => {
            if (heroTextRef.current) observer.unobserve(heroTextRef.current);
            if (heroPhotoRef.current) observer.unobserve(heroPhotoRef.current);
        };
    }, []);

    // Smooth scroll handler for the CTA button
    const handleCtaScroll = (e) => {
        e.preventDefault();
        const targetElement = document.querySelector('#portfolio');
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="hero" id="home">
            <div className="hero-content">
                <div className="hero-text" ref={heroTextRef}>
                    <h1>Creative <span>Design Portfolio</span> of Liteboho Majoro</h1>
                    <p>Showcasing innovative poster designs, motion graphics, and 3D creations crafted with Adobe Creative Suite and 3Ds Max. Each piece tells a unique visual story.</p>
                    <a href="#portfolio" className="cta-button" onClick={handleCtaScroll}>Explore My Work</a>
                </div>
                <div className="hero-photo" ref={heroPhotoRef}>
                    <img src={DiteImage} alt="Liteboho Majoro" />
                </div>
            </div>
        </section>
    );
};

export default Hero;