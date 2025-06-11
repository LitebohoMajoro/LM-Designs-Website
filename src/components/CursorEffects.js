// src/components/CursorEffects.js
import React, { useEffect, useRef } from 'react';

const CursorEffects = () => {
    const cursorTrailRef = useRef(null);
    const cursorLightRef = useRef(null);
    const dotsRef = useRef([]);

    useEffect(() => {
        const cursorTrail = cursorTrailRef.current;
        const cursorLight = cursorLightRef.current;

        if (!cursorTrail || !cursorLight) return;

        let dots = [];
        let dotCount = 5;
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;
        const easeFactor = 0.2; // Controls how quickly the trail follows

        // Create cursor trail dots
        for (let i = 0; i < dotCount; i++) {
            let dot = document.createElement('div');
            dot.className = 'cursor-dot';
            cursorTrail.appendChild(dot);
            dots.push({ element: dot, x: 0, y: 0 }); // Store element and its position
        }
        dotsRef.current = dots; // Store in ref for cleanup

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Ensure cursor light and trail are visible on mouse move
            cursorLight.style.opacity = '0.3';
            dotsRef.current.forEach(dot => dot.element.style.opacity = '1');
        };

        const handleMouseLeave = () => {
            cursorLight.style.opacity = '0';
            dotsRef.current.forEach(dot => dot.element.style.opacity = '0');
        };

        const animateCursor = () => {
            currentX += (mouseX - currentX) * easeFactor;
            currentY += (mouseY - currentY) * easeFactor;

            cursorLight.style.left = currentX + 'px';
            cursorLight.style.top = currentY + 'px';

            dotsRef.current.forEach((dot, index) => {
                const prevDot = index === 0 ? { x: currentX, y: currentY } : dotsRef.current[index - 1];
                dot.x += (prevDot.x - dot.x) * easeFactor;
                dot.y += (prevDot.y - dot.y) * easeFactor;

                dot.element.style.left = dot.x + 'px';
                dot.element.style.top = dot.y + 'px';
            });

            requestAnimationFrame(animateCursor);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        animateCursor();

        // Hide cursor on touch devices (mobile)
        if ('ontouchstart' in window) {
            document.body.style.cursor = 'default';
            cursorLight.style.display = 'none';
            cursorTrail.style.display = 'none';
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            // Clean up dots
            dotsRef.current.forEach(dot => dot.element.remove());
        };
    }, []);

    return (
        <>
            <div id="cursor-trail" ref={cursorTrailRef}></div>
            <div className="cursor-light" ref={cursorLightRef}></div>
        </>
    );
};

export default CursorEffects;