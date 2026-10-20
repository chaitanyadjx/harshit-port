import React, { useEffect, useState, useRef } from 'react';

export default function GlowCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [speed, setSpeed] = useState(0);

  const dronePos = useRef({ x: -100, y: -100 });
  const lastMousePos = useRef({ x: -100, y: -100 });
  const velocity = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    // Only show custom drone cursor on desktop/non-touch
    const isMobile = window.matchMedia('(max-width: 950px)').matches;
    if (isMobile) return;

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);

      // Check if hovering clickable elements
      const target = e.target;
      const isClickable = target.closest('button, a, input, [role="button"], .project-card, .tilt-card, .tab-btn, .action-btn');
      setIsHovering(!!isClickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Physics flight loop with inertia and banking
    const flightLoop = () => {
      // Calculate mouse velocity
      const dx = pos.x - lastMousePos.current.x;
      const dy = pos.y - lastMousePos.current.y;
      velocity.current.x += (dx - velocity.current.x) * 0.3;
      velocity.current.y += (dy - velocity.current.y) * 0.3;
      lastMousePos.current = { x: pos.x, y: pos.y };

      // Calculate speed for flight HUD
      const currentSpeed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);
      const roll = Math.max(-18, Math.min(18, velocity.current.x * 1.0));
      setSpeed(Math.min(currentSpeed * 2, 80));

      const droneEl = document.getElementById('uas-drone-cursor');
      if (droneEl) {
        droneEl.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0px) rotate(${roll}deg) scale(${isClicking ? 0.9 : isHovering ? 1.15 : 1})`;
      }

      rafRef.current = requestAnimationFrame(flightLoop);
    };

    rafRef.current = requestAnimationFrame(flightLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [pos, visible, isHovering, isClicking]);

  if (!visible) return null;

  return (
    <div
      id="uas-drone-cursor"
      className={`drone-cursor-wrapper ${isHovering ? 'is-hovering' : ''} ${isClicking ? 'is-thrusting' : ''}`}
      aria-hidden="true"
    >
      {/* Flight Telemetry HUD Tag with speed and target status */}
      <div className="drone-hud-tag">
        <span className="drone-tag-status">
          <span className="drone-beacon-dot" />
          {isHovering ? 'TARGET LOCK' : 'UAS READY'}
        </span>
        <span className="drone-tag-stats">
          ALT: 42m &bull; {Math.round(speed)} km/h
        </span>
      </div>

      {/* Target Reticle when hovering interactive elements */}
      {isHovering && (
        <div className="drone-target-reticle">
          <div className="reticle-corner tl" />
          <div className="reticle-corner tr" />
          <div className="reticle-corner bl" />
          <div className="reticle-corner br" />
          <div className="reticle-pulse" />
        </div>
      )}

      {/* Thruster / Downwash glow particle */}
      <div className="drone-thruster-glow" />

      {/* SVG Quadcopter Drone */}
      <svg
        className="drone-svg"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Drone Diagonal Arms (Carbon Fiber Struts) */}
        <line x1="22" y1="22" x2="78" y2="78" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
        <line x1="78" y1="22" x2="22" y2="78" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />

        {/* Central Cross Frame reinforcement */}
        <circle cx="50" cy="50" r="14" stroke="#0284c7" strokeWidth="2" strokeDasharray="3 3" />

        {/* Motor Hub Mounts */}
        <circle cx="22" cy="22" r="7" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
        <circle cx="78" cy="22" r="7" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
        <circle cx="22" cy="78" r="7" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
        <circle cx="78" cy="78" r="7" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />

        {/* 4 Spinning Rotor Blades with blurred spinning discs */}
        {/* Top-Left Rotor */}
        <g className="drone-rotor rotor-cw" style={{ transformOrigin: '22px 22px' }}>
          <ellipse cx="22" cy="22" rx="15" ry="3.5" fill="#38bdf8" fillOpacity="0.75" />
          <circle cx="22" cy="22" r="2.5" fill="#ffffff" />
        </g>

        {/* Top-Right Rotor */}
        <g className="drone-rotor rotor-ccw" style={{ transformOrigin: '78px 22px' }}>
          <ellipse cx="78" cy="22" rx="15" ry="3.5" fill="#38bdf8" fillOpacity="0.75" />
          <circle cx="78" cy="22" r="2.5" fill="#ffffff" />
        </g>

        {/* Bottom-Left Rotor */}
        <g className="drone-rotor rotor-ccw" style={{ transformOrigin: '22px 78px' }}>
          <ellipse cx="22" cy="78" rx="15" ry="3.5" fill="#38bdf8" fillOpacity="0.75" />
          <circle cx="22" cy="78" r="2.5" fill="#ffffff" />
        </g>

        {/* Bottom-Right Rotor */}
        <g className="drone-rotor rotor-cw" style={{ transformOrigin: '78px 78px' }}>
          <ellipse cx="78" cy="78" rx="15" ry="3.5" fill="#38bdf8" fillOpacity="0.75" />
          <circle cx="78" cy="78" r="2.5" fill="#ffffff" />
        </g>

        {/* Center Fuselage / Avionics Core */}
        <rect x="42" y="38" width="16" height="24" rx="4" fill="#0f172a" stroke="#00f0ff" strokeWidth="2" />

        {/* Front FPV Camera Gimbal Lens */}
        <circle cx="50" cy="38" r="3.5" fill="#ef4444" />
        <circle cx="50" cy="38" r="1.5" fill="#ffffff" />

        {/* Central Flight Controller LED / Beacon */}
        <circle cx="50" cy="50" r="3" fill="#38bdf8" className="drone-center-light" />
        <circle cx="50" cy="50" r="6" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.6" className="drone-beacon-ring" />
      </svg>
    </div>
  );
}
