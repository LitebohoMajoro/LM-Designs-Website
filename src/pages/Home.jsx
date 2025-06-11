// src/pages/HomePage.jsx
import React, { useState, useEffect, useRef } from 'react';
import PortfolioItem from '../components/PortfolioItem';

// And for your hero section image:
import diteImage from '../assets/Dite.webp'; // Assuming Dite.webp is in src/assets
const portfolioData = [
    {
        id: 1,
        type: 'image',
        category: 'photoshop',
        src: '/images/BEATY PEGEANT poster.webp',
        alt: 'BEAUTY PEGEANT poster', // Matched to HTML alt
        title: 'Beauty Pegeant Poster', // Matched to HTML h3
        description: 'Exploring Beauty Pegeant through photo manipulation',
        software: 'Photoshop'
    },
    {
        id: 2,
        type: 'image',
        category: 'photoshop',
        src: '/images/Tsebeletso-Recovered.webp',
        alt: 'Sunday program poster', // Matched to HTML alt
        title: 'Sunday Program', // Matched to HTML h3
        description: 'This is a Sunday program poster I made for my church <i>Mankoaneng LECSA</i>', // Added <i> tag back for consistency
        software: 'Photoshop'
    },
    {
        id: 3,
        type: 'image',
        category: 'photoshop',
        src: '/images/Music Concert 1.webp',
        alt: 'Music Concert 1', // Matched to HTML alt
        title: 'Concert Poster (Version 1)', // Matched to HTML h3
        description: 'Church music Concert poster',
        software: 'Photoshop'
    },
    {
        id: 4,
        type: 'image',
        category: 'photoshop',
        src: '/images/Music Concert 2.webp',
        alt: 'Music Concert 2', // Matched to HTML alt
        title: 'Concert Poster (Version 2)', // Matched to HTML h3
        description: 'Church music Concert poster',
        software: 'Photoshop'
    },
    {
        id: 5,
        type: 'image',
        category: 'illustrator',
        src: '/images/Logo 1.webp',
        alt: 'Lesotho Kingdom Logo', // Matched to HTML alt
        title: 'The Lesotho Kingdom Logo', // Matched to HTML h3
        description: 'One of the rare simplest typographic Lesotho Logos',
        software: 'Illustrator'
    },
    {
        
        id: 6,
        type: 'image',
        category: 'illustrator',
        src: '/images/Obama Logo.webp',
        alt: 'Obama Logo', // Matched to HTML alt
        title: 'The Obama Logo', // Matched to HTML h3
        description: 'One of the rare simplest Obama Logos',
        software: 'Illustrator'
    },
    {
        id: 7,
        type: 'image',
        category: 'illustrator',
        src: '/images/Mr bean.webp',
        alt: 'Real image of Mr Bean', // Matched to HTML alt
        title: 'Real Image of Mr Bean', // Matched to HTML h3
        description: 'Reference image for illustration.',
        software: 'Illustrator'
    },
    {
        id: 8,
        type: 'image',
        category: 'illustrator',
        src: '/images/Mr bean Illustrator.webp',
        alt: 'Illustrated image of Mr Bean', // Matched to HTML alt
        title: 'Illustrated Image of Mr Bean', // Matched to HTML h3
        description: 'I drew him from scratch using Adobe Illustrator.',
        software: 'Illustrator'
    },
    {
        id: 9,
        type: 'video',
        category: 'after-effects',
        src: '/images/Motiion 2.mp4',
        poster: 'https://via.placeholder.com/300x250/858971/ffffff?text=Motion+Graphics+Preview',
        alt: 'Motion Graphics Preview', // Matched to HTML alt
        title: 'Motion Graphics: Geometric Patterns (Version 1)', // Matched to HTML h3
        description: 'Complex vector art with intricate geometric patterns',
        software: 'After Effects'
    },
    {
        id: 10,
        type: 'video',
        category: 'after-effects',
        src: '/images/Motiion 1.mp4',
        poster: 'https://via.placeholder.com/300x250/858971/ffffff?text=Motion+Graphics+Preview',
        alt: 'Motion Graphics Preview', // Matched to HTML alt
        title: 'Motion Graphics: Geometric Patterns (Version 2)', // Matched to HTML h3
        description: 'Complex vector art with intricate geometric patterns',
        software: 'After Effects'
    },
    {
        id: 11,
        type: 'video',
        category: 'after-effects',
        src: '/images/Motion 3.mp4',
        poster: 'https://via.placeholder.com/300x250/858971/ffffff?text=Motion+Graphics+Preview',
        alt: 'Motion Graphics Preview', // Matched to HTML alt
        title: 'Motion Graphics: Cyber Growth Engine', // Matched to HTML h3
        description: 'Complex but simple futuristic vector art.',
        software: 'After Effects'
    },
    {
        id: 12,
        type: 'image',
        category: '3dsmax',
        src: '/images/HALL 3.webp',
        alt: 'Limkokwing University Hall 3', // Matched to HTML alt
        title: 'Limkokwing University Hall 3 Interior', // Matched to HTML h3
        description: 'Designing the interior of Hall 3 at Limkokwing University.',
        software: '3ds Max'
    },
    {
        id: 13,
        type: 'image',
        category: '3dsmax',
        src: '/images/MM 7..webp',
        alt: 'Multimedia 7 Classroom', // Matched to HTML alt
        title: 'Limkokwing University Multimedia 7 Classroom', // Matched to HTML h3
        description: 'Designing the Multimedia 7 classroom interior.',
        software: '3ds Max'
    },
    {
        id: 14,
        type: 'image',
        category: '3dsmax',
        src: '/images/OUTSITE 2.webp',
        alt: 'Limkokwing University Exterior', // Matched to HTML alt
        title: 'Limkokwing University Exterior Design', // Matched to HTML h3
        description: 'Designing the exterior of Limkokwing University.',
        software: '3ds Max'
    },
];

const HomePage = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [displayItems, setDisplayItems] = useState(portfolioData);

    // Refs for scroll animations
    const heroTextRef = useRef(null);
    const heroPhotoRef = useRef(null);
    const filterSectionRef = useRef(null);
    const filterBtnRefs = useRef([]);
    const portfolioItemRefs = useRef([]);


    useEffect(() => {
        if (activeFilter === 'all') {
            setDisplayItems(portfolioData);
        } else {
            setDisplayItems(portfolioData.filter(item => item.category === activeFilter));
        }
    }, [activeFilter]);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const elementsToObserve = [
            heroTextRef.current,
            heroPhotoRef.current,
            filterSectionRef.current,
            ...filterBtnRefs.current,
            ...portfolioItemRefs.current
        ].filter(Boolean);

        elementsToObserve.forEach(el => observer.observe(el));

        return () => {
            elementsToObserve.forEach(el => observer.unobserve(el));
        };
    }, [displayItems]);

    useEffect(() => {
        const handleSmoothScroll = (e) => {
            const targetId = e.target.getAttribute('href');
            if (targetId && targetId.startsWith('/#')) {
                e.preventDefault();
                const elementId = targetId.substring(2);
                const targetElement = document.getElementById(elementId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        };

        document.querySelectorAll('a[href^="/#"]').forEach(anchor => {
            anchor.addEventListener('click', handleSmoothScroll);
        });

        return () => {
            document.querySelectorAll('a[href^="/#"]').forEach(anchor => {
                anchor.removeEventListener('click', handleSmoothScroll);
            });
        };
    }, []);

    return (
        <>
            <section className="hero" id="home">
                <div className="hero-content">
                    <div className="hero-text" ref={heroTextRef}>
                        <h1>Creative <span>Design Portfolio</span> of Liteboho Majoro</h1>
                        <p>Showcasing innovative poster designs, motion graphics, and 3D creations crafted with Adobe Creative Suite and 3Ds Max. Each piece tells a unique visual story.</p>
                        <a href="/#portfolio" className="cta-button">Explore My Work</a>
                    </div>
                    <div className="hero-photo" ref={heroPhotoRef}>
                        <img src={diteImage} alt="Liteboho Majoro" /> {/* Use the imported variable here too */}
                    </div>
                </div>
            </section>

            <section id="portfolio">
                <div className="container filter-section" ref={filterSectionRef}>
                    <h2>My Design Collection</h2>
                    <div className="filter-buttons">
                        <button
                            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                            data-filter="all"
                            onClick={() => setActiveFilter('all')}
                            ref={el => filterBtnRefs.current[0] = el}
                        >
                            <i className="fas fa-layer-group"></i>All Work
                        </button>
                        <button
                            className={`filter-btn ${activeFilter === 'photoshop' ? 'active' : ''}`}
                            data-filter="photoshop"
                            onClick={() => setActiveFilter('photoshop')}
                            ref={el => filterBtnRefs.current[1] = el}
                        >
                            <i className="fab fa-adobe"></i>Photoshop
                        </button>
                        <button
                            className={`filter-btn ${activeFilter === 'illustrator' ? 'active' : ''}`}
                            data-filter="illustrator"
                            onClick={() => setActiveFilter('illustrator')}
                            ref={el => filterBtnRefs.current[2] = el}
                        >
                            <i className="fas fa-pen-nib"></i>Illustrator
                        </button>
                        <button
                            className={`filter-btn ${activeFilter === 'after-effects' ? 'active' : ''}`}
                            data-filter="after-effects"
                            onClick={() => setActiveFilter('after-effects')}
                            ref={el => filterBtnRefs.current[3] = el}
                        >
                            <i className="fas fa-film"></i>After Effects
                        </button>
                        <button
                            className={`filter-btn ${activeFilter === '3dsmax' ? 'active' : ''}`}
                            data-filter="3dsmax"
                            onClick={() => setActiveFilter('3dsmax')}
                            ref={el => filterBtnRefs.current[4] = el}
                        >
                            <i className="fas fa-cube"></i>3Ds Max
                        </button>
                    </div>

                    <div className="portfolio-grid">
                        {displayItems.map((item, index) => (
                            <PortfolioItem
                                key={item.id}
                                item={item}
                                ref={el => portfolioItemRefs.current[index] = el}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;