// src/components/IntersectionObserver.js
import { useRef, useEffect } from 'react';

const useIntersectionObserver = (options, elementsToObserve) => {
    const observedRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, options);

        // Clear previous observed elements and add new ones
        observedRefs.current.forEach(el => {
            if (el) observer.unobserve(el);
        });
        observedRefs.current = [];

        elementsToObserve.forEach((el) => {
            if (el) {
                observer.observe(el);
                observedRefs.current.push(el);
            }
        });

        return () => {
            observedRefs.current.forEach(el => {
                if (el) observer.unobserve(el);
            });
        };
    }, [options, elementsToObserve]); // Re-run effect if options or elements change
};

export default useIntersectionObserver;