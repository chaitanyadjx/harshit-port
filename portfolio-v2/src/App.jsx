import React, { useState, useEffect, useRef } from 'react';
import { DATA } from './data';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Linkedin, Github, Mail, X, Phone, ExternalLink, FileText, ChevronRight, Compass, Layers, Gauge, PenTool } from 'lucide-react';
import HeroScene from './components/HeroScene';
import TiltCard from './components/TiltCard';
import GlowCursor from './components/GlowCursor';
import MagneticButton from './components/MagneticButton';
import BomTable from './components/BomTable';
import DynoWorkbench from './components/DynoWorkbench';
import DigitalCaliper from './components/DigitalCaliper';
import AnimatedSection, { TextReveal, containerVariants, cardVariants, tagVariants, transitionEase } from './components/AnimatedSection';
import { sound } from './utils/audio';

/* ── Bulletproof Animation Variants (Supports both 'show' and 'visible') ── */
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.02 },
  },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.02 },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.23, 1, 0.32, 1] },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.23, 1, 0.32, 1] },
  },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1, scale: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.4, ease: transitionEase },
  },
  exit: {
    opacity: 0, scale: 0.94, y: 15, filter: 'blur(6px)',
    transition: { duration: 0.25 },
  },
};

const backdropVariants = {
  hidden: { opacity: 0, backdropFilter: 'blur(0px)' },
  visible: { opacity: 1, backdropFilter: 'blur(16px)', transition: { duration: 0.3 } },
  exit: { opacity: 0, backdropFilter: 'blur(0px)', transition: { duration: 0.25 } },
};

/* ── Read More Component ── */
function DescriptionWithReadMore({ description, maxItems = 2 }) {
  const [expanded, setExpanded] = useState(false);
  if (!description || description.length === 0) return null;
  const needsTruncation = description.length > maxItems;
  const visibleItems = expanded ? description : description.slice(0, maxItems);
  return (
    <div className="description">
      <ul>
        {visibleItems.map((desc, i) => <li key={i}>{desc}</li>)}
      </ul>
      {needsTruncation && (
        <button
          className="read-more-toggle"
          onClick={e => {
            e.stopPropagation();
            sound.playClick();
            setExpanded(!expanded);
          }}
        >
          {expanded ? 'Show less ▴' : `Read more (${description.length - maxItems} more) ▾`}
        </button>
      )}
    </div>
  );
}

/* ── Animated Counter ── */
function AnimatedCount({ value }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 600;
    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value]);
  return <>{count}</>;
}

/* ── Sliding Tab Indicator ── */
function TabBar({ tabs, activeTab, onTabChange }) {
  const tabRefs = useRef({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const el = tabRefs.current[activeTab];
    if (el) {
      const parent = el.parentElement;
      setIndicator({
        left: el.offsetLeft - parent.offsetLeft,
        width: el.offsetWidth,
      });
    }
  }, [activeTab]);

  return (
    <div className="tabs">
      <motion.div
        className="tab-indicator"
        animate={{ left: indicator.left, width: indicator.width }}
        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
      />
      {tabs.map(tab => (
        <button
          key={tab}
          ref={el => tabRefs.current[tab] = el}
          className={`${activeTab === tab ? 'active' : ''} ${tab.includes('CAD') || tab.includes('Dyno') ? 'tab-3d-highlight' : ''}`}
          onClick={() => {
            sound.playClick();
            onTabChange(tab);
          }}
        >
          {tab === 'Projects' ? (
            <>Projects (<AnimatedCount value={DATA.projects.length} />)</>
          ) : tab === 'CAD Assembly & BOM' ? (
            <span className="tab-3d-label"><Layers size={13} /> 3D CAD &amp; BOM</span>
          ) : tab === 'Dyno Simulator' ? (
            <span className="tab-3d-label" style={{ color: '#f59e0b' }}><Gauge size={13} /> Dyno Simulator</span>
          ) : tab}
        </button>
      ))}
    </div>
  );
}

/* ── Main App ── */
function App() {
  const [theme, setTheme] = useState('dark'); // 'dark' | 'blueprint' | 'light'
  const [activeTab, setActiveTab] = useState('Experience');
  const [activePart, setActivePart] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectCategory, setProjectCategory] = useState('All');
  const [caliperOpen, setCaliperOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setTheme('light');
      document.documentElement.classList.remove('dark', 'blueprint');
    } else if (savedTheme === 'blueprint') {
      setTheme('blueprint');
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('blueprint');
    } else {
      setTheme('dark');
      document.documentElement.classList.remove('blueprint');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const cycleTheme = () => {
    sound.playClick();
    let nextTheme = 'dark';
    if (theme === 'dark') nextTheme = 'blueprint';
    else if (theme === 'blueprint') nextTheme = 'light';
    else nextTheme = 'dark';

    document.documentElement.classList.remove('dark', 'blueprint');
    if (nextTheme === 'dark') document.documentElement.classList.add('dark');
    else if (nextTheme === 'blueprint') document.documentElement.classList.add('blueprint');

    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  const renderBio = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <span key={i} className="bio-highlight">{part.slice(2, -2)}</span>;
      }
      return part;
    });
  };

  const categories = ['All', 'Automotive & Powertrain', 'CAE & Simulation', 'Aerospace & UAV', 'Robotics & Mechatronics'];

  const filteredProjects = projectCategory === 'All'
    ? DATA.projects
    : DATA.projects.filter(p => p.category === projectCategory);

  const tabs = ['Experience', 'Projects', 'CAD Assembly & BOM', 'Dyno Simulator', 'Education', 'Leadership & Certs'];

  const handleSelectProjectById = (id) => {
    const p = DATA.projects.find(x => x.id === id);
    if (p) {
      sound.playClick();
      setSelectedProject(p);
    }
  };

  return (
    <>
      {/* ── Interactive UAS Drone Cursor with spinning propellers & flight telemetry ── */}
      <GlowCursor />

      <div className="portfolio-card">
        {/* ── 3D Mechanical Assembly Scene (Background / Ambient Mode) ── */}
        {activeTab !== 'CAD Assembly & BOM' && (
          <div className="ambient-3d-backdrop">
            <HeroScene onSelectProject={handleSelectProjectById} activePart={activePart} setActivePart={setActivePart} />
          </div>
        )}

        {/* ── Animated gradient border ── */}
        <div className="gradient-border-wrapper" />

        <aside>
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
          >
            {/* ── Engineering Affiliation & Role Badge ── */}
            <motion.div variants={slideUp} className="workstation-badge-bar">
              <span className="station-led" />
              <span className="station-title">BAJA SAE POWERTRAIN LEAD</span>
              <span className="station-div">&bull;</span>
              <span className="station-loc">IIITDM KURNOOL</span>
            </motion.div>

            <motion.div variants={slideUp} className="sidebar-header">
              <div>
                <h1 className="hero-name">{DATA.personal.name}</h1>
                <motion.p
                  className="tagline"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {DATA.personal.tagline}
                </motion.p>
              </div>
              <div className="header-actions">
                <MagneticButton
                  className="cockpit-quick-toggle"
                  onClick={() => {
                    sound.playClick();
                    setActiveTab(activeTab === 'CAD Assembly & BOM' ? 'Projects' : 'CAD Assembly & BOM');
                  }}
                  title="Inspect 3D CAD & BOM"
                  strength={0.25}
                >
                  <Layers size={14} />
                  <span>{activeTab === 'CAD Assembly & BOM' ? 'Projects' : 'CAD & BOM'}</span>
                </MagneticButton>
                <motion.button
                  className="theme-toggle"
                  onClick={cycleTheme}
                  aria-label="Toggle Theme & Blueprint Mode"
                  title={`Current: ${theme.toUpperCase()} (Click to toggle Workshop/Blueprint/Light)`}
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === 'blueprint' ? <PenTool size={16} color="#38bdf8" /> : theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
                </motion.button>
              </div>
            </motion.div>

            <motion.p variants={slideUp} className="intro-text">
              {renderBio(DATA.personal.bio)}
            </motion.p>

            <motion.div variants={slideUp} className="action-btns">
              <MagneticButton
                href={`mailto:${DATA.personal.email}`}
                className="btn btn-filled btn-machined-primary"
                onClick={() => sound.playClick()}
                strength={0.3}
              >
                Get in touch
              </MagneticButton>
              <MagneticButton
                href="https://drive.google.com/file/d/1xWGAlGkef_1km3eX-7T1NAHg3Yc5I4IE/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-machined-secondary"
                onClick={() => sound.playClick()}
                strength={0.3}
              >
                Resume PDF
              </MagneticButton>
            </motion.div>

            <motion.div variants={slideUp} className="social-links">
              <motion.a
                href={DATA.personal.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                onClick={() => sound.playClick()}
                whileHover={{ scale: 1.2, color: 'var(--accent)' }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={18} />
              </motion.a>
              <motion.a
                href="#"
                aria-label="GitHub"
                onClick={() => sound.playClick()}
                whileHover={{ scale: 1.2, color: 'var(--accent)' }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={18} />
              </motion.a>
              <motion.a
                href={`mailto:${DATA.personal.email}`}
                aria-label="Email"
                onClick={() => sound.playClick()}
                whileHover={{ scale: 1.2, color: 'var(--accent)' }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail size={18} />
              </motion.a>
              <motion.a
                href={`tel:+91${DATA.personal.phone}`}
                aria-label="Phone"
                onClick={() => sound.playClick()}
                whileHover={{ scale: 1.2, color: 'var(--accent)' }}
                whileTap={{ scale: 0.9 }}
              >
                <Phone size={18} />
              </motion.a>
            </motion.div>

            <motion.div variants={slideUp} className="phone-display">
              <Phone size={13} />
              <a href={`tel:+91${DATA.personal.phone}`}>+91 {DATA.personal.phone}</a>
            </motion.div>

            <motion.div variants={slideUp} className="skills-summary">
              {Object.entries(DATA.skills).map(([category, skillsList], idx) => (
                <motion.div
                  key={category}
                  className="skill-line"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + idx * 0.1, duration: 0.4 }}
                >
                  <b>{category}:</b> {skillsList}
                </motion.div>
              ))}
            </motion.div>

            {/* ── ASME Y14.5 Engineering Drawing Title Block ── */}
            <motion.div variants={slideUp} className="asme-title-block">
              <div className="asme-grid">
                <div className="asme-cell">
                  <span className="asme-lbl">DRAWING NO.</span>
                  <span className="asme-val">HKM-BAJA-2026</span>
                </div>
                <div className="asme-cell">
                  <span className="asme-lbl">PROJECTION</span>
                  <span className="asme-val">THIRD ANGLE ⏚</span>
                </div>
                <div className="asme-cell">
                  <span className="asme-lbl">TOLERANCES</span>
                  <span className="asme-val">ISO 2768-mK</span>
                </div>
                <div className="asme-cell">
                  <span className="asme-lbl">LEAD ENGINEER</span>
                  <span className="asme-val">HARSHIT K. MISHRA</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </aside>

        <main>
          <nav className="sticky-header">
            <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
          </nav>

          <div className="content-wrapper">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab + projectCategory}
                className="project-list"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                exit="hidden"
              >
                {/* ── CAD ASSEMBLY & BOM TAB ── */}
                {activeTab === 'CAD Assembly & BOM' && (
                  <motion.div variants={slideUp} className="cockpit-full-container">
                    <div className="cockpit-full-stage">
                      <HeroScene
                        onSelectProject={handleSelectProjectById}
                        activePart={activePart}
                        setActivePart={setActivePart}
                      />
                    </div>
                    {/* Interactive CAD Bill of Materials Table */}
                    <BomTable
                      activePart={activePart}
                      onSelectPart={(item) => setActivePart(item.symbolKey)}
                    />
                  </motion.div>
                )}

                {/* ── DYNO SIMULATOR TAB ── */}
                {activeTab === 'Dyno Simulator' && (
                  <motion.div variants={slideUp}>
                    <DynoWorkbench />
                  </motion.div>
                )}

                {/* ── EXPERIENCE TAB ── */}
                {activeTab === 'Experience' && DATA.experience.map((exp, idx) => (
                  <motion.div
                    key={exp.id}
                    layout
                    variants={slideUp}
                    custom={idx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  >
                    <TiltCard className="project-card">
                      <div className="card-left">
                        <div className="card-header">
                          <span className="title">{exp.role}</span>
                          <span className="date auto-margin">{exp.date}</span>
                        </div>
                        <span className="role">{exp.company}</span>
                        {exp.location && <span className="location">{exp.location}</span>}
                        <DescriptionWithReadMore description={exp.description} />
                        {exp.tags && (
                          <div className="tags">
                            {exp.tags.map((tag, tIdx) => (
                              <motion.span
                                key={tag}
                                variants={tagVariants}
                                custom={tIdx}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.08, y: -2 }}
                              >
                                {tag}
                              </motion.span>
                            ))}
                          </div>
                        )}
                        {exp.certificateUrl && (
                          <a href={exp.certificateUrl} className="cert-link" target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                            <ExternalLink size={12} /> View Certificate
                          </a>
                        )}
                      </div>
                    </TiltCard>
                  </motion.div>
                ))}

                {/* ── PROJECTS TAB ── */}
                {activeTab === 'Projects' && (
                  <>
                    <motion.div variants={slideUp} className="project-category-filters">
                      {categories.map(cat => (
                        <button
                          key={cat}
                          className={`category-pill ${projectCategory === cat ? 'active' : ''}`}
                          onClick={() => {
                            sound.playClick();
                            setProjectCategory(cat);
                          }}
                        >
                          {cat} {cat === 'All' ? `(${DATA.projects.length})` : `(${DATA.projects.filter(p => p.category === cat).length})`}
                        </button>
                      ))}
                    </motion.div>

                    {filteredProjects.map((project, idx) => (
                      <motion.div
                        key={project.id}
                        layout
                        variants={slideUp}
                        custom={idx}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        whileHover={{ y: -6, transition: { duration: 0.2 } }}
                      >
                        <TiltCard
                          className="project-card clickable-project"
                          onClick={() => {
                            sound.playClick();
                            setSelectedProject(project);
                          }}
                        >
                          <div className="card-left">
                            <div className="card-header">
                              <span className="category-badge">{project.category}</span>
                              <span className="date auto-margin">{project.date}</span>
                            </div>
                            <div className="card-title-row">
                              <span className="title">{project.title}</span>
                            </div>
                            <DescriptionWithReadMore description={project.description} />
                            {project.tags && (
                              <div className="tags">
                                {project.tags.map((tag, tIdx) => (
                                  <motion.span
                                    key={tag}
                                    variants={tagVariants}
                                    custom={tIdx}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.08, y: -2 }}
                                  >
                                    {tag}
                                  </motion.span>
                                ))}
                              </div>
                            )}
                            <div className="card-bottom-row">
                              {((project.sourceFiles && project.sourceFiles.length > 0) || (project.cadFiles && project.cadFiles.length > 0)) && (
                                <span className="cad-count-badge">
                                  <FileText size={12} />
                                  {(project.sourceFiles?.length || project.cadFiles?.length || 0)} Engineering Files ({project.sourceFiles ? project.sourceFiles[0].slice(0, 24) : project.cadFiles[0].name.slice(0, 24)}...)
                                </span>
                              )}
                              <span className="view-modal-hint">
                                View full specs &amp; media <ChevronRight size={13} />
                              </span>
                            </div>
                          </div>
                        </TiltCard>
                      </motion.div>
                    ))}
                  </>
                )}

                {/* ── EDUCATION TAB ── */}
                {activeTab === 'Education' && DATA.education.map((edu, idx) => (
                  <motion.div
                    key={edu.id}
                    layout
                    variants={slideUp}
                    custom={idx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  >
                    <TiltCard className="project-card">
                      <div className="card-left">
                        <div className="card-header">
                          <TextReveal delay={0.05}>
                            <span className="title">{edu.degree}</span>
                          </TextReveal>
                          <span className="date auto-margin">{edu.date}</span>
                        </div>
                        <span className="role">{edu.institution}</span>
                        {edu.location && <span className="location">{edu.location}</span>}
                        {edu.gpa && <div className="gpa">CGPA: {edu.gpa}</div>}
                        <DescriptionWithReadMore description={edu.description} />
                      </div>
                    </TiltCard>
                  </motion.div>
                ))}

                {/* ── LEADERSHIP & CERTS TAB ── */}
                {activeTab === 'Leadership & Certs' && (
                  <>
                    <h3 className="section-title">Leadership &amp; Responsibilities</h3>
                    {DATA.leadership.map((item, idx) => (
                      <motion.div
                        key={item.id}
                        layout
                        variants={slideUp}
                        custom={idx}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        whileHover={{ y: -6, transition: { duration: 0.2 } }}
                      >
                        <TiltCard className="project-card">
                          <div className="card-left">
                            <div className="card-header">
                              <TextReveal delay={0.05}>
                                <span className="title">{item.role}</span>
                              </TextReveal>
                              <span className="date auto-margin">{item.date}</span>
                            </div>
                            <span className="role">{item.organization}</span>
                            <DescriptionWithReadMore description={item.description} />
                          </div>
                        </TiltCard>
                      </motion.div>
                    ))}

                    <h3 className="section-title" style={{ marginTop: '2rem' }}>Certifications</h3>
                    <motion.div
                      layout
                      variants={slideUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <TiltCard className="project-card">
                        <div className="card-left">
                          <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                            {DATA.certifications.map(cert => (
                              <li key={cert.id}>{cert.title}</li>
                            ))}
                          </ul>
                        </div>
                      </TiltCard>
                    </motion.div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* ── Floating Metrology Caliper Tool Trigger ── */}
      <button
        className="floating-tool-btn"
        onClick={() => {
          sound.playClick();
          setCaliperOpen(true);
        }}
        title="Open Precision Digital Vernier Caliper Tool"
      >
        <span>📏 Caliper Tool</span>
      </button>

      {/* ── Interactive Digital Vernier Caliper Modal ── */}
      <DigitalCaliper isOpen={caliperOpen} onClose={() => setCaliperOpen(false)} />

      {/* ── PROJECT DETAIL MODAL ── */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="modal-overlay"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => {
              sound.playClick();
              setSelectedProject(null);
            }}
          >
            <motion.div
              className="modal-content cyber-card"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={e => e.stopPropagation()}
            >
              {/* Tactical Corner Brackets */}
              <span className="cyber-corner tl" />
              <span className="cyber-corner tr" />
              <span className="cyber-corner bl" />
              <span className="cyber-corner br" />

              {/* Mobile Sheet Handle */}
              <div className="mobile-drawer-handle" />

              <button
                className="close-button"
                onClick={() => {
                  sound.playClick();
                  setSelectedProject(null);
                }}
              >
                <X size={20} />
              </button>

              <div className="workstation-badge-bar" style={{ marginBottom: 10 }}>
                <span className="station-led" />
                <span className="station-title">TECHNICAL SPECIFICATION &amp; CAD DOSSIER</span>
                <span className="station-div">&bull;</span>
                <span className="station-loc">ASME Y14.5M</span>
              </div>

              <div className="modal-header">
                <span className="category-badge">{selectedProject.category}</span>
                <span className="modal-date">{selectedProject.date}</span>
              </div>
              <h2 className="modal-title">{selectedProject.title}</h2>

              {selectedProject.tags && (
                <div className="tags modal-tags">
                  {(selectedProject.tags || []).map(tag => <span key={tag}>{tag}</span>)}
                </div>
              )}

              <div className="modal-body">
                <h3>Technical Overview &amp; Engineering Scope</h3>
                {selectedProject.description && (
                  <ul className="modal-bullet-list">
                    {(selectedProject.description || []).map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                )}

                {((selectedProject.sourceFiles && selectedProject.sourceFiles.length > 0) || (selectedProject.cadFiles && selectedProject.cadFiles.length > 0)) && (
                  <div className="modal-cad-section">
                    <h3>CAD &amp; Engineering Deliverables</h3>
                    <div className="cad-file-list">
                      {(selectedProject.sourceFiles || []).map((file, i) => (
                        <div key={i} className="cad-file-item">
                          <div className="cad-file-info">
                            <span className="cad-file-icon"><FileText size={14} /></span>
                            <div className="cad-file-name">{file}</div>
                          </div>
                          <span className="cad-file-badge">Technical Deliverable</span>
                        </div>
                      ))}
                      {(selectedProject.cadFiles || []).map((file, i) => (
                        <div key={i} className="cad-file-item">
                          <div className="cad-file-info">
                            <span className="cad-file-icon"><FileText size={14} /></span>
                            <div>
                              <div className="cad-file-name">{file.name}</div>
                              <div className="cad-file-type">{file.type} &bull; {file.software}</div>
                            </div>
                          </div>
                          {file.source && (
                            <span className="cad-file-badge">{file.source}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProject.images && selectedProject.images.length > 0 && (
                  <div className="modal-images-section">
                    <h3>Simulation &amp; CAD Renders</h3>
                    <div className="modal-images">
                      {(selectedProject.images || []).map((img, i) => (
                        <img key={i} src={img} alt={`${selectedProject.title} view ${i + 1}`} loading="lazy" />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
