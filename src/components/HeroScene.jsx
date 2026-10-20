import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { sound } from '../utils/audio';

// Helper to generate realistic 3D gear geometry with teeth
function createGearGeometry(teeth = 16, outerRadius = 1.6, innerRadius = 1.3, toothDepth = 0.28, thickness = 0.3) {
  const shape = new THREE.Shape();
  const step = (Math.PI * 2) / teeth;

  for (let i = 0; i < teeth; i++) {
    const a0 = i * step;
    const a1 = a0 + step * 0.25;
    const a2 = a0 + step * 0.5;
    const a3 = a0 + step * 0.75;
    const a4 = (i + 1) * step;

    const rBase = innerRadius;
    const rTip = outerRadius + toothDepth;

    if (i === 0) shape.moveTo(Math.cos(a0) * rBase, Math.sin(a0) * rBase);
    shape.lineTo(Math.cos(a1) * rTip, Math.sin(a1) * rTip);
    shape.lineTo(Math.cos(a2) * rTip, Math.sin(a2) * rTip);
    shape.lineTo(Math.cos(a3) * rBase, Math.sin(a3) * rBase);
    shape.lineTo(Math.cos(a4) * rBase, Math.sin(a4) * rBase);
  }

  // Central axle hole
  const holePath = new THREE.Path();
  holePath.absarc(0, 0, innerRadius * 0.35, 0, Math.PI * 2, true);
  shape.holes.push(holePath);

  return new THREE.ExtrudeGeometry(shape, { depth: thickness, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.03, bevelSegments: 2 });
}

// 3D Floating Project Waypoint Beacon (Bruno Simon feature)
function ProjectBeacon({ position, label, projectId, onSelect, setActivePart }) {
  const beaconRef = useRef();
  const ringRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (beaconRef.current) {
      const t = state.clock.getElapsedTime();
      beaconRef.current.position.y = position[1] + Math.sin(t * 2.2 + position[0]) * 0.08;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.035;
    }
  });

  return (
    <group
      ref={beaconRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        sound.playClick();
        if (onSelect) onSelect(projectId);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        setActivePart(`CAD Dossier: ${label} (Click to inspect)`);
        sound.playHover();
      }}
      onPointerOut={() => {
        setHovered(false);
        setActivePart(null);
      }}
    >
      {/* Center glowing core diamond */}
      <mesh>
        <octahedronGeometry args={[hovered ? 0.24 : 0.17, 0]} />
        <meshStandardMaterial
          color={hovered ? '#fbbf24' : '#38bdf8'}
          emissive={hovered ? '#f59e0b' : '#0284c7'}
          emissiveIntensity={hovered ? 1.4 : 0.9}
        />
      </mesh>
      {/* Outer rotating pulse ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
        <ringGeometry args={[0.25, 0.3, 16]} />
        <meshBasicMaterial
          color={hovered ? '#fbbf24' : '#38bdf8'}
          side={THREE.DoubleSide}
          transparent
          opacity={hovered ? 0.95 : 0.65}
        />
      </mesh>
      {/* Vertical light stem */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.45, 8]} />
        <meshBasicMaterial color={hovered ? '#fbbf24' : '#38bdf8'} transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

// Interactive Mechanical Gearbox + Drone Propulsion Assembly
function MechanicalAssembly({ exploded, turbo, rpmMult, isDragging, rotation, activePart, setActivePart, onSelectProject, shaderMode = 'alloy' }) {
  const assemblyRef = useRef();
  const sunGearRef = useRef();
  const ringGearRef = useRef();
  const planetRefs = useRef([]);
  const rotorRefs = useRef([]);
  const particlesRef = useRef();

  // Geometries
  const sunGeometry = useMemo(() => createGearGeometry(14, 0.9, 0.7, 0.2, 0.25), []);
  const planetGeometry = useMemo(() => createGearGeometry(10, 0.65, 0.5, 0.16, 0.22), []);
  const ringGeometry = useMemo(() => createGearGeometry(28, 2.2, 1.9, 0.24, 0.28), []);

  // Drone rotor blade geometry
  const bladeGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.06, 0);
    shape.quadraticCurveTo(-0.15, 0.7, -0.04, 1.3);
    shape.quadraticCurveTo(0, 1.35, 0.04, 1.3);
    shape.quadraticCurveTo(0.15, 0.7, 0.06, 0);
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, { depth: 0.02, bevelEnabled: false });
  }, []);

  // Spark / Energy particles for turbo mode
  const particleCount = 70;
  const particlePositions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 1.2 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      arr[i * 3] = Math.cos(theta) * radius;
      arr[i * 3 + 1] = Math.sin(theta) * radius;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    return arr;
  }, []);

  // Smooth delta-accumulated physics state
  const currentMult = useRef(1.0);
  const autoRotationY = useRef(0);
  const orbitAngle = useRef(0);

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.08);

    // Smoothly accelerate and decelerate engine RPM multiplier
    const targetMult = rpmMult || (turbo ? 3.0 : 1.0);
    currentMult.current = THREE.MathUtils.lerp(currentMult.current, targetMult, safeDelta * 5.0);
    const speedMult = currentMult.current;

    // Smoothly accumulate continuous rotational angles
    autoRotationY.current += safeDelta * 0.15 * speedMult;
    orbitAngle.current += safeDelta * 0.6 * speedMult;

    // Auto rotate assembly smoothly if not manually dragging
    if (assemblyRef.current) {
      if (!isDragging.current) {
        assemblyRef.current.rotation.y = THREE.MathUtils.lerp(
          assemblyRef.current.rotation.y,
          rotation.current.y + autoRotationY.current,
          0.06
        );
        assemblyRef.current.rotation.x = THREE.MathUtils.lerp(
          assemblyRef.current.rotation.x,
          rotation.current.x,
          0.06
        );
      } else {
        assemblyRef.current.rotation.y = THREE.MathUtils.lerp(assemblyRef.current.rotation.y, rotation.current.y, 0.15);
        assemblyRef.current.rotation.x = THREE.MathUtils.lerp(assemblyRef.current.rotation.x, rotation.current.x, 0.15);
      }
    }

    // Sun Gear rotates CW
    if (sunGearRef.current) {
      sunGearRef.current.rotation.z += safeDelta * 2.2 * speedMult;
      const targetZ = exploded ? 1.4 : 0;
      sunGearRef.current.position.z = THREE.MathUtils.lerp(sunGearRef.current.position.z, targetZ, 0.08);
    }

    // Ring Gear rotates CCW
    if (ringGearRef.current) {
      ringGearRef.current.rotation.z -= safeDelta * 0.65 * speedMult;
      const targetZ = exploded ? -1.5 : 0;
      ringGearRef.current.position.z = THREE.MathUtils.lerp(ringGearRef.current.position.z, targetZ, 0.08);
    }

    // Planet Gears orbit and counter-rotate
    planetRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const baseAngle = (index / 3) * Math.PI * 2 + orbitAngle.current;
      const radius = exploded ? 2.3 : 1.4;
      ref.position.x = THREE.MathUtils.lerp(ref.position.x, Math.cos(baseAngle) * radius, 0.1);
      ref.position.y = THREE.MathUtils.lerp(ref.position.y, Math.sin(baseAngle) * radius, 0.1);
      ref.rotation.z -= safeDelta * 3.2 * speedMult;
      const targetZ = exploded ? 0.6 : 0;
      ref.position.z = THREE.MathUtils.lerp(ref.position.z, targetZ, 0.08);
    });

    // 4 Quadcopter drone rotors spin
    rotorRefs.current.forEach((rotor, idx) => {
      if (!rotor) return;
      const dir = idx % 2 === 0 ? 1 : -1;
      rotor.rotation.z += safeDelta * 24.0 * dir * speedMult;
    });

    // Animate turbo spark particles
    if (particlesRef.current && turbo) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 2] += safeDelta * (2.0 + Math.random() * 2.5);
        if (positions[i * 3 + 2] > 2.5) {
          positions[i * 3 + 2] = -2.5;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const armPositions = [
    { x: -2.2, y: 1.8, angle: Math.PI / 4 },
    { x: 2.2, y: 1.8, angle: -Math.PI / 4 },
    { x: -2.2, y: -1.8, angle: (3 * Math.PI) / 4 },
    { x: 2.2, y: -1.8, angle: -(3 * Math.PI) / 4 },
  ];

  return (
    <group ref={assemblyRef} position={[0, 0, 0]}>
      <pointLight position={[0, 0, 3]} intensity={2.2} color="#38bdf8" distance={9} />
      <pointLight position={[0, 0, -3]} intensity={1.5} color="#0284c7" distance={8} />

      {/* ── 3D Tactical Horizon Floor Grid ── */}
      <gridHelper args={[24, 24, '#00f0ff', '#1e293b']} position={[0, -2.8, -0.8]} rotation={[Math.PI / 2.3, 0, 0]} />

      {/* ── 1. Central Drivetrain Sun Gear ── */}
      <group
        ref={sunGearRef}
        onPointerOver={(e) => { e.stopPropagation(); setActivePart('Sun Gear (AISI 8620 Steel • 60 HRC • FOS 1.84)'); sound.playHover(); }}
        onPointerOut={() => setActivePart(null)}
      >
        <mesh geometry={sunGeometry}>
          <meshStandardMaterial
            color={
              shaderMode === 'cybercore' ? '#08080c' :
              shaderMode === 'fea' ? '#ef4444' :
              activePart?.includes('Sun Gear') ? '#38bdf8' : '#1e293b'
            }
            wireframe={shaderMode === 'wireframe'}
            metalness={shaderMode === 'cybercore' ? 0.95 : shaderMode === 'fea' ? 0.3 : 0.85}
            roughness={shaderMode === 'cybercore' ? 0.15 : shaderMode === 'fea' ? 0.2 : 0.2}
            emissive={
              shaderMode === 'cybercore' ? '#00ff66' :
              shaderMode === 'fea' ? '#dc2626' :
              activePart?.includes('Sun Gear') ? '#0284c7' : '#0f172a'
            }
            emissiveIntensity={shaderMode === 'cybercore' ? 0.95 : shaderMode === 'fea' ? 0.85 : 0.6}
          />
        </mesh>
        {shaderMode !== 'wireframe' && (
          <mesh geometry={sunGeometry}>
            <meshBasicMaterial
              color={shaderMode === 'cybercore' ? '#00ff66' : shaderMode === 'fea' ? '#fca5a5' : '#38bdf8'}
              wireframe
              transparent
              opacity={shaderMode === 'cybercore' ? 0.45 : 0.35}
            />
          </mesh>
        )}
        <mesh position={[0, 0, 0.35]}>
          <cylinderGeometry args={[0.22, 0.22, 1.2, 16]} />
          <meshStandardMaterial color={shaderMode === 'cybercore' ? '#00ff66' : shaderMode === 'fea' ? '#dc2626' : '#0284c7'} metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* ── 2. Three Planetary Satellite Gears ── */}
      {[0, 1, 2].map((idx) => (
        <group
          key={idx}
          ref={(el) => (planetRefs.current[idx] = el)}
          onPointerOver={(e) => { e.stopPropagation(); setActivePart(`Planetary Gear ${idx + 1} (10:1 Ratio • AGMA 2001-D04)`); sound.playHover(); }}
          onPointerOut={() => setActivePart(null)}
        >
          <mesh geometry={planetGeometry}>
            <meshStandardMaterial
              color={
                shaderMode === 'cybercore' ? '#0b0e17' :
                shaderMode === 'fea' ? '#f59e0b' :
                activePart?.includes('Planetary') ? '#38bdf8' : '#334155'
              }
              wireframe={shaderMode === 'wireframe'}
              metalness={shaderMode === 'cybercore' ? 0.92 : shaderMode === 'fea' ? 0.3 : 0.8}
              roughness={shaderMode === 'cybercore' ? 0.2 : shaderMode === 'fea' ? 0.25 : 0.25}
              emissive={shaderMode === 'cybercore' ? '#00f0ff' : shaderMode === 'fea' ? '#d97706' : '#0369a1'}
              emissiveIntensity={shaderMode === 'cybercore' ? 0.85 : shaderMode === 'fea' ? 0.75 : 0.4}
            />
          </mesh>
          {shaderMode !== 'wireframe' && (
            <mesh geometry={planetGeometry}>
              <meshBasicMaterial
                color={shaderMode === 'cybercore' ? '#00f0ff' : shaderMode === 'fea' ? '#fde68a' : '#60a5fa'}
                wireframe
                transparent
                opacity={shaderMode === 'cybercore' ? 0.4 : 0.3}
              />
            </mesh>
          )}
          <mesh position={[0, 0, 0.15]}>
            <cylinderGeometry args={[0.12, 0.12, 0.5, 12]} />
            <meshStandardMaterial color={shaderMode === 'cybercore' ? '#00f0ff' : shaderMode === 'fea' ? '#d97706' : '#38bdf8'} metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      ))}

      {/* ── 3. Outer Ring Gear / Casing ── */}
      <group
        ref={ringGearRef}
        onPointerOver={(e) => { e.stopPropagation(); setActivePart('Outer Annulus Ring Gear (Baja Spec 764 Nm Max Torque)'); sound.playHover(); }}
        onPointerOut={() => setActivePart(null)}
      >
        <mesh geometry={ringGeometry}>
          <meshStandardMaterial
            color={
              shaderMode === 'cybercore' ? '#070a12' :
              shaderMode === 'fea' ? '#0284c7' :
              activePart?.includes('Annulus') ? '#38bdf8' : '#0f172a'
            }
            wireframe={shaderMode === 'wireframe'}
            metalness={shaderMode === 'cybercore' ? 0.9 : shaderMode === 'fea' ? 0.4 : 0.9}
            roughness={shaderMode === 'cybercore' ? 0.2 : shaderMode === 'fea' ? 0.3 : 0.15}
            emissive={shaderMode === 'cybercore' ? '#fcee0a' : shaderMode === 'fea' ? '#0369a1' : '#0284c7'}
            emissiveIntensity={shaderMode === 'cybercore' ? 0.55 : shaderMode === 'fea' ? 0.45 : 0.25}
          />
        </mesh>
        {shaderMode !== 'wireframe' && (
          <mesh geometry={ringGeometry}>
            <meshBasicMaterial
              color={shaderMode === 'cybercore' ? '#fcee0a' : shaderMode === 'fea' ? '#7dd3fc' : '#38bdf8'}
              wireframe
              transparent
              opacity={shaderMode === 'cybercore' ? 0.35 : 0.25}
            />
          </mesh>
        )}
        {[...Array(8)].map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 2.35, Math.sin(a) * 2.35, 0.15]}>
              <cylinderGeometry args={[0.07, 0.07, 0.35, 8]} />
              <meshStandardMaterial color={shaderMode === 'cybercore' ? '#fcee0a' : '#94a3b8'} metalness={0.9} roughness={0.1} />
            </mesh>
          );
        })}
      </group>

      {/* ── 4. UAS Drone Quadcopter Propulsion Assembly ── */}
      <group position={[0, 0, exploded ? 0.9 : 0.15]}>
        {armPositions.map((arm, index) => {
          const spread = exploded ? 1.5 : 1.0;
          const armX = arm.x * spread;
          const armY = arm.y * spread;
          return (
            <group key={index}>
              <mesh position={[armX * 0.5, armY * 0.5, 0]} rotation={[0, 0, arm.angle]}>
                <boxGeometry args={[0.16, Math.sqrt(armX * armX + armY * armY), 0.12]} />
                <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.5} />
              </mesh>
              <group
                position={[armX, armY, 0]}
                onPointerOver={(e) => { e.stopPropagation(); setActivePart(`UAS Brushless Motor & 9" Rotor #${index + 1}`); sound.playHover(); }}
                onPointerOut={() => setActivePart(null)}
              >
                <mesh position={[0, 0, 0.15]}>
                  <cylinderGeometry args={[0.32, 0.32, 0.35, 16]} />
                  <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} emissive="#0284c7" emissiveIntensity={0.4} />
                </mesh>
                <mesh position={[0, 0, 0.02]}>
                  <ringGeometry args={[0.26, 0.36, 24]} />
                  <meshBasicMaterial color="#38bdf8" side={THREE.DoubleSide} />
                </mesh>
                <group ref={(el) => (rotorRefs.current[index] = el)} position={[0, 0, 0.38]}>
                  <mesh>
                    <cylinderGeometry args={[0.12, 0.12, 0.15, 12]} />
                    <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.1} />
                  </mesh>
                  {[0, 1, 2].map((bladeIdx) => (
                    <mesh key={bladeIdx} geometry={bladeGeometry} rotation={[0, 0, (bladeIdx * Math.PI * 2) / 3]}>
                      <meshStandardMaterial
                        color={shaderMode === 'fea' ? '#10b981' : '#38bdf8'}
                        wireframe={shaderMode === 'wireframe'}
                        metalness={0.7}
                        roughness={0.2}
                        emissive={shaderMode === 'fea' ? '#047857' : '#000000'}
                        emissiveIntensity={shaderMode === 'fea' ? 0.6 : 0}
                        transparent
                        opacity={turbo ? 0.6 : 0.85}
                      />
                    </mesh>
                  ))}
                  <mesh>
                    <ringGeometry args={[0.3, 1.35, 32]} />
                    <meshBasicMaterial color="#38bdf8" transparent opacity={turbo ? 0.25 : 0.12} side={THREE.DoubleSide} />
                  </mesh>
                </group>
              </group>
            </group>
          );
        })}
      </group>

      {/* ── 5. 3D Floating Project Waypoint Beacons (Bruno Simon Feature) ── */}
      <ProjectBeacon
        position={[-2.3, 0.6, 0.7]}
        label="Baja SAE 4WD Powertrain"
        projectId="proj1"
        onSelect={onSelectProject}
        setActivePart={setActivePart}
      />
      <ProjectBeacon
        position={[0, 2.0, 0.8]}
        label="Gearbox CFD & CHT Thermal Analysis"
        projectId="proj2"
        onSelect={onSelectProject}
        setActivePart={setActivePart}
      />
      <ProjectBeacon
        position={[2.3, 0.6, 0.7]}
        label="Fixed-Wing UAV & 12-Inch Propeller"
        projectId="proj6"
        onSelect={onSelectProject}
        setActivePart={setActivePart}
      />
      <ProjectBeacon
        position={[0, -2.0, 0.8]}
        label="Brake Pedal FEA & DED Additive Simulation"
        projectId="proj4"
        onSelect={onSelectProject}
        setActivePart={setActivePart}
      />

      {/* ── 6. Turbo Energy Sparks Particle System ── */}
      <points ref={particlesRef} visible={turbo}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#38bdf8" size={0.06} transparent opacity={0.8} sizeAttenuation />
      </points>
    </group>
  );
}

// Smooth Camera Controller for view presets
function CameraController({ viewPreset }) {
  const targetPos = useRef(new THREE.Vector3(0, 0, 5.8));
  const targetLook = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    if (viewPreset === 'gearbox') {
      targetPos.current.set(0, -0.15, 3.2);
      targetLook.current.set(0, 0, 0);
    } else if (viewPreset === 'propulsion') {
      targetPos.current.set(-1.8, 1.4, 3.0);
      targetLook.current.set(-1.8, 1.4, 0);
    } else {
      targetPos.current.set(0, 0, 5.8);
      targetLook.current.set(0, 0, 0);
    }
  }, [viewPreset]);

  useFrame((state, delta) => {
    state.camera.position.lerp(targetPos.current, Math.min(delta * 4, 0.15));
    state.camera.lookAt(targetLook.current);
  });

  return null;
}

export default function HeroScene({ onSelectProject, activePart: externalActivePart, setActivePart: externalSetActivePart }) {
  const [exploded, setExploded] = useState(false);
  const [turbo, setTurbo] = useState(false);
  const [rpmValue, setRpmValue] = useState(1800);
  const [internalActivePart, setInternalActivePart] = useState(null);
  const activePart = externalActivePart !== undefined ? externalActivePart : internalActivePart;
  const setActivePart = externalSetActivePart || setInternalActivePart;
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [shaderMode, setShaderMode] = useState('alloy'); // 'alloy' | 'fea' | 'wireframe' | 'cybercore'
  const [viewPreset, setViewPreset] = useState('overview'); // 'overview' | 'gearbox' | 'propulsion'

  const isDragging = useRef(false);
  const previousPointer = useRef({ x: 0, y: 0 });
  const rotation = useRef({ x: 0.35, y: 0.45 });

  const handlePointerDown = (e) => {
    isDragging.current = true;
    previousPointer.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - previousPointer.current.x;
    const deltaY = e.clientY - previousPointer.current.y;
    rotation.current.y += deltaX * 0.008;
    rotation.current.x += deltaY * 0.008;
    previousPointer.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const toggleExploded = () => {
    setExploded((prev) => !prev);
    sound.playThrottle();
  };

  const toggleTurbo = () => {
    const nextState = !turbo;
    setTurbo(nextState);
    setRpmValue(nextState ? 3600 : 1800);
    sound.playThrottle();
  };

  const handleRpmChange = (val) => {
    setRpmValue(val);
    setTurbo(val >= 2800);
    sound.playRpmWhine(val);
  };

  const toggleSound = () => {
    const state = sound.toggle();
    setSoundEnabled(state);
    if (state) sound.playClick();
  };

  const resetView = () => {
    rotation.current = { x: 0.35, y: 0.45 };
    setExploded(false);
    setTurbo(false);
    setRpmValue(1800);
    setViewPreset('overview');
    setShaderMode('cybercore');
    sound.playClick();
  };

  // Normalized RPM multiplier for physics
  const rpmMult = (rpmValue / 1800);

  return (
    <div
      className="hero-scene-container"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* ── 3D Interactive Mechanical Canvas ── */}
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ width: '100%', height: '100%', cursor: isDragging.current ? 'grabbing' : 'grab' }}
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[5, 8, 5]} intensity={1.4} color="#ffffff" />
        <directionalLight position={[-5, -4, -4]} intensity={0.8} color="#0284c7" />
        <CameraController viewPreset={viewPreset} />
        <MechanicalAssembly
          exploded={exploded}
          turbo={turbo}
          rpmMult={rpmMult}
          isDragging={isDragging}
          rotation={rotation}
          activePart={activePart}
          setActivePart={setActivePart}
          onSelectProject={onSelectProject}
          shaderMode={shaderMode}
        />
      </Canvas>

      {/* ── Cockpit HUD Overlay & Bruno-Simon Interactive Controls ── */}
      <div className="cockpit-hud">
        {/* Top Telemetry Bar */}
        <div className="telemetry-bar">
          <div className="telemetry-pill">
            <span className="telemetry-pulse" />
            <span className="telemetry-title">CAD TELEMETRY:</span>
            <span className="telemetry-val">BAJA 4WD &bull; UAS HYBRID</span>
          </div>
          <div className="telemetry-pill stats-pill">
            <span>RATIO: <strong>10:1</strong></span>
            <span>TORQUE: <strong>{Math.round(420 + (rpmValue / 3600) * 344)} Nm</strong></span>
            <span>RPM: <strong className={rpmValue >= 2800 ? 'rpm-turbo' : ''}>{rpmValue} {rpmValue >= 3500 ? '(MAX)' : ''}</strong></span>
          </div>

          {/* FEA Stress Contour Scale Pill when in FEA Mode */}
          {shaderMode === 'fea' && (
            <div className="telemetry-pill fea-scale-pill">
              <span className="fea-bar-preview" />
              <span>FEA: <strong>0 &rarr; 450 MPa</strong> (FOS: 1.84)</span>
            </div>
          )}

          {/* Shader Mode Switcher Pill */}
          <div className="telemetry-pill mode-switcher-pill">
            <button
              className={`mode-pill-btn ${shaderMode === 'cybercore' ? 'active-mode-cyber' : ''}`}
              onClick={() => { setShaderMode('cybercore'); sound.playClick(); }}
              title="Cybercore Mech-Tech High-Voltage Cybernetics"
            >
              ⚡ Cybercore
            </button>
            <button
              className={`mode-pill-btn ${shaderMode === 'alloy' ? 'active-mode' : ''}`}
              onClick={() => { setShaderMode('alloy'); sound.playClick(); }}
              title="Solid Alloy Steel CAD Material"
            >
              ⚙️ Alloy
            </button>
            <button
              className={`mode-pill-btn ${shaderMode === 'fea' ? 'active-mode-fea' : ''}`}
              onClick={() => { setShaderMode('fea'); sound.playClick(); }}
              title="Von Mises FEA Stress Distribution Heatmap"
            >
              🔥 FEA Stress
            </button>
            <button
              className={`mode-pill-btn ${shaderMode === 'wireframe' ? 'active-mode' : ''}`}
              onClick={() => { setShaderMode('wireframe'); sound.playClick(); }}
              title="CAD Blueprint Wireframe Mesh"
            >
              📐 Blueprint
            </button>
          </div>

          {/* Camera View Preset Switcher Pill */}
          <div className="telemetry-pill mode-switcher-pill">
            <button
              className={`mode-pill-btn ${viewPreset === 'overview' ? 'active-mode' : ''}`}
              onClick={() => { setViewPreset('overview'); sound.playClick(); }}
              title="Overview Perspective"
            >
              🌐 All
            </button>
            <button
              className={`mode-pill-btn ${viewPreset === 'gearbox' ? 'active-mode' : ''}`}
              onClick={() => { setViewPreset('gearbox'); sound.playClick(); }}
              title="Zoom to 10:1 Planetary Gearbox"
            >
              ⚙️ Gearbox
            </button>
            <button
              className={`mode-pill-btn ${viewPreset === 'propulsion' ? 'active-mode' : ''}`}
              onClick={() => { setViewPreset('propulsion'); sound.playClick(); }}
              title="Zoom to UAS Propulsor"
            >
              🛸 Propulsor
            </button>
          </div>
        </div>

        {/* Hovered Component Callout Badge */}
        {activePart && (
          <div className="active-part-callout">
            <span className="callout-icon">⚙️</span>
            <span className="callout-text">{activePart}</span>
            <span className="callout-tag">CAD INSPECTED</span>
          </div>
        )}

        {/* Interactive Action Controls */}
        <div className="cockpit-controls" onPointerDown={(e) => e.stopPropagation()}>
          <button
            className={`cockpit-btn cad-toggle-btn ${exploded ? 'active-btn' : ''}`}
            onClick={toggleExploded}
            title="Toggle Exploded CAD Disassembly View"
          >
            <span className="btn-icon">{exploded ? '🔄' : '🛠️'}</span>
            <span>{exploded ? 'Assemble CAD' : 'Explode CAD View'}</span>
          </button>

          <button
            className={`cockpit-btn turbo-toggle-btn ${turbo ? 'turbo-active' : ''}`}
            onClick={toggleTurbo}
            title="Toggle 3600 RPM Redline Throttle"
          >
            <span className="btn-icon">⚡</span>
            <span>{turbo ? 'Throttle: 3600 RPM' : 'Turbo Throttle'}</span>
          </button>

          {/* Real-time Throttle Slider Control */}
          <div className="rpm-slider-pill">
            <span className="slider-label">RPM:</span>
            <input
              type="range"
              min="800"
              max="3600"
              step="100"
              value={rpmValue}
              onChange={(e) => handleRpmChange(Number(e.target.value))}
              className="cockpit-range-slider"
              title="Drag to dynamically throttle RPM"
            />
          </div>

          <button className="cockpit-btn icon-btn" onClick={resetView} title="Reset 3D Camera Orientation">
            <span>🔄</span>
          </button>

          <button
            className={`cockpit-btn icon-btn ${soundEnabled ? 'sound-on' : 'sound-off'}`}
            onClick={toggleSound}
            title={soundEnabled ? 'Mute Mechanical Audio FX' : 'Enable Mechanical Audio FX'}
          >
            <span>{soundEnabled ? '🔊' : '🔇'}</span>
          </button>
        </div>

        {/* Drag Hint with 3D Beacon callout */}
        <div className="drag-hint">
          <span>&larr; Drag to rotate 3D assembly &bull; Click glowing diamond beacons to inspect projects &rarr;</span>
        </div>
      </div>
    </div>
  );
}
