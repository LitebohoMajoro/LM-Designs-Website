// src/data/portfolioData.js

// Import images directly so Webpack/Vite handles them
import BeautyPegeantPoster from 'src/images/BEATY PEGEANT poster.webp';
import TsebeletsoRecovered from '../images/Tsebeletso-Recovered.webp';
import MusicConcert1 from '../assets/images/Music Concert 1.webp';
import MusicConcert2 from '../assets/images/Music Concert 2.webp';
import Logo1 from '../assets/images/Logo 1.webp';
import MrBean from '../assets/images/Mr bean.webp';
import MrBeanIllustrator from '../assets/images/Mr bean Illustrator.webp';
import Hall3 from '../assets/images/HALL 3.webp';
import MM7 from '../assets/images/MM 7..webp';
import Outside2 from '../assets/images/OUTSITE 2.webp';

// Import videos
import Motion2Video from '/images/Motiion 2.mp4';// Assuming Motiion 2.mp4 is in public/images
import Motion1Video from '/images/Motiion 1.mp4';
import Motion3Video from '/images/Motion 3.mp4';

// OPTIONAL: Import a specific poster image if you have one for your videos
// For example, if you have a default video poster image:
import VideoPosterPlaceholder from '../assets/images/video-poster-placeholder.webp'; // Create this image if you want a local one
import Home from '../pages/Home';

const portfolioItems = [
    {
        id: 1,
        category: 'photoshop',
        type: 'image',
        src: BeautyPegeantPoster, // Using the imported variable
        alt: 'BEAUTY PEGEANT poster', // Renamed from altText to alt
        title: 'Beauty Pegeant Poster',
        description: 'Exploring Beauty Pegeant through photo manipulation',
        software: 'Photoshop'
    },
    {
        id: 2,
        category: 'photoshop',
        type: 'image',
        src: TsebeletsoRecovered,
        alt: 'Sunday program poster',
        title: 'Sunday Program',
        description: 'This is a Sunday program poster I made for my church Mankoaneng LECSA',
        software: 'Photoshop'
    },
    {
        id: 3,
        category: 'photoshop',
        type: 'image',
        src: MusicConcert1,
        alt: 'Music Concert 1',
        title: 'Concert Poster (Version 1)',
        description: 'Church music Concert poster',
        software: 'Photoshop'
    },
    {
        id: 4,
        category: 'photoshop',
        type: 'image',
        src: MusicConcert2,
        alt: 'Music Concert 2',
        title: 'Concert Poster (Version 2)',
        description: 'Church music Concert poster',
        software: 'Photoshop'
    },
    {
        id: 5,
        category: 'illustrator',
        type: 'image',
        src: Logo1,
        alt: 'Lesotho Kingdom Logo',
        title: 'The Lesotho Kingdom Logo',
        description: 'One of the rare simplest typographic Lesotho Logos',
        software: 'Illustrator'
    },
    {
        id: 6,
        category: 'illustrator',
        type: 'image',
        src: MrBean,
        alt: 'Real image of Mr Bean',
        title: 'Real Image of Mr Bean',
        description: 'Reference image for illustration.',
        software: 'Illustrator'
    },
    {
        id: 7,
        category: 'illustrator',
        type: 'image',
        src: MrBeanIllustrator,
        alt: 'Illustrated image of Mr Bean',
        title: 'Illustrated Image of Mr Bean',
        description: 'I drew him from scratch using Adobe Illustrator.',
        software: 'Illustrator'
    },
    {
        id: 8,
        category: 'after-effects',
        type: 'video',
        src: Motion2Video, // Using the imported variable
        // Using the imported placeholder poster, or keep the external URL if you prefer
        poster: VideoPosterPlaceholder, // Recommended: Use a local poster image
        // poster: 'https://via.placeholder.com/300x250/858971/ffffff?text=Motion+Graphics+Preview', // Alternative: External URL
        alt: 'Motion Graphics Preview', // Added alt for video posters if displayed as images
        title: 'Motion Graphics: Geometric Patterns (Version 1)',
        description: 'Complex vector art with intricate geometric patterns',
        software: 'After Effects'
    },
    {
        id: 9,
        category: 'after-effects',
        type: 'video',
        src: Motion1Video,
        poster: VideoPosterPlaceholder,
        alt: 'Motion Graphics Preview',
        title: 'Motion Graphics: Geometric Patterns (Version 2)',
        description: 'Complex vector art with intricate geometric patterns',
        software: 'After Effects'
    },
    {
        id: 10,
        category: 'after-effects',
        type: 'video',
        src: Motion3Video,
        poster: VideoPosterPlaceholder,
        alt: 'Motion Graphics Preview',
        title: 'Motion Graphics: Cyber Growth Engine',
        description: 'Complex but simple futuristic vector art.',
        software: 'After Effects'
    },
    {
        id: 11,
        category: '3dsmax',
        type: 'image',
        src: Hall3,
        alt: 'Limkokwing University Hall 3',
        title: 'Limkokwing University Hall 3 Interior',
        description: 'Designing the interior of Hall 3 at Limkokwing University.',
        software: '3ds Max'
    },
    {
        id: 12,
        category: '3dsmax',
        type: 'image',
        src: MM7,
        alt: 'Multimedia 7 Classroom',
        title: 'Limkokwing University Multimedia 7 Classroom',
        description: 'Designing the Multimedia 7 classroom interior.',
        software: '3ds Max'
    },
    {
        id: 13,
        category: '3dsmax',
        type: 'image',
        src: Outside2,
        alt: 'Limkokwing University Exterior',
        title: 'Limkokwing University Exterior Design',
        description: 'Designing the exterior of Limkokwing University.',
        software: '3ds Max'
    }
];

export default Home;