// src/components/Portfolio.jsx
import React, { useState, useEffect } from 'react';

// Define portfolio items as an array of objects
const portfolioItemsData = [
    {
    id: 1,
    type: 'image', // This is key for the conditional check
    category: 'photoshop',
    src: '/images/BEATY PEGEANT poster.webp', // The path to your image
    alt: 'BEAUTY PEGEANT poster',
    title: 'Beauty Pegeant Poster',
    description: 'Exploring Beauty Pegeant through photo manipulation',
    software: 'Photoshop'
},
    {
        id: 2,
        category: 'photoshop',
        imgSrc: '/images/Tsebeletso-Recovered.webp',
        alt: 'Sunday program poster',
        title: 'Sunday Program',
        description: 'This is a Sunday program poster I made for my church <i>Mankoaneng LECSA</i>',
        software: 'Photoshop'
    },
    {
        id: 3,
        category: 'photoshop',
        imgSrc: '/images/Music Concert 1.webp',
        alt: 'Music Concert 1',
        title: 'Concert Poster (Version 1)',
        description: 'Church music Concert poster',
        software: 'Photoshop'
    },
    {
        id: 4,
        category: 'photoshop',
        imgSrc: '/images/Music Concert 2.webp',
        alt: 'Music Concert 2',
        title: 'Concert Poster (Version 2)',
        description: 'Church music Concert poster',
        software: 'Photoshop'
    },
    {
        id: 5,
        category: 'illustrator',
        imgSrc: '/images/Logo 1.webp',
        alt: 'Lesotho Kingdom Logo',
        title: 'The Lesotho Kingdom Logo',
        description: 'One of the rare simplest typographic Lesotho Logos',
        software: 'Illustrator'
    },
    {
        id: 6,
        category: 'illustrator',
        imgSrc: '/images/Mr bean.webp',
        alt: 'Real image of Mr Bean',
        title: 'Real Image of Mr Bean',
        description: 'Reference image for illustration.',
        software: 'Illustrator'
    },
    {
        id: 7,
        category: 'illustrator',
        imgSrc: '/images/Mr bean Illustrator.webp',
        alt: 'Illustrated image of Mr Bean',
        title: 'Illustrated Image of Mr Bean',
        description: 'I drew him from scratch using Adobe Illustrator.',
        software: 'Illustrator'
    },
    {
        id: 8,
        category: 'after-effects',
        videoSrc: '/images/Motiion 2.mp4',
        alt: 'Motion Graphics Preview',
        title: 'Motion Graphics: Geometric Patterns (Version 1)',
        description: 'Complex vector art with intricate geometric patterns',
        software: 'After Effects'
    },
    {
        id: 9,
        category: 'after-effects',
        videoSrc: '/images/Motiion 1.mp4',
        alt: 'Motion Graphics Preview',
        title: 'Motion Graphics: Geometric Patterns (Version 2)',
        description: 'Complex vector art with intricate geometric patterns',
        software: 'After Effects'
    },
    {
        id: 10,
        category: 'after-effects',
        videoSrc: '/images/Motion 3.mp4',
        alt: 'Motion Graphics Preview',
        title: 'Motion Graphics: Cyber Growth Engine',
        description: 'Complex but simple futuristic vector art.',
        software: 'After Effects'
    },
    {
        id: 11,
        category: '3dsmax',
        imgSrc: '/images/HALL 3.webp',
        alt: 'Limkokwing University Hall 3',
        title: 'Limkokwing University Hall 3 Interior',
        description: 'Designing the interior of Hall 3 at Limkokwing University.',
        software: '3ds Max'
    },
    {
        id: 12,
        category: '3dsmax',
        imgSrc: '/images/MM 7..webp',
        alt: 'Multimedia 7 Classroom',
        title: 'Limkokwing University Multimedia 7 Classroom',
        description: 'Designing the Multimedia 7 classroom interior.',
        software: '3ds Max'
    },
    {
        id: 13,
        category: '3dsmax',
        imgSrc: '/images/OUTSITE 2.webp',
        alt: 'Limkokwing University Exterior',
        title: 'Limkokwing University Exterior Design',
        description: 'Designing the exterior of Limkokwing University.',
        software: '3ds Max'
    },
];

const Portfolio = ({ activeFilter, setActiveFilter }) => {
    // State to manage visible items for animation
    const [visibleItems, setVisibleItems] = useState(portfolioItemsData);

    useEffect(() => {
        // Filter items based on activeFilter
        if (activeFilter === 'all') {
            setVisibleItems(portfolioItemsData);
        } else {
            setVisibleItems(portfolioItemsData.filter(item => item.category === activeFilter));
        }
        // Re-run IntersectionObserver for new visible items if needed,
        // though the App.js observer is broad enough.
    }, [activeFilter]); // Reruns when activeFilter changes

    return (
        <section id="portfolio">
            <div className="container filter-section">
                <h2>My Design Collection</h2>
                <div className="filter-buttons">
                    <button
                        className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('all')}
                        data-filter="all"
                    >
                        <i className="fas fa-layer-group"></i>All Work
                    </button>
                    <button
                        className={`filter-btn ${activeFilter === 'photoshop' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('photoshop')}
                        data-filter="photoshop"
                    >
                        <i className="fab fa-adobe"></i>Photoshop
                    </button>
                    <button
                        className={`filter-btn ${activeFilter === 'illustrator' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('illustrator')}
                        data-filter="illustrator"
                    >
                        <i className="fas fa-pen-nib"></i>Illustrator
                    </button>
                    <button
                        className={`filter-btn ${activeFilter === 'after-effects' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('after-effects')}
                        data-filter="after-effects"
                    >
                        <i className="fas fa-film"></i>After Effects
                    </button>
                    <button
                        className={`filter-btn ${activeFilter === '3dsmax' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('3dsmax')}
                        data-filter="3dsmax"
                    >
                        <i className="fas fa-cube"></i>3Ds Max
                    </button>
                </div>

                <div className="portfolio-grid">
                    {visibleItems.map(item => (
                        <div key={item.id} className={`portfolio-item ${item.category}`} data-category={item.category}>
                            <div className="portfolio-img">
                                {item.imgSrc ? (
                                    <img src={item.imgSrc} alt={item.alt} />
                                ) : (
                                    <video controls poster="https://via.placeholder.com/300x250/858971/ffffff?text=Motion+Graphics+Preview">
                                        <source src={item.videoSrc} type="video/mp4" />
                                    </video>
                                )}
                            </div>
                            <div className="portfolio-info">
                                <h3>{item.title}</h3>
                                {/* Use dangerouslySetInnerHTML if description contains HTML like <i> */}
                                <p dangerouslySetInnerHTML={{ __html: item.description }}></p>
                                <span className="software-tag">Made using {item.software} by Liteboho Majoro</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;