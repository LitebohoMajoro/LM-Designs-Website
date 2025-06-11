import React, { useEffect, useRef, useCallback } from 'react';
import './App.css'; // Use the same CSS file for consistent styling
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom'; // Import Link for navigation

function Recommendations() {
  const navLinksRef = useRef(null);

  // State for cursor trail dots
  const cursorTrailRef = useRef(null);
  const cursorLightRef = useRef(null);
  const dotsRef = useRef([]);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const easeFactor = 0.2; // Controls how quickly the trail follows

  // Function to initialize cursor dots
  const initCursorDots = useCallback(() => {
    if (!cursorTrailRef.current) return;

    const dotCount = 5;
    dotsRef.current = [];
    for (let i = 0; i < dotCount; i++) {
      let dot = document.createElement('div');
      dot.className = 'cursor-dot';
      cursorTrailRef.current.appendChild(dot);
      dotsRef.current.push({ element: dot, x: 0, y: 0 });
    }
  }, []);

  // Cursor animation loop
  const animateCursor = useCallback(() => {
    if (!cursorLightRef.current) return;

    currentX.current += (mouseX.current - currentX.current) * easeFactor;
    currentY.current += (mouseY.current - currentY.current) * easeFactor;

    cursorLightRef.current.style.left = currentX.current + 'px';
    cursorLightRef.current.style.top = currentY.current + 'px';

    dotsRef.current.forEach((dot, index) => {
      const prevDot = index === 0 ? { x: currentX.current, y: currentY.current } : dotsRef.current[index - 1];
      dot.x += (prevDot.x - dot.x) * easeFactor;
      dot.y += (prevDot.y - dot.y) * easeFactor;

      dot.element.style.left = dot.x + 'px';
      dot.element.style.top = dot.y + 'px';
    });

    requestAnimationFrame(animateCursor);
  }, []);

  // --- Mobile Navigation Toggle ---
  useEffect(() => {
    const hamburger = document.querySelector('.hamburger');
    if (hamburger && navLinksRef.current) {
      const toggleNav = () => {
        navLinksRef.current.classList.toggle('active');
      };
      hamburger.addEventListener('click', toggleNav);
      return () => hamburger.removeEventListener('click', toggleNav);
    }
  }, []);

  // --- Smooth Scrolling & Intersection Observer ---
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observerInstance.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.contact-section, footer, .contact-info, .form-group, .contact-method, .social-links a').forEach(el => {
      observer.observe(el);
    });

    const handleSmoothScroll = (e) => {
        const targetId = e.currentTarget.getAttribute('href');
        // Only prevent default if it's an internal hash link on this page
        if (targetId.startsWith('#') && window.location.pathname.endsWith('recommendations')) { // Or however your route is defined
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
            if (navLinksRef.current && navLinksRef.current.classList.contains('active')) {
                navLinksRef.current.classList.remove('active');
            }
        }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleSmoothScroll);
    });

    return () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.removeEventListener('click', handleSmoothScroll);
        });
        observer.disconnect();
    };
  }, []);

  // --- Cursor Effect ---
  useEffect(() => {
    initCursorDots();
    animateCursor();

    const handleMouseMove = (e) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      if (cursorLightRef.current) {
        cursorLightRef.current.style.opacity = '0.3'; // Reduced opacity
      }
      dotsRef.current.forEach(dot => dot.element.style.opacity = '1');
    };

    const handleMouseLeave = () => {
      if (cursorLightRef.current) {
        cursorLightRef.current.style.opacity = '0';
      }
      dotsRef.current.forEach(dot => dot.element.style.opacity = '0');
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    if ('ontouchstart' in window) {
      document.body.style.cursor = 'default';
      if (cursorLightRef.current) cursorLightRef.current.style.display = 'none';
      if (cursorTrailRef.current) cursorTrailRef.current.style.display = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (cursorTrailRef.current) {
        cursorTrailRef.current.innerHTML = '';
      }
    };
  }, [initCursorDots, animateCursor]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    alert(`Thank you ${name}! Your recommendations have been received. I'll review them and get back to you soon.`);
    e.target.reset();
  };

  return (
    <div className="Recommendations">
      <div id="cursor-trail" ref={cursorTrailRef}></div>
      <div className="cursor-light" ref={cursorLightRef}></div>

      <header>
        <div className="container navbar">
          <div className="logo">
            <i className="fas fa-palette"></i>
            LMDesigns
          </div>
          <ul className="nav-links" ref={navLinksRef}>
            <li><Link to="/">Home</Link></li> {/* Use Link for internal navigation */}
            <li><Link to="/#portfolio">Portfolio</Link></li>
            <li><Link to="/recommendations">Recommendations</Link></li>
          </ul>
          <div className="hamburger">
            <i className="fas fa-bars"></i>
          </div>
        </div>
      </header>

      <section className="contact-section" id="contact">
        <div className="container contact-container">
          <h2>Feedback & Recommendations</h2>
          <form id="recommendation-form" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" name="name" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" required />
            </div>

            <div className="form-group">
              <label htmlFor="design">Select Design (Optional)</label>
              <select id="design" name="design">
                <option value="">Choose a design</option>
                <option value="Beauty Pegeant Poster">Beauty Pegeant Poster</option>
                <option value="Sunday Program">Sunday Program</option>
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

            <div className="form-group">
              <label htmlFor="message">Your Recommendations</label>
              <textarea id="message" name="message" placeholder="How can I improve my designs? What did you like? What could be better?" required></textarea>
            </div>

            <button type="submit" className="cta-button">Send Feedback</button>
          </form>

          <div className="contact-info">
            <h3>Contact Me Directly</h3>
            <p>Prefer to reach out directly? Here's how you can contact me:</p>

            <div className="contact-methods">
              <a href="https://github.com/LitebohoMajoro" target="_blank" className="contact-method" aria-label="GitHub Profile">
                <i className="fab fa-github"></i>
                <span>GitHub: LitebohoMajoro</span>
              </a>

              <a href="mailto:litebohomajoro2580@gmail.com" className="contact-method" aria-label="Send Email">
                <i className="fas fa-envelope"></i>
                <span>Email: litebohomajoro2580@gmail.com</span>
              </a>

              <a href="https://wa.me/+26653359840" target="_blank" className="contact-method" aria-label="WhatsApp Chat">
                <i className="fab fa-whatsapp"></i>
                <span>WhatsApp: +266 53359840</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="social-links">
            <a href="https://github.com/LitebohoMajoro" target="_blank" aria-label="GitHub Profile"><i className="fab fa-github"></i></a>
            <a href="mailto:litebohomajoro2580@gmail.com" aria-label="Send Email"><i className="fas fa-envelope"></i></a>
            <a href="https://wa.me/+26653359840" target="_blank" aria-label="WhatsApp Chat"><i className="fab fa-whatsapp"></i></a>
          </div>
          <p className="copyright">© 2023 Liteboho Majoro. All designs and creative works are property of the artist.</p>
        </div>
      </footer>
    </div>
  );
}

export default Recommendations;