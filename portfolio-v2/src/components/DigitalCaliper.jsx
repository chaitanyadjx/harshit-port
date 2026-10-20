import React, { useState, useRef } from 'react';
import { sound } from '../utils/audio';
import { X, RotateCcw, Check, Sparkles } from 'lucide-react';

const PRESETS = [
  { name: 'Sun Gear Bore', val: 28.00, desc: 'Baja Input Shaft Interface' },
  { name: 'Planet Pitch Circle', val: 38.00, desc: 'Planetary Cluster Orbit Radius' },
  { name: 'Annulus OD', val: 64.00, desc: 'Transmission Reaction Housing' },
  { name: 'Needle Pin Dia', val: 10.00, desc: 'Planet Bearing Journal' },
];

export default function DigitalCaliper({ isOpen, onClose }) {
  const [measurementMm, setMeasurementMm] = useState(28.00);
  const [unit, setUnit] = useState('mm'); // 'mm' | 'in'
  const [zeroOffset, setZeroOffset] = useState(0);

  const lastTickValue = useRef(measurementMm);

  if (!isOpen) return null;

  const currentDistance = measurementMm - zeroOffset;
  const displayValue = unit === 'mm'
    ? currentDistance.toFixed(2)
    : (currentDistance / 25.4).toFixed(4);

  const handleSliderChange = (e) => {
    const val = Number(e.target.value);
    setMeasurementMm(val);
    if (Math.abs(val - lastTickValue.current) >= 1.0) {
      sound.playTick();
      lastTickValue.current = val;
    }
  };

  const handleZero = () => {
    sound.playClick();
    setZeroOffset(measurementMm);
  };

  const handleResetZero = () => {
    sound.playClick();
    setZeroOffset(0);
  };

  const handleToggleUnit = () => {
    sound.playClick();
    setUnit(unit === 'mm' ? 'in' : 'mm');
  };

  const applyPreset = (preset) => {
    sound.playClick();
    setZeroOffset(0);
    setMeasurementMm(preset.val);
  };

  return (
    <div className="caliper-modal-overlay" onClick={onClose}>
      <div className="caliper-window" onClick={(e) => e.stopPropagation()}>
        {/* Window Bar */}
        <div className="caliper-win-bar">
          <div className="caliper-win-title">
            <span>PRECISION METROLOGY // DIGITAL VERNIER CALIPER (0–150 mm)</span>
          </div>
          <button className="caliper-close-btn" onClick={onClose} title="Close Caliper">
            <X size={15} />
          </button>
        </div>

        {/* Caliper Tool Visual Body */}
        <div className="caliper-body">
          {/* Main Graduated Beam */}
          <div className="caliper-beam">
            {/* Fixed Left Jaw */}
            <div className="caliper-fixed-jaw">
              <span className="jaw-label">FIXED ANVIL</span>
            </div>

            {/* Scale Markings */}
            <div className="caliper-graduations">
              {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((tick) => (
                <div key={tick} className="grad-tick">
                  <div className="tick-line" />
                  <span className="tick-num">{tick}</span>
                </div>
              ))}
            </div>

            {/* Sliding Caliper Head with LCD */}
            <div
              className="caliper-slider-head"
              style={{
                left: `${Math.min(85, Math.max(12, (measurementMm / 100) * 65 + 12))}%`
              }}
            >
              {/* Moving Jaw */}
              <div className="caliper-moving-jaw">
                <span className="jaw-label">MEASURING JAW</span>
              </div>

              {/* Digital LCD Unit */}
              <div className="caliper-lcd-housing">
                <div className="caliper-lcd-screen">
                  <span className="lcd-digits">{displayValue}</span>
                  <span className="lcd-unit">{unit}</span>
                </div>

                {/* LCD Controls */}
                <div className="caliper-lcd-buttons">
                  <button className="lcd-btn" onClick={handleToggleUnit}>
                    {unit === 'mm' ? 'mm &rarr; IN' : 'IN &rarr; mm'}
                  </button>
                  <button className="lcd-btn" onClick={handleZero}>
                    ZERO
                  </button>
                  {zeroOffset !== 0 && (
                    <button className="lcd-btn reset-zero" onClick={handleResetZero} title="Reset Zero Reference">
                      <RotateCcw size={10} /> ABS
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Knurled Thumbscrew Slider */}
          <div className="thumbscrew-control-box">
            <div className="thumbscrew-label">
              <span>DRAG THUMBSCREW TO ADJUST JAW OPENING:</span>
              <strong>{measurementMm.toFixed(2)} mm ({displayValue} {unit})</strong>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="0.05"
              value={measurementMm}
              onChange={handleSliderChange}
              className="caliper-range-input"
            />
          </div>

          {/* Preset Mechanical Measurement Snaps */}
          <div className="caliper-presets-row">
            <span className="presets-title">SNAP TO CAD COMPONENT DIMENSION:</span>
            <div className="preset-chips">
              {PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  className={`preset-chip ${measurementMm === p.val ? 'preset-active' : ''}`}
                  onClick={() => applyPreset(p)}
                  title={p.desc}
                >
                  <span className="preset-name">{p.name}:</span>
                  <span className="preset-val">{p.val.toFixed(2)} mm</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
