import React, { useRef, useState, useCallback } from 'react';

export default function TiltCard({ children, className = '', onClick, style }) {
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setTiltStyle({
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out',
    });
    setGlowPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTiltStyle({
      transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
    });
    setGlowPos({ x: 50, y: 50 });
  }, []);

  return (
    <div
      ref={cardRef}
      className={`tilt-card cyber-card ${className}`}
      style={{
        ...style,
        ...tiltStyle,
        '--glow-x': `${glowPos.x}%`,
        '--glow-y': `${glowPos.y}%`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="tilt-card-glow" />
      <span className="cyber-corner tl" />
      <span className="cyber-corner tr" />
      <span className="cyber-corner bl" />
      <span className="cyber-corner br" />
      {children}
    </div>
  );
}
