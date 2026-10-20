# Required Files & Images Checklist for Portfolio

This checklist contains all the **source files**, **reports**, **CAD/CAE models**, and **visual renders/screenshots** referenced in your Master Resume PDF. 

Replacing the current placeholder Unsplash links with your actual CAD screenshots and FEA/CFD contour plots will elevate your portfolio from a generic template to an industry-grade engineering showcase.

---

## 1. General Profile & Credential Files

| Item | Current Status | Description / Suggested Path |
| :--- | :--- | :--- |
| **Master Resume PDF** | Google Drive link | Update `action-btns` in `src/App.jsx` with your latest uploaded PDF link or place in `public/resume.pdf` |
| **CAD & FEA Drive Portfolio** | Placeholder link | Page 1 lists *"Drive CAD & FEA Portfolio Folder"*. Provide your public Google Drive folder link in `DATA.personal.portfolioDriveUrl` |
| **Samsung IoT Certificate** | `#` link | Scan or PDF of Samsung Innovation Campus IoT credential |
| **Cedtro Internship Letter** | `#` link | Internship completion letter / certificate from Cedtro Technologies |
| **IIT BHU RA Verification** | `#` link | Letter of recommendation or certificate for the supply chain research |
| **Coursera & Drone Certs** | Unlinked list | Coursera Python certificate & Drone Technology credential PDFs |

---

## 2. Project-by-Project Files & Visual Assets

### Project 1: BAJA SAE 4WD Powertrain Design, Modal Analysis & System FMEA
- **Exact CAD / CAE / Doc Files Cited in Resume**:
  - [ ] `GEAR_BOX.step` (3D STEP model of the custom 10:1 / 9:1 two-stage reduction gearbox)
  - [ ] `9:1 Integrated Diff Gearbox Folder` (Complete CAD assembly & drawings)
  - [ ] `Technical Capability Dossier` (Detailed powertrain engineering report)
  - [ ] `FMEA Sheet` (Failure Modes and Effects Analysis matrix with RPN values)
  - [ ] `Cost & BoM Sheet` (Bill of Materials & manufacturing cost breakdown)
  - [ ] `Technical Advisory Notes` & `SAE Budget Proposal` (Leadership financial planning docs)
- **Recommended Images to Capture & Add**:
  - [ ] **CAD Render**: Isometric exploded view of the two-stage gearbox and differential assembly
  - [ ] **FEA Modal Analysis Plot**: 6-mode natural frequency vibration displacement contour (82.3 Hz – 396.6 Hz)
  - [ ] **Chassis / Mount FEA**: Slotted elastomer-isolated engine mount stress plot under 2500–3600 RPM
  - [ ] **Vehicle / Workshop Photo**: BAJA SAE off-road buggy chassis or powertrain mounting on the physical test rig

---

### Project 2: Two-Stage Reduction Gearbox CFD Lubrication & Conjugate Heat Transfer
- **Exact CAD / CAE / Doc Files Cited in Resume**:
  - [ ] `Baja SAE - Gearbox CFD Analysis Report (Dynamic Pressure & Thermal).pdf`
  - [ ] `Baja SAE - Gearbox CFD Analysis Report.docx`
- **Recommended Images to Capture & Add**:
  - [ ] **CFD Oil-Churning Contour**: Dynamic hydrodynamic pressure distribution contour showing peak 9.83 bar churning zone
  - [ ] **Conjugate Heat Transfer Plot**: Steady-state temperature gradient across gear teeth (showing maximum 91.7°C)
  - [ ] **Mesh Quality Plot**: Conformal tetrahedral mesh with 4 inflation layers (1.0 mm tooth sizing, 0.81 orthogonal quality)

---

### Project 3: Multi-Track Laser Cladding & Directed Energy Deposition (DED) Multiphysics Simulation
- **Exact CAD / CAE / Doc Files Cited in Resume**:
  - [ ] `DED.wbpz` (ANSYS Workbench archive file)
  - [ ] `Laser Cladding Interactive Parameter Guide`
  - [ ] `Thermophysical_Properties_Extrapolated` (Data curves for Stellite 6, AISI 4140, AISI 420)
  - [ ] `Combined Specific Heat & Density Tables`
- **Recommended Images to Capture & Add**:
  - [ ] **Melt-Pool Thermal Contour**: COMSOL / ANSYS 2D/3D transient temperature field (~2100 K peak isotherm)
  - [ ] **ALE Moving Mesh Visualization**: Hyperelastic remeshing visualization showing the 4 sequential deposition tracks and 0.6 mm penetration depth
  - [ ] **Property Graphs**: Temperature-dependent thermal conductivity, specific heat, and latent heat curves (300 K to 2000 K)

---

### Project 4: Stepped Brake Pedal FEA Stress-Concentration & APDL Batch Convergence Study
- **Exact CAD / CAE / Doc Files Cited in Resume**:
  - [ ] `break_padel.STEP` (3D model of the 230 mm S-curve brake pedal)
  - [ ] `ansys_apdl.mac` / `ansys_apdl.mac.dat` (Headless APDL macro batch script)
  - [ ] `ansys_workbench.wbpj` (ANSYS Mechanical project file)
  - [ ] `mesh_convergence.json` (Stress vs. element size data points)
  - [ ] `problem_statement.json` & `FEA_Assignment` doc
- **Recommended Images to Capture & Add**:
  - [ ] **Von Mises Stress Contour**: Stress concentration plot at the 3 mm concave fillet (peak 403 MPa under 500 N load)
  - [ ] **Total Deformation Plot**: Deflection contour plot showing 13.43 mm tip displacement
  - [ ] **Mesh Convergence Graph**: 3-tier refinement plot (Coarse 8 mm -> Medium 4 mm -> Fine 1 mm SOLID186 elements) demonstrating <3.5% convergence

---

### Project 5: Dual-Hydraulic X-Diagonal Braking System & Rotor Thermal Dissipation FEA
- **Exact CAD / CAE / Doc Files Cited in Resume**:
  - [ ] `Technical Capability Dossier (Section 5)`
  - [ ] `Brakes Expense & Component Sheet`
- **Recommended Images to Capture & Add**:
  - [ ] **Brake Hydraulic Schematic**: Dual-circuit X-diagonal piping diagram with dual Bosch master cylinders and bias bar (78:22 ratio)
  - [ ] **Brake Rotor Transient Thermal FEA**: Radial temperature gradient contour on SS 410 rotor showing 1045.3 K (772°C) friction track vs. 318.67 K (45.5°C) hub
  - [ ] **CAD Assembly / Hardware Photo**: Floating caliper and drilled rotor assembly render or physical prototype

---

### Project 6: Fixed-Wing UAV Airframe & Custom 12-Inch Propeller Design
- **Exact CAD / CAE / Doc Files Cited in Resume**:
  - [ ] `UAV.f3d` (Autodesk Fusion 360 fixed-wing aerostructure assembly)
  - [ ] `12inch propeller.f3d` (Fusion 360 parametric aerodynamic blade model)
  - [ ] `Aeromodelling Event Schedule`
- **Recommended Images to Capture & Add**:
  - [ ] **Fusion 360 CAD Model**: Complete UAV airframe with wings, fuselage, control surfaces, and motor mount
  - [ ] **Propeller CAD / Flow**: 12-inch twisted airfoil profile view and surface lofting in Fusion 360
  - [ ] **Avionics & Electronics Wiring**: Flight controller, ESCs, brushless motor, and receiver layout inside fuselage
  - [ ] **Field Flight / Prototype Photo**: Physical UAV during fabrication, ground check, or flight test

---

### Project 7: High-Performance Go-Kart Chassis Design & Fabrication
- **Exact CAD / CAE / Doc Files Cited in Resume**:
  - [ ] `GO Cart Chassis.step` (Full 3D tubular spaceframe chassis CAD file)
  - [ ] `Uploaded Resume`
- **Recommended Images to Capture & Add**:
  - [ ] **Tubular Frame CAD**: Wireframe and shaded render of the welded tubular chassis
  - [ ] **Torsional Stiffness Simulation**: FEA deflection / stress plot under cornering and front-impact conditions
  - [ ] **Fabrication / Workshop Photo**: Shop-floor welding, tube notching, or assembled chassis with wheels/steering

---

### Project 8: 3-DOF Parallel Continuum Robot, Rover & Kitchen Robot CAD Assemblies
- **Exact CAD / CAE / Doc Files Cited in Resume**:
  - [ ] `ME256 Dynamics of Machines Project Sheet (Group 10)`
  - [ ] `kitchen Robot assembly.step`
  - [ ] `rover.step`
  - [ ] `Assem1.STEP`
  - [ ] `coupler.zip`
- **Recommended Images to Capture & Add**:
  - [ ] **3-DOF Continuum Robot Workspace**: Kinematic orientation workspace diagrams and CAD mechanism
  - [ ] **Planetary Rover CAD Render**: All-terrain rocker-bogie or suspension chassis assembly (`rover.step`)
  - [ ] **Automated Kitchen Robot CAD**: Multi-body assembly render of the kitchen automated dispensing mechanism
  - [ ] **FEA Structural Durability Plot**: Rover frame stress simulation showing the 20% durability improvement

---

### Project 9: Ambient Node (Kinetic LED Lamp) & Automated Ultrasonic Waste Segregator
- **Exact CAD / CAE / Doc Files Cited in Resume**:
  - [ ] `Dry_wet Code.txt` (Arduino C++ embedded control loop)
  - [ ] `ALL_RESUME.pdf`
- **Recommended Images to Capture & Add**:
  - [ ] **Kinetic Lamp Enclosure CAD / Photo**: Rapid-assembly modular enclosure showing servo and LED mounts
  - [ ] **Waste Segregator Mechanism**: 3D model or photo of the dual-bin sorting flap with 10° dry / 170° wet servo positions
  - [ ] **Circuit Diagram & Sensor Setup**: HC-SR04 ultrasonic sensor, analog moisture probe, and Arduino microcontroller wiring schematic

---

## 3. How to Add These Files to Your Portfolio

### For Images (CAD renders, FEA plots, prototype photos):
1. Save your image files in `public/projects/<proj_id>/` (e.g., `public/projects/proj1/gearbox_render.png`).
2. Update the `images` array in `src/data.js` to point to `/projects/proj1/gearbox_render.png`.

### For Downloadable CAD & Report Files:
You can either:
1. **Google Drive (Recommended)**: Upload them to your *"Drive CAD & FEA Portfolio Folder"* and link individual files or folders in `src/data.js`.
2. **Local Repository**: Place public-facing files (e.g. `.pdf`, `.step`) in `public/docs/` and add download links directly to the cards or modals.
