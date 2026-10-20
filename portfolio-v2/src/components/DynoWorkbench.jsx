import React, { useState, useMemo } from 'react';
import { sound } from '../utils/audio';
import { Gauge, Zap, Activity, Sliders, ChevronRight } from 'lucide-react';

const GEAR_RATIOS = [
  { id: '10to1', name: '10:1 Planetary Reduction', ratio: 10.0, desc: 'Baja SAE Custom Planetary Box (Max Gradeability & Rock Crawl)', tag: 'CUSTOM BAJA' },
  { id: 'cvt-low', name: '3.8:1 CVT Launch Low', ratio: 3.8, desc: 'Primary Centrifugal Sheave Clamp (Maximum Launch Acceleration)', tag: 'CVT RATIO' },
  { id: 'direct', name: '1.0:1 Direct Drive', ratio: 1.0, desc: '1:1 Nominal Transfer Ratio (Mid-Range Endurance Run)', tag: 'CRUISE' },
  { id: 'overdrive', name: '0.8:1 High Overdrive', ratio: 0.8, desc: 'Final Overdrive Configuration (Top Speed Straightaway Run)', tag: 'TOP SPEED' },
];

export default function DynoWorkbench() {
  const [selectedGear, setSelectedGear] = useState(GEAR_RATIOS[0]);
  const [engineRpm, setEngineRpm] = useState(2600); // 2600 RPM peak torque

  // Realistic Baja SAE 10HP Engine Torque Curve calculation
  const engineTorque = useMemo(() => {
    // Peak 19.5 Nm at 2600 RPM, parabolic dropoff
    const diff = (engineRpm - 2600) / 1000;
    const base = 19.5 - diff * diff * 3.2;
    return Math.max(12.0, Number(base.toFixed(1)));
  }, [engineRpm]);

  // Transmission efficiency
  const efficiency = 0.95;

  // Real Multiplied Wheel Torque
  const wheelTorque = useMemo(() => {
    return Math.round(engineTorque * selectedGear.ratio * efficiency);
  }, [engineTorque, selectedGear.ratio]);

  // Engine Horsepower
  const horsepower = useMemo(() => {
    return Number(((engineTorque * engineRpm) / 5252).toFixed(1));
  }, [engineTorque, engineRpm]);

  // Wheel RPM and calculated vehicle ground speed (23" tires, D = 0.584m)
  const wheelRpm = Math.round(engineRpm / selectedGear.ratio);
  const tireCircumferenceMeters = Math.PI * 0.584; // ~1.835m
  const vehicleSpeedKmh = Math.round((wheelRpm * tireCircumferenceMeters * 60) / 1000);

  const handleRatioSelect = (gear) => {
    sound.playThrottle();
    setSelectedGear(gear);
  };

  const handleRpmChange = (e) => {
    const val = Number(e.target.value);
    setEngineRpm(val);
    sound.playRpmWhine(val);
  };

  // SVG Dyno Curve coordinates generator
  const curvePoints = useMemo(() => {
    const pts = [];
    for (let r = 1000; r <= 3800; r += 200) {
      const diff = (r - 2600) / 1000;
      const t = Math.max(12.0, 19.5 - diff * diff * 3.2);
      const wt = t * selectedGear.ratio * efficiency;
      // Map r (1000..3800) to X (30..370), wt (0..200) to Y (140..20)
      const x = 30 + ((r - 1000) / 2800) * 340;
      const y = 140 - (wt / (20 * 10 * efficiency)) * 120;
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return pts.join(' ');
  }, [selectedGear.ratio]);

  // Current operating point on dyno curve
  const currentOpX = 30 + ((engineRpm - 1000) / 2800) * 340;
  const currentOpY = 140 - (wheelTorque / (20 * 10 * efficiency)) * 120;

  return (
    <div className="dyno-container">
      {/* Dyno Header */}
      <div className="dyno-header">
        <div className="dyno-header-left">
          <div className="dyno-title-row">
            <Gauge size={18} className="dyno-icon" />
            <h3>POWERTRAIN DYNO TEST BENCH</h3>
          </div>
          <span className="dyno-sub">BRIGGS &amp; STRATTON 10HP &bull; BAJA MONARCH TRANSAXLE &bull; DYNOCELL SIMULATOR</span>
        </div>
        <div className="dyno-status-badge">
          <span className="dyno-live-dot" />
          <span>DYNO CALIBRATED [RUNNING]</span>
        </div>
      </div>

      {/* Main Dyno Display Grid */}
      <div className="dyno-main-grid">
        {/* Left Column: Ratio Selectors & Controls */}
        <div className="dyno-controls-panel">
          <div className="section-sub-label">1. SELECT TRANSMISSION REDUCTION RATIO:</div>
          <div className="ratio-cards-grid">
            {GEAR_RATIOS.map((gear) => (
              <div
                key={gear.id}
                className={`ratio-card ${selectedGear.id === gear.id ? 'active-ratio' : ''}`}
                onClick={() => handleRatioSelect(gear)}
              >
                <div className="ratio-card-top">
                  <span className="ratio-val">{gear.ratio}:1</span>
                  <span className="ratio-tag">{gear.tag}</span>
                </div>
                <div className="ratio-name">{gear.name}</div>
                <div className="ratio-desc">{gear.desc}</div>
              </div>
            ))}
          </div>

          {/* RPM Throttle Slider */}
          <div className="rpm-throttle-box">
            <div className="throttle-header">
              <span className="throttle-label"><Sliders size={14} /> ENGINE THROTTLE TACHOMETER:</span>
              <span className="throttle-val">{engineRpm} RPM {engineRpm >= 3600 ? '(REDLINE)' : ''}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="3800"
              step="50"
              value={engineRpm}
              onChange={handleRpmChange}
              className="dyno-slider"
            />
            <div className="slider-ticks">
              <span>1000 Idle</span>
              <span>2000</span>
              <span className="peak-tick">2600 Peak Torque</span>
              <span>3200</span>
              <span className="red-tick">3800 Redline</span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Telemetry Gauges & Curve */}
        <div className="dyno-readout-panel">
          <div className="section-sub-label">2. REAL-TIME MULTIPLIED DRIVELINE TELEMETRY:</div>

          {/* Telemetry Numbers */}
          <div className="telemetry-stat-row">
            <div className="stat-card">
              <span className="stat-lbl">ENGINE TORQUE</span>
              <span className="stat-num">{engineTorque} <small>Nm</small></span>
              <span className="stat-sub">B&amp;S 305cc Vanguard</span>
            </div>
            <div className="stat-card highlight-card">
              <span className="stat-lbl">WHEEL TORQUE</span>
              <span className="stat-num highlight-num">{wheelTorque} <small>Nm</small></span>
              <span className="stat-sub">{selectedGear.ratio}:1 Multiplied</span>
            </div>
            <div className="stat-card">
              <span className="stat-lbl">BRAKE POWER</span>
              <span className="stat-num">{horsepower} <small>HP</small></span>
              <span className="stat-sub">{Math.round(horsepower * 0.7457 * 10) / 10} kW Mech.</span>
            </div>
            <div className="stat-card">
              <span className="stat-lbl">CALC. VEHICLE SPEED</span>
              <span className="stat-num">{vehicleSpeedKmh} <small>km/h</small></span>
              <span className="stat-sub">{wheelRpm} Wheel RPM (23" Tires)</span>
            </div>
          </div>

          {/* Interactive Dyno Torque Curve Graph */}
          <div className="dyno-graph-box">
            <div className="graph-header">
              <span className="graph-title"><Activity size={13} /> LIVE WHEEL TORQUE DYNOCELL CURVE (Nm vs RPM)</span>
              <span className="graph-op-badge">OP: {engineRpm} RPM &bull; {wheelTorque} Nm</span>
            </div>
            <svg viewBox="0 0 400 150" className="dyno-svg-chart">
              {/* Grid lines */}
              <line x1="30" y1="20" x2="380" y2="20" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
              <line x1="30" y1="60" x2="380" y2="60" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
              <line x1="30" y1="100" x2="380" y2="100" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
              <line x1="30" y1="140" x2="380" y2="140" stroke="rgba(255,255,255,0.25)" />

              {/* Axes Labels */}
              <text x="35" y="15" fill="#64748b" fontSize="8" fontFamily="monospace">WHEEL TORQUE (Nm)</text>
              <text x="340" y="136" fill="#64748b" fontSize="8" fontFamily="monospace">RPM</text>

              {/* Torque Curve */}
              <polyline
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2.5"
                points={curvePoints}
              />

              {/* Current operating point dot */}
              <circle
                cx={currentOpX}
                cy={currentOpY}
                r="5"
                fill="#38bdf8"
                stroke="#ffffff"
                strokeWidth="2"
              />
              <line
                x1={currentOpX}
                y1={currentOpY}
                x2={currentOpX}
                y2="140"
                stroke="#38bdf8"
                strokeDasharray="2 2"
                opacity="0.6"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
