// src/components/FilterButtons.js
import React, { useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// FIX: Imported faBrush from free-solid-svg-icons
import {
    faLayerGroup,
    faPenNib,
    faFilm,
    faCube,
    faBrush // Added faBrush for Photoshop button
} from '@fortawesome/free-solid-svg-icons';
// FIX: Removed the faSquareAdobe import as it's not found in free-brands-svg-icons
// If you don't need any other brand icons in this specific file, you can remove this import entirely
// For now, keeping it commented out to show the change:
// import { faSquareAdobe } from '@fortawesome/free-brands-svg-icons';


const FilterButtons = ({ currentFilter, onFilterChange }) => {
    const buttonRefs = useRef([]);

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

        buttonRefs.current.forEach(button => {
            if (button) observer.observe(button);
        });

        return () => {
            buttonRefs.current.forEach(button => {
                if (button) observer.unobserve(button);
            });
        };
    }, []);


    const buttons = [
        { label: 'All Work', value: 'all', icon: faLayerGroup },
        // FIX: Changed icon to faBrush (from free-solid-svg-icons)
        { label: 'Photoshop', value: 'photoshop', icon: faBrush },
        { label: 'Illustrator', value: 'illustrator', icon: faPenNib },
        { label: 'After Effects', value: 'after-effects', icon: faFilm },
        { label: '3Ds Max', value: '3dsmax', icon: faCube },
    ];

    return (
        <div className="filter-buttons">
            {buttons.map((button, index) => (
                <button
                    key={button.value}
                    className={`filter-btn ${currentFilter === button.value ? 'active' : ''}`}
                    onClick={() => onFilterChange(button.value)}
                    data-filter={button.value}
                    ref={el => buttonRefs.current[index] = el}
                >
                    <FontAwesomeIcon icon={button.icon} />{button.label}
                </button>
            ))}
        </div>
    );
};

export default FilterButtons;