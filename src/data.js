export const DATA = {
  personal: {
    name: "Harshit Kumar Mishra",
    tagline: "Mechanical Engineer & UAS Specialist ",
    bio: "Mechanical Engineering student at **IIITDM Kurnool** with a minor in **Unmanned Aerial Systems**. I focus on bridging structural efficiency with **Industry 4.0** digital transformation.",
    email: "mishraharshit664@gmail.com",
    phone: "9919363713",
    linkedin: "linkedin.com/in/harshit-mishra-35a8b7176/",
    linkedinUrl: "https://www.linkedin.com/in/harshit-kumar-mishra-35a8b7176",
  },
  skills: {
    "CAD/CAE": "SolidWorks, Fusion 360, Siemens NX, CATIA, ANSYS, CREO",
    "Core": "Engineering Drawing, Finite Element Analysis",
    "Programming": "C, MATLAB, Python",
    "Soft Skills": "Leadership, Project Management, Technical Communication",
  },
  education: [
    {
      id: "edu1",
      institution: "Indian Institute of Information Technology Design and Manufacturing",
      location: "Kurnool, AP",
      degree: "B.Tech– M.Tech (Dual Degree), Mechanical Engineering",
      date: "Aug 2023 – May 2028",
      description: []
    },
    {
      id: "edu2",
      institution: "Indian Institute of Information Technology Design and Manufacturing",
      location: "Kurnool, AP",
      degree: "Minor in Unmanned Aerial Systems",
      date: "Aug 2024 – May 2027",
      description: []
    }
  ],
  experience: [
    {
      id: "exp1",
      role: "IoT Project Intern",
      company: "Cedtro Technologies",
      date: "Jun 2025 – Jul 2025",
      description: [
        "Designed and deployed Grafana dashboards for real-time monitoring of energy consumption and device health, improving visibility by 45%.",
        "Implemented MQTT and InfluxDB-based data pipelines for scalable, low-latency sensor data logging."
      ],
      tags: ["Grafana", "MQTT", "InfluxDB", "IoT"]
    },
    {
      id: "exp2",
      role: "Samsung Innovation Campus",
      company: "Samsung",
      date: "Dec 2024 – Mar 2025",
      description: [
        "Developed a real-time smart parking system by integrating multiple IoT communication protocols to continuously monitor and report vehicle occupancy status.",
        "Engineered an automated billing mechanism that detects the physical presence of a parked car and instantly triggers fee calculation for seamless time-tracking."
      ],
      tags: ["IoT", "Automation", "Sensors"]
    },
    {
      id: "exp3",
      role: "Undergraduate Research Assistant",
      company: "Indian Institute of Technology (BHU)",
      location: "Varanasi, UP",
      date: "May 2024 – Jul 2024",
      description: [
        "Conducted research on Bullwhip Effect mitigation in pharmaceutical supply chains through analysis of 50+ academic and industry case studies.",
        "Applied DEMATEL and MCDM techniques to prioritize critical supply chain risk factors and decision criteria.",
        "Identified barriers to adoption of IoT, AI, Blockchain, and Cloud technologies and proposed Industry 4.0 integration strategies."
      ],
      tags: ["MCDM", "DEMATEL", "Industry 4.0", "Research"]
    }
  ],
  projects: [
    {
      id: "proj1",
      title: "BAJA SAE Powertrain Design & Validation",
      date: "Nov 2025 – Present",
      description: [
        "Engineered and integrated a comprehensive powertrain layout for an off-road racing vehicle, optimizing the power transmission between the engine, continuously variable transmission (CVT), and differential to achieve a top speed of 60 km/h and a maximum gradeability of 35 degrees.",
        "Leading the integration of the engine, transmission, and custom differential, currently coordinating manufacturing and assembly to achieve a targeted weight reduction of 10% while maintaining a minimum safety factor of 1.8.",
        "Conducted static structural and fatigue Finite Element Analysis (FEA) on powertrain mounts and the differential casing using ANSYS, validating the 1.8 safety factor.",
        "Performed fatigue and contact stress analysis on custom differential gears using ANSYS to prevent tooth bending and pitting failures under high-torque off-road conditions.",
        "Conducted torsional and bending FEA on the main powertrain shafts in ANSYS to determine critical speeds and ensure continuous power delivery from the CVT to the wheels.",
        "Executed front-impact and torsional rigidity FEA on the tubular chassis using ANSYS to ensure driver safety and dynamic stability, directly informing the material selection process."
      ],
      tags: ["Powertrain", "CVT", "Manufacturing"],
      images: [
        "https://images.unsplash.com/photo-1594953934509-c124ceece58d?q=80&w=600",
        "https://images.unsplash.com/photo-1510425463958-dcced28ad4d1?q=80&w=600"
      ]
    },
    {
      id: "proj2",
      title: "Go-Kart Design & Fabrication Project",
      date: "Aug 2025 – Present",
      description: [
        "Led end-to-end design and fabrication of a high-performance go-kart under a student motorsport initiative.",
        "Optimized material selection to balance strength, weight, and cost, reducing overall build cost by 10%.",
        "Coordinated manufacturing, assembly, and testing with a 5–7 member team."
      ],
      tags: ["Motorsport", "Fabrication", "Team Leadership"],
      images: [
        "https://images.unsplash.com/photo-1582239634282-eeb66bde2a22?q=80&w=600",
        "https://images.unsplash.com/photo-1590333746438-283fd2295628?q=80&w=600"
      ]
    },
    {
      id: "proj3",
      title: "Ambient Node",
      date: "Dec 2025 – Present",
      description: [
        "Designed and fabricated a modular mechanical architecture for a kinetic LED lamp emphasizing robustness and ease of assembly and integrated housings for sensors, actuators, and power electronics."
      ],
      tags: ["Modular Architecture", "Actuators", "Sensors"],
      images: [
        "https://images.unsplash.com/photo-1516087593924-4ba14868de9a?q=80&w=600"
      ]
    },
    {
      id: "proj4",
      title: "Fixed wing aircraft",
      date: "Dec 2025 – Jan 2026",
      description: [
        "Designed and fabricated a custom fixed-wing aerostructure, selecting lightweight materials to optimize aerodynamic efficiency and maintain structural integrity during flight.",
        "Configured and integrated the onboard flight controller, propulsion system, and radio receiver to ensure stable flight dynamics and responsive handling across different flight modes."
      ],
      tags: ["Aerostructure", "Flight Controller", "UAS"],
      images: [
        "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=600",
        "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=600"
      ]
    },
    {
      id: "proj5",
      title: "Rover CAD Modeling Project",
      date: "Aug 2024 – Sep 2024",
      description: [
        "Developed a complete 3D CAD model of a rover emphasizing lightweight structure and terrain adaptability.",
        "Performed stress and load simulations, improving durability estimates by 20%."
      ],
      tags: ["Fusion 360", "FEA", "Robotics"],
      images: [
        "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=600",
        "https://images.unsplash.com/photo-1628126235206-5260b9ea6441?q=80&w=600"
      ]
    }
  ],
  leadership: [
    {
      id: "lead1",
      role: "Chairperson – BAJA SAE",
      organization: "SAEINDIA Collegiate Club | IIITDM Kurnool",
      date: "Dec 2025 – Present",
      description: []
    },
    {
      id: "lead2",
      role: "Core Team Member",
      organization: "Mechanical Engineering Association | IIITDM Kurnool",
      date: "Aug 2025 – Present",
      description: []
    }
  ],
  certifications: [
    { id: "cert1", title: "Samsung Innovation Campus: Internet of Things" },
    { id: "cert2", title: "Coursera: Python for Data Science, AI and Development" },
    { id: "cert3", title: "Drone and Related Technology" },
    { id: "cert4", title: "Cornell University: Hands-on Introduction to Engineering Simulation" }
  ]
};
