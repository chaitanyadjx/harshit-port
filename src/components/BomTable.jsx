import React from 'react';
import { sound } from '../utils/audio';
import { Layers, ShieldCheck, Cpu, ChevronRight } from 'lucide-react';

export const BOM_DATA = [
  {
    id: 'sun-gear',
    itemNo: '01',
    name: 'Sun Input Gear',
    symbolKey: 'Sun Gear',
    teeth: '14T',
    module: '2.0 mm',
    material: 'AISI 8620 Case-Hardened Alloy Steel',
    hardness: '58–62 HRC',
    caseDepth: '1.1 mm Effective Depth',
    fos: '1.84 (Infinite Life)',
    peakTorque: '344 Nm Input Shock',
    functionNote: 'Transfers high-speed primary drive from centrifugal CVT to planetary cluster.',
    specs: [
      { label: 'Pitch Diameter', val: '28.00 mm' },
      { label: 'Pressure Angle', val: '20.0°' },
      { label: 'Yield Strength', val: '650 MPa' },
      { label: 'Manufacturing', val: 'Hobbed & CNC Shaved' },
    ]
  },
  {
    id: 'planet-gears',
    itemNo: '02',
    name: 'Planetary Satellite Cluster (3x)',
    symbolKey: 'Planetary Gear',
    teeth: '10T',
    module: '2.0 mm',
    material: '20MnCr5 Carburized Steel',
    hardness: '60 HRC Surface / 34 HRC Core',
    caseDepth: '0.85 mm',
    fos: '2.10 (AGMA 2001-D04)',
    peakTorque: '3x Balanced Orbit',
    functionNote: 'Equalizes radial drivetrain load across three needle-bearing orbital pins.',
    specs: [
      { label: 'Bearings', val: 'INA Needle Roller' },
      { label: 'Pin Center Dist.', val: '38.00 mm' },
      { label: 'Contact Stress', val: '840 MPa Max' },
      { label: 'Lubrication', val: 'SAE 75W-90 Synthetic' },
    ]
  },
  {
    id: 'annulus-ring',
    itemNo: '03',
    name: 'Annulus Internal Ring Gear',
    symbolKey: 'Annulus',
    teeth: '28T Internal',
    module: '2.0 mm',
    material: 'AISI 4140 Q&T Structural Steel',
    hardness: '32–36 HRC (Tough Core)',
    caseDepth: 'Through-Hardened',
    fos: '2.35 (Static / Shock)',
    peakTorque: '764 Nm Max Output',
    functionNote: 'Stationary reaction ring providing 10:1 gear reduction to 4WD transfer case.',
    specs: [
      { label: 'Major Dia.', val: '64.00 mm' },
      { label: 'Fasteners', val: '8x Grade 10.9 M6' },
      { label: 'Torsional Defl.', val: '< 0.08° at Peak' },
      { label: 'Standards', val: 'ISO 6336 Method B' },
    ]
  },
  {
    id: 'uas-rotor',
    itemNo: '04',
    name: 'UAS Hybrid Propulsor Pods (4x)',
    symbolKey: 'UAS Brushless',
    teeth: 'N/A',
    module: 'Direct Brushless',
    material: 'Al 6061-T6 CNC Billet & Toray T700 Carbon',
    hardness: '95 HB (T6 Temper)',
    caseDepth: 'Type III Hard Anodized',
    fos: '2.20 (Aero Fatigue)',
    peakTorque: '1.85 kg Static Thrust / Axis',
    functionNote: 'High-thrust brushless propulsion for hybrid vertical takeoff and terrain mapping.',
    specs: [
      { label: 'Motor Rating', val: '920 KV High-Flux' },
      { label: 'Propeller Spec', val: '9045 Carbon Fiber' },
      { label: 'Arm Geometry', val: 'Triangulated Truss' },
      { label: 'Operating Cell', val: '4S LiPo (14.8V)' },
    ]
  }
];

export default function BomTable({ activePart, onSelectPart }) {
  return (
    <div className="bom-container">
      <div className="bom-header">
        <div className="bom-header-left">
          <div className="bom-title-row">
            <Layers size={16} className="bom-icon" />
            <h3 className="bom-title">BILL OF MATERIALS (BOM)</h3>
          </div>
          <span className="bom-sub">ASME Y14.5M &bull; BAJA SAE 10:1 REDUCTION &bull; REV C</span>
        </div>
        <div className="bom-badge">
          <ShieldCheck size={13} />
          <span>ISO 2768-mK TOLERANCED</span>
        </div>
      </div>

      <div className="bom-table-wrapper">
        <table className="bom-table">
          <thead>
            <tr>
              <th>ITEM</th>
              <th>SUBSYSTEM COMPONENT</th>
              <th>ALLOY / SPECIFICATION</th>
              <th>HARDNESS</th>
              <th>FATIGUE FOS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {BOM_DATA.map((item) => {
              const isSelected = activePart && activePart.toLowerCase().includes(item.symbolKey.toLowerCase());
              return (
                <tr
                  key={item.id}
                  className={`bom-row ${isSelected ? 'bom-row-active' : ''}`}
                  onClick={() => {
                    sound.playClick();
                    if (onSelectPart) onSelectPart(item);
                  }}
                  onMouseEnter={() => {
                    sound.playHover();
                    if (onSelectPart) onSelectPart(item);
                  }}
                >
                  <td className="bom-item-num">{item.itemNo}</td>
                  <td className="bom-comp-cell">
                    <span className="comp-name">{item.name}</span>
                    <span className="comp-note">{item.functionNote}</span>
                  </td>
                  <td>
                    <span className="alloy-pill">{item.material}</span>
                  </td>
                  <td className="mono-val">{item.hardness}</td>
                  <td>
                    <span className="fos-tag">{item.fos}</span>
                  </td>
                  <td>
                    <button className="bom-inspect-btn" title="Inspect 3D Geometry">
                      Inspect <ChevronRight size={12} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Selected Component Engineering Telemetry Card */}
      {activePart && (
        <div className="bom-detail-card">
          <div className="bom-detail-header">
            <Cpu size={14} className="detail-icon" />
            <span>METALLURGICAL &amp; STRESS TELEMETRY: <strong>{activePart}</strong></span>
          </div>
          <div className="bom-detail-grid">
            {BOM_DATA.find(d => activePart.toLowerCase().includes(d.symbolKey.toLowerCase()))?.specs.map((s, idx) => (
              <div key={idx} className="spec-item">
                <span className="spec-lbl">{s.label}:</span>
                <span className="spec-val">{s.val}</span>
              </div>
            )) || (
              <div className="spec-item">
                <span className="spec-lbl">Status:</span>
                <span className="spec-val">Active CAD Element Inspected</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
