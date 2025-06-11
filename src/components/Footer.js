// src/components/Footer.js
import React, { useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    const footerRef = useRef(null);
    const socialLinksRef = useRef(null);

    // Intersection Observer for the footer and social links
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

        if (footerRef.current) observer.observe(footerRef.current);
        if (socialLinksRef.current) observer.observe(socialLinksRef.current);

        return () => {
            if (footerRef.current) observer.unobserve(footerRef.current);
            if (socialLinksRef.current) observer.unobserve(socialLinksRef.current);
        };
    }, []);

    const currentYear = new Date().getFullYear();

    return (
        <footer ref={footerRef}>
            <div className="container">
                <div className="social-links" ref={socialLinksRef}>
                    <a href="https://github.com/LitebohoMajoro" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                    <a href="mailto:litebohomajoro2580@gmail.com" aria-label="Send Email">
                        <FontAwesomeIcon icon={faEnvelope} />
                    </a>
                    <a href="https://wa.me/+26653359840" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Chat">
                        <FontAwesomeIcon icon={faWhatsapp} />
                    </a>
                </div>
                <p className="copyright">
                    © {currentYear} Liteboho Majoro. All designs and creative works are property of the artist.
                </p>
            </div>
        </footer>
    );
};

export default Footer;