// src/components/PortfolioItem.jsx
import React, { useRef, useEffect, useState } from 'react';

const PortfolioItem = ({ item }) => {
    const itemRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false); // State to control visibility for animation

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target); // Stop observing once visible
                } else {
                    // Optional: If you want to reset state when it leaves viewport
                    // setIsVisible(false);
                }
            });
        }, observerOptions);

        if (itemRef.current) {
            observer.observe(itemRef.current);
        }

        return () => {
            if (itemRef.current) {
                observer.unobserve(itemRef.current);
            }
        };
    }, []);

    // Apply animation classes based on isVisible state
    const itemClasses = `portfolio-item ${isVisible ? 'visible' : ''}`;

    return (
        <div className={itemClasses} data-category={item.category} ref={itemRef}>
            <div className="portfolio-img">
                {item.type === 'image' ? (
                    <img src={item.src} alt={item.alt} />
                ) : (
                    <video controls poster={item.poster}>
                        <source src={item.src} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )}
            </div>
            <div className="portfolio-info">
                <h3>{item.title}</h3> {/* <--- THIS IS THE FIX: Use item.title */}
                <p dangerouslySetInnerHTML={{ __html: item.description }}></p>
                <span className="software-tag">Made using {item.software} by Liteboho Majoro</span>
            </div>
        </div>
    );
};

export default PortfolioItem;