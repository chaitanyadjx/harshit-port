export const DATA = {
  personal: {
    name: "Harshit Kumar Mishra",
    tagline: "Mechanical Engineer & UAS Specialist",
    bio: "Mechanical Engineering student at **IIITDM Kurnool** with a minor in **Unmanned Aerial Systems**. Chairperson & Powertrain Lead of **BAJA SAE (Team Monarch)**, specializing in **multiphysics FEA/CFD**, **drivetrain engineering**, and **Industry 4.0 IoT**.",
    email: "mishraharshit664@gmail.com",
    phone: "9919363713",
    linkedin: "linkedin.com/in/harshit-mishra-35a8b7176/",
    linkedinUrl: "https://www.linkedin.com/in/harshit-kumar-mishra-35a8b7176",
    portfolioDriveUrl: "https://drive.google.com/drive/folders/1CAD-FEA-Portfolio"
  },
  skills: {
    "CAD & Product Design": "SolidWorks (3D Modeling, Assemblies, MBD, VBA Macros), Autodesk Fusion 360, Siemens NX, CATIA, STEP/IGES Multi-Body Assemblies",
    "CAE, FEA & CFD Simulation": "ANSYS Workbench, ANSYS Fluent (Conjugate Heat Transfer, Realizable k-epsilon CFD), ANSYS Mechanical & APDL Batch Scripting, COMSOL Multiphysics (ALE Moving Mesh, Transient Thermal), Modal/NVH Frequency Analysis, Mesh Convergence Validation",
    "Core Mechanical & Manufacturing": "Powertrain & Gearbox Design, Drivetrain Kinematics, ASME Y14.5-2018 GD&T (RFS/ISO Fits), Engineering Drawing, DFMA, FMEA (Risk Priority Number Mitigation), Brake Thermal & Hydraulic Sizing",
    "IoT, Robotics & Programming": "Python, MATLAB, C/C++ (Arduino Embedded), MQTT, InfluxDB, Grafana, Ultrasonic/Moisture/IR Sensor Integration, UAV Flight Controller & Propulsion Integration"
  },
  education: [
    {
      id: "edu1",
      institution: "Indian Institute of Information Technology Design and Manufacturing (IIITDM)",
      location: "Kurnool, AP",
      degree: "B.Tech – M.Tech (Dual Degree), Mechanical Engineering",
      date: "Aug 2023 – May 2028",
      description: [
        "Key Coursework: Heat Transfer, Design of Machine Elements, Dynamics of Machines, Kinematics of Machines, Mechanics of Materials, Fluid Mechanics & Hydraulic Machinery, Basic Concepts in Manufacturing Processes, Electrical Drives, Sensors & Microprocessors, Machine Drawing & Manufacturability Analysis."
      ]
    },
    {
      id: "edu2",
      institution: "Indian Institute of Information Technology Design and Manufacturing (IIITDM)",
      location: "Kurnool, AP",
      degree: "Minor in Unmanned Aerial Systems (UAS)",
      date: "Aug 2024 – May 2027",
      description: [
        "Specialized in UAV aerostructure engineering, autonomous avionics integration, flight mechanics, and propulsion dynamics."
      ]
    }
  ],
  experience: [
    {
      id: "exp1",
      role: "IoT Project Intern",
      company: "Cedtro Technologies",
      date: "Jun 2025 – Jul 2025",
      description: [
        "Designed and deployed interactive Grafana dashboards for real-time monitoring of industrial energy consumption and connected device health, improving operational visibility by 45%.",
        "Engineered low-latency MQTT and InfluxDB time-series data pipelines for scalable multi-sensor telemetry ingestion and automated anomaly alerting."
      ],
      tags: ["Grafana", "MQTT", "InfluxDB", "IoT Telemetry"],
      certificateUrl: "#"
    },
    {
      id: "exp2",
      role: "IoT Trainee",
      company: "Samsung Innovation Campus, Samsung",
      date: "Dec 2024 – Mar 2025",
      description: [
        "Developed a real-time smart parking system integrating ultrasonic/IR occupancy sensors and IoT communication protocols to continuously monitor and report vehicle bay status.",
        "Engineered an automated edge-triggered billing mechanism that detects physical vehicle presence and calculates parking duration for seamless fee computation."
      ],
      tags: ["IoT", "Edge Computing", "Ultrasonic Sensors", "Automation"],
      certificateUrl: "#"
    },
    {
      id: "exp3",
      role: "Undergraduate Research Assistant",
      company: "Indian Institute of Technology (BHU)",
      location: "Varanasi, UP",
      date: "May 2024 – Jul 2024",
      description: [
        "Investigated Bullwhip Effect mitigation in pharmaceutical supply chains through a systematic synthesis of 50+ academic and industrial case studies.",
        "Applied DEMATEL and Multi-Criteria Decision-Making (MCDM) frameworks in Python/MATLAB to quantify and prioritize critical supply chain risk factors.",
        "Identified technical barriers to Industry 4.0 adoption (IoT, AI, Blockchain, Cloud) and formulated phased digital-integration roadmaps."
      ],
      tags: ["MCDM", "DEMATEL", "Industry 4.0", "Python/MATLAB"],
      certificateUrl: "#"
    }
  ],
  projects: [
    {
      id: "proj1",
      title: "BAJA SAE 4WD Powertrain Design, Modal Analysis & System FMEA",
      category: "Automotive & Powertrain",
      date: "Nov 2025 – Present",
      description: [
        "Engineered a 4WD off-road drivetrain pairing a 12.87 HP (9.6 kW) Briggs & Stratton engine, CVT (0.5–3.9 ratio), and custom 10:1 / 9:1 two-stage reduction gearbox (70.76% net driveline efficiency) to deliver 764 Nm peak wheel torque at 6.7 km/h, 42° gradeability, and ~72.8–75 km/h top speed.",
        "Modeled AISI 4130/300M alloy steel drivetrain shafts (40 mm propeller shaft, 30 mm rear and 24 mm front half-shafts with CV tripod and universal joints), achieving a 10% subsystem weight reduction while maintaining a minimum safety factor of 1.8.",
        "Conducted a 6-mode natural frequency vibration study on the gearbox (82.3 Hz to 396.6 Hz) and designed a slotted elastomer-isolated engine mount to prevent resonance across the 2500–3600 RPM operating band.",
        "Led system-level DFMA and FMEA across chassis, drivetrain, and suspension subsystems, reducing roll-cage weld Risk Priority Numbers (RPN) from 336 to 84 via dye-penetrant inspection protocols."
      ],
      tags: ["Automotive", "Powertrain", "Mechanical Design", "NVH / Modal FEA", "DFMA / FMEA"],
      sourceFiles: [
        "Technical Capability Dossier",
        "FMEA Sheet",
        "Cost & BoM Sheet",
        "GEAR_BOX.step",
        "9:1 Integrated Diff Gearbox Folder"
      ],
      images: [
        "https://images.unsplash.com/photo-1594953934509-c124ceece58d?q=80&w=800",
        "https://images.unsplash.com/photo-1510425463958-dcced28ad4d1?q=80&w=800"
      ]
    },
    {
      id: "proj2",
      title: "Two-Stage Reduction Gearbox CFD Lubrication & Conjugate Heat Transfer Analysis",
      category: "CAE & Simulation",
      date: "Oct 2026",
      description: [
        "Executed a steady-state CFD conjugate heat transfer and oil-churning simulation in ANSYS Fluent on a custom two-stage AISI 8620 spur reduction gearbox (Stage 1: module 2.5 mm, 20/60 teeth; Stage 2: module 3.5 mm, 18/60 teeth; 10:1 total ratio).",
        "Generated a conformal tetrahedral mesh with 4 inflation layers (1.0 mm tooth sizing, 0.81 average orthogonal quality) using the Realizable k-epsilon turbulence model with Enhanced Wall Functions at 3600 RPM (376.99 rad/s) in EP-90 (API-GL4) gear oil.",
        "Evaluated 480 W continuous mechanical frictional heat dissipation (2800 W/m² tooth surface flux), validating a peak hydrodynamic churning pressure of 9.83 × 10⁵ Pa (9.83 bar) and steady-state maximum tooth surface temperature of 91.7°C—well below the 160°C lubricant oxidation threshold for the 4-hour endurance race."
      ],
      tags: ["CFD", "Thermal Simulation", "ANSYS Fluent", "Powertrain CAE"],
      sourceFiles: [
        "Baja SAE - Gearbox CFD Analysis Report (Dynamic Pressure & Thermal)",
        "Baja SAE - Gearbox CFD Analysis Report.docx"
      ],
      images: [
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800",
        "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800"
      ]
    },
    {
      id: "proj3",
      title: "Multi-Track Laser Cladding & Directed Energy Deposition (DED) Multiphysics Simulation",
      category: "CAE & Simulation",
      date: "Apr 2026 – Jul 2026",
      description: [
        "Modeled a transient 2D/3D Directed Energy Deposition (DED) laser cladding process in COMSOL Multiphysics and ANSYS Workbench (DED.wbpz) for Stellite 6 hardfacing powder deposited onto AISI 4140 and AISI 420 steel substrates across 4 sequential tracks over 50 seconds.",
        "Parameterized a 900 W laser source (3 mm beam diameter, 10 mm/s scan speed, 0.1585 g/s powder feed rate, 69% catchment efficiency) with extrapolated temperature-dependent thermophysical property curves (density, specific heat, thermal conductivity from 300 K to 2000 K) and latent heat of fusion.",
        "Implemented an Arbitrary Lagrangian-Eulerian (ALE) moving mesh with hyperelastic smoothing, automated remeshing, and implicit BDF time-stepping, predicting peak melt-pool temperatures (~2100 K) within 5% of empirical benchmarks and a consistent 0.6 mm penetration depth."
      ],
      tags: ["COMSOL Multiphysics", "ANSYS Workbench", "Additive Manufacturing", "Transient Thermal FEA"],
      sourceFiles: [
        "Laser Cladding Interactive Parameter Guide",
        "Thermophysical_Properties_Extrapolated",
        "Combined Specific Heat & Density Tables",
        "DED.wbpz"
      ],
      images: [
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800",
        "https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=800"
      ]
    },
    {
      id: "proj4",
      title: "Stepped Brake Pedal FEA Stress-Concentration & APDL Batch Convergence Study",
      category: "CAE & Simulation",
      date: "Apr 2026",
      description: [
        "Conducted a linear-elastic static stress concentration verification in ANSYS Mechanical on a 230 mm S-curve AISI 4340 annealed steel (E = 210 GPa) stepped brake pedal under a 500 N distributed foot-pad load and cylindrical pivot constraint.",
        "Executed a 3-tier mesh refinement study (Coarse: 8 mm global / 6 mm fillet; Medium: 4 mm / 3 mm; Fine: 1 mm / 0.5 mm) across the 3 mm concave shoulder fillet using SOLID186 quadratic elements, achieving <3.5% Von Mises stress convergence at 403 MPa (13.43 mm tip deflection).",
        "Exported and validated a headless ANSYS APDL batch script (ansys_apdl.mac) to automate reproducible solver execution without GUI intervention."
      ],
      tags: ["ANSYS Mechanical", "APDL Scripting", "Structural FEA", "Mesh Convergence"],
      sourceFiles: [
        "FEA_Assignment",
        "problem_statement.json",
        "mesh_convergence.json",
        "ansys_apdl.mac.dat",
        "break_padel.STEP",
        "ansys_workbench.wbpj"
      ],
      images: [
        "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800",
        "https://images.unsplash.com/photo-1581092162384-8987c1d64718?q=80&w=800"
      ]
    },
    {
      id: "proj5",
      title: "Dual-Hydraulic X-Diagonal Braking System & Rotor Thermal Dissipation FEA",
      category: "Automotive & Powertrain",
      date: "Jan 2026 – Aug 2026",
      description: [
        "Designed a fail-safe X-diagonal dual-hydraulic braking circuit driven by dual Bosch master cylinders and a mechanical bias bar calibrated to a 78:22 (Front:Rear) braking distribution for 0.8g–1.0g deceleration at 175 N driver pedal effort (6:1 pedal ratio).",
        "Performed transient thermal FEA on custom SS 410 stainless-steel brake rotors, resolving a 727 K radial thermal gradient between the friction track peak (1045.3 K / 772°C) and the hub mount (318.67 K / 45.5°C) to size rotor thickness against repeated off-road braking fade."
      ],
      tags: ["Automotive Braking", "Thermal FEA", "Hydraulic Circuit Design"],
      sourceFiles: [
        "Technical Capability Dossier (Section 5)",
        "Brakes Expense & Component Sheet"
      ],
      images: [
        "https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=800",
        "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800"
      ]
    },
    {
      id: "proj6",
      title: "Fixed-Wing UAV Airframe & Custom 12-Inch Propeller Design",
      category: "Aerospace & UAV",
      date: "Dec 2025 – Apr 2026",
      description: [
        "Designed and fabricated a lightweight fixed-wing UAV aerostructure (UAV.f3d) and custom 12-inch aerodynamic propeller blade (12inch propeller.f3d) in Autodesk Fusion 360 to maximize lift-to-drag efficiency and structural rigidity during flight maneuvers.",
        "Integrated and calibrated the onboard flight controller, brushless propulsion system, ESCs, and multi-channel radio telemetry receiver for stable attitude control across manual and stabilized flight modes."
      ],
      tags: ["UAV / Drone", "Aerospace", "Fusion 360", "Avionics Integration"],
      sourceFiles: [
        "UAV.f3d",
        "12inch propeller.f3d",
        "Aeromodelling Event Schedule"
      ],
      images: [
        "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=800",
        "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=800"
      ]
    },
    {
      id: "proj7",
      title: "High-Performance Go-Kart Chassis Design & Fabrication",
      category: "Automotive & Powertrain",
      date: "Aug 2025 – Mar 2026",
      description: [
        "Led end-to-end 3D CAD modeling (GO Cart Chassis.step) and shop-floor fabrication of a tubular high-performance go-kart chassis with a 5–7 member student motorsport team.",
        "Optimized tube cross-sections and material selection to balance torsional stiffness, weight, and manufacturability, reducing overall build cost by 10%."
      ],
      tags: ["Motorsport", "Chassis CAD", "Fabrication & Cost Optimization"],
      sourceFiles: [
        "GO Cart Chassis.step",
        "Uploaded Resume"
      ],
      images: [
        "https://images.unsplash.com/photo-1582239634282-eeb66bde2a22?q=80&w=800",
        "https://images.unsplash.com/photo-1590333746438-283fd2295628?q=80&w=800"
      ]
    },
    {
      id: "proj8",
      title: "3-DOF Parallel Continuum Robot, Rover & Kitchen Robot CAD Assemblies",
      category: "Robotics & Mechatronics",
      date: "Aug 2024 – Apr 2026",
      description: [
        "Modeled and analyzed the workspace kinematics and dynamics of a 3-DOF parallel continuum robot with a large orientation workspace (ME256 Dynamics of Machines Practice).",
        "Created full 3D multi-component CAD assemblies for an automated kitchen robot (kitchen Robot assembly.step) and an all-terrain planetary rover (rover.step), performing structural load simulations that improved rover frame durability estimates by 20%."
      ],
      tags: ["Robotics", "Kinematics & Dynamics", "Multi-Body CAD", "Structural FEA"],
      sourceFiles: [
        "ME256 Dynamics of Machines Project Sheet (Group 10)",
        "kitchen Robot assembly.step",
        "rover.step",
        "Assem1.STEP",
        "coupler.zip"
      ],
      images: [
        "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=800",
        "https://images.unsplash.com/photo-1628126235206-5260b9ea6441?q=80&w=800"
      ]
    },
    {
      id: "proj9",
      title: "Ambient Node (Kinetic LED Lamp) & Automated Ultrasonic Waste Segregator",
      category: "Robotics & Mechatronics",
      date: "Jan 2025 – Present",
      description: [
        "Ambient Node (Kinetic LED Lamp): Designed and fabricated a modular mechanical architecture for a kinetic LED lamp featuring rapid-assembly enclosures and integrated mounts for sensors, servo actuators, and power electronics.",
        "Automated Wet/Dry Waste Segregator: Programmed an Arduino C++ embedded control loop (Dry_wet Code.txt) fusing HC-SR04 ultrasonic proximity sensing (15 cm threshold) and multi-sample analog moisture filtering to actuate a servo sorting gate (10° dry / 170° wet)."
      ],
      tags: ["Mechatronics", "Product Design", "Embedded C++ / Arduino", "Sensors & Actuators"],
      sourceFiles: [
        "ALL_RESUME.pdf",
        "Dry_wet Code.txt"
      ],
      images: [
        "https://images.unsplash.com/photo-1516087593924-4ba14868de9a?q=80&w=800",
        "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800"
      ]
    }
  ],
  leadership: [
    {
      id: "lead1",
      role: "Chairperson & Powertrain Lead – BAJA SAE (Team Monarch)",
      organization: "SAEINDIA Collegiate Club | IIITDM Kurnool",
      date: "Dec 2025 – Present",
      description: [
        "Leading a 30-member collegiate motorsport team managing a ₹9 Lakh vehicle fabrication budget and planning ₹1.74 Lakh in institute-wide SAE technical events and design challenges."
      ]
    },
    {
      id: "lead2",
      role: "Core Team Member",
      organization: "Mechanical Engineering Association | IIITDM Kurnool",
      date: "Aug 2025 – Present",
      description: [
        "Departmental Student Body, organizing technical symposiums, hands-on mechanical workshops, and design hackathons."
      ]
    }
  ],
  certifications: [
    { id: "cert1", title: "Samsung Innovation Campus: Internet of Things" },
    { id: "cert2", title: "Cornell University: Hands-on Introduction to Engineering Simulation" },
    { id: "cert3", title: "Coursera: Python for Data Science, AI and Development" },
    { id: "cert4", title: "Drone and Related Technology" }
  ]
};
