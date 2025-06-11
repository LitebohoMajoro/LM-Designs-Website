// src/pages/RecommendationsPage.jsx
import React, { useEffect, useRef } from 'react';

const RecommendationsPage = () => {
    // Refs for scroll animations
    const contactSectionRef = useRef(null);
    const formGroupsRefs = useRef([]);
    const contactInfoRef = useRef(null);
    const contactMethodRefs = useRef([]);

    useEffect(() => {
        const recommendationForm = document.getElementById('recommendation-form');

        const handleSubmit = async (e) => { // Make handleSubmit async
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const design = document.getElementById('design').value;
            const message = document.getElementById('message').value;

            try {
                const response = await fetch('http://localhost:5000/api/recommendations', { // Your backend URL
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, design, message }),
                });

                const data = await response.json();

                if (response.ok) {
                    alert(`Thank you ${name}! Your recommendations have been received.`);
                    recommendationForm.reset();
                } else {
                    alert(`Failed to send recommendation: ${data.message || 'Unknown error'}`);
                    console.error('Backend error:', data);
                }
            } catch (error) {
                console.error('Error submitting recommendation:', error);
                alert('There was an issue submitting your recommendation. Please try again.');
            }
        };

        if (recommendationForm) {
            recommendationForm.addEventListener('submit', handleSubmit);
        }

        return () => {
            if (recommendationForm) {
                recommendationForm.removeEventListener('submit', handleSubmit);
            }
        };
    }, []);

    // Intersection Observer for scroll animations (remains the same)
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
            contactSectionRef.current,
            contactInfoRef.current,
            ...formGroupsRefs.current,
            ...contactMethodRefs.current
        ].filter(Boolean); // Filter out nulls

        elementsToObserve.forEach(el => observer.observe(el));

        return () => {
            elementsToObserve.forEach(el => observer.unobserve(el));
        };
    }, []);

    return (
        <section className="contact-section" id="contact" ref={contactSectionRef}>
            <div className="container contact-container">
                <h2>Feedback & Recommendations</h2>
                <form id="recommendation-form">
                    <div className="form-group" ref={el => formGroupsRefs.current[0] = el}>
                        <label htmlFor="name">Your Name</label>
                        <input type="text" id="name" name="name" required />
                    </div>

                    <div className="form-group" ref={el => formGroupsRefs.current[1] = el}>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" name="email" required />
                    </div>

                    <div className="form-group" ref={el => formGroupsRefs.current[2] = el}>
                        <label htmlFor="design">Select Design (Optional)</label>
                        <select id="design" name="design">
                            <option value="">Choose a design</option>
                            <option value="Beauty Pegeant Poster">Beauty Pegeant Poster</option>
                            <option value="Sunday Program">Sunday Program</option>
                            <option value="Obama Logo">Obama Logo</option>
                            <option value="Concert Poster (Version 1)">Concert Poster (Version 1)</option>
                            <option value="Concert Poster (Version 2)">Concert Poster (Version 2)</option>
                            <option value="The Lesotho Kingdom Logo">The Lesotho Kingdom Logo</option>
                            <option value="Real Image of Mr Bean">Real Image of Mr Bean</option>
                            <option value="Illustrated Image of Mr Bean">Illustrated Image of Mr Bean</option>
                            <option value="Motion Graphics: Geometric Patterns (Version 1)">Motion Graphics: Geometric Patterns (Version 1)</option>
                            <option value="Motion Graphics: Geometric Patterns (Version 2)">Motion Graphics: Geometric Patterns (Version 2)</option>
                            <option value="Motion Graphics: Cyber Growth Engine">Motion Graphics: Cyber Growth Engine</option>
                            <option value="Limkokwing University Hall 3 Interior">Limkokwing University Hall 3 Interior</option>
                            <option value="Limkokwing University Multimedia 7 Classroom">Limkokwing University Multimedia 7 Classroom</option>
                            <option value="Limkokwing University Exterior Design">Limkokwing University Exterior Design</option>
                        </select>
                    </div>

                    <div className="form-group" ref={el => formGroupsRefs.current[3] = el}>
                        <label htmlFor="message">Your Recommendations</label>
                        <textarea id="message" name="message" placeholder="How can I improve my designs? What did you like? What could be better?" required></textarea>
                    </div>

                    <button type="submit" className="cta-button">Send Feedback</button>
                </form>

                <div className="contact-info" ref={contactInfoRef}>
                    <h3>Contact Me Directly</h3>
                    <p>Prefer to reach out directly? Here's how you can contact me:</p>

                    <div className="contact-methods">
                        <a href="https://github.com/LitebohoMajoro" target="_blank" className="contact-method" aria-label="GitHub Profile" ref={el => contactMethodRefs.current[0] = el}>
                            <i className="fab fa-github"></i>
                            <span>GitHub: LitebohoMajoro</span>
                        </a>

                        <a href="mailto:litebohomajoro2580@gmail.com" className="contact-method" aria-label="Send Email" ref={el => contactMethodRefs.current[1] = el}>
                            <i className="fas fa-envelope"></i>
                            <span>Email: litebohomajoro2580@gmail.com</span>
                        </a>

                        <a href="https://wa.me/+26653359840" target="_blank" className="contact-method" aria-label="WhatsApp Chat" ref={el => contactMethodRefs.current[2] = el}>
                            <i className="fab fa-whatsapp"></i>
                            <span>WhatsApp: +266 53359840</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RecommendationsPage;