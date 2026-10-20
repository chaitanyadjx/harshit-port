import React, { useState, useEffect } from 'react';
import { DATA } from './data';
import { Sun, Moon, Linkedin, Github, Mail, X, Phone, ExternalLink, FileText } from 'lucide-react';

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
        <button className="read-more-toggle" onClick={e => { e.stopPropagation(); setExpanded(!expanded); }}>
          {expanded ? 'Show less ▴' : `Read more (${description.length - maxItems} more) ▾`}
        </button>
      )}
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState('dark');
  const [activeTab, setActiveTab] = useState('Experience');
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectCategory, setProjectCategory] = useState('All');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    } else {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    const newTheme = isDark ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const renderBio = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <span key={i}>{part.slice(2, -2)}</span>;
      }
      return part;
    });
  };

  const categories = ['All', 'Automotive & Powertrain', 'CAE & Simulation', 'Aerospace & UAV', 'Robotics & Mechatronics'];

  const filteredProjects = projectCategory === 'All'
    ? DATA.projects
    : DATA.projects.filter(p => p.category === projectCategory);

  return (
    <div className="portfolio-card animate">
      <aside>
        <div className="animate delay-1">
          <div className="sidebar-header">
            <div>
              <h1>{DATA.personal.name}</h1>
              <p className="tagline">{DATA.personal.tagline}</p>
            </div>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <p className="intro-text">
            {renderBio(DATA.personal.bio)}
          </p>

          <div className="action-btns">
            <a href={`mailto:${DATA.personal.email}`} className="btn btn-filled">Get in touch</a>
            <a href="https://drive.google.com/file/d/1xWGAlGkef_1km3eX-7T1NAHg3Yc5I4IE/view?usp=sharing" className="btn btn-outline" target="_blank" rel="noopener noreferrer">Resume PDF</a>
          </div>

          <div className="social-icons">
            <a href={DATA.personal.linkedinUrl} target="_blank" rel="noopener noreferrer" title="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="#" title="GitHub">
              <Github size={18} />
            </a>
            <a href={`mailto:${DATA.personal.email}`} title="Email">
              <Mail size={18} />
            </a>
            <a href={`tel:+91${DATA.personal.phone}`} title="Phone">
              <Phone size={18} />
            </a>
          </div>

          <div className="phone-display">
            <Phone size={13} />
            <a href={`tel:+91${DATA.personal.phone}`}>+91 {DATA.personal.phone}</a>
          </div>

          <div className="skills-summary">
            {Object.entries(DATA.skills).map(([category, skillsList]) => (
              <div key={category} className="skill-line">
                <b>{category}:</b> {skillsList}
              </div>
            ))}
          </div>
        </div>
      </aside>

      <main>
        <nav className="sticky-header">
          <div className="tabs">
            {['Experience', 'Projects', 'Education', 'Leadership & Certs'].map(tab => (
              <button 
                key={tab} 
                className={activeTab === tab ? 'active' : ''} 
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'Projects' ? `Projects (${DATA.projects.length})` : tab}
              </button>
            ))}
          </div>
        </nav>

        <div className="content-wrapper">
          <div className="project-list animate delay-3">
            {activeTab === 'Experience' && DATA.experience.map(exp => (
              <div key={exp.id} className="project-card">
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
                      {exp.tags.map(tag => <span key={tag}>{tag}</span>)}
                    </div>
                  )}
                  {exp.certificateUrl && (
                    <a href={exp.certificateUrl} className="cert-link" target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                      <ExternalLink size={12} /> View Certificate
                    </a>
                  )}
                </div>
              </div>
            ))}

            {activeTab === 'Projects' && (
              <>
                <div className="project-category-filters">
                  {categories.map(cat => {
                    const count = cat === 'All' 
                      ? DATA.projects.length 
                      : DATA.projects.filter(p => p.category === cat).length;
                    return (
                      <button
                        key={cat}
                        className={`category-pill ${projectCategory === cat ? 'active' : ''}`}
                        onClick={() => setProjectCategory(cat)}
                      >
                        {cat} <span className="category-pill-count">({count})</span>
                      </button>
                    );
                  })}
                </div>

                {filteredProjects.map(proj => (
                  <div 
                    key={proj.id} 
                    className="project-card clickable-card"
                    onClick={() => setSelectedProject(proj)}
                  >
                    <div className="card-left">
                      <div className="card-header">
                        <div className="title-row">
                          {proj.category && <span className="category-badge">{proj.category}</span>}
                          <span className="title">{proj.title}</span>
                        </div>
                        <span className="date auto-margin">{proj.date}</span>
                      </div>
                      <DescriptionWithReadMore description={proj.description} maxItems={2} />
                      {proj.tags && (
                        <div className="tags">
                          {proj.tags.map(tag => <span key={tag}>{tag}</span>)}
                        </div>
                      )}
                      {proj.sourceFiles && proj.sourceFiles.length > 0 && (
                        <div className="card-source-hint">
                          <FileText size={12} />
                          <span>{proj.sourceFiles.length} CAD / CAE Verification Files ({proj.sourceFiles[0]}{proj.sourceFiles.length > 1 ? `, +${proj.sourceFiles.length - 1} more` : ''})</span>
                        </div>
                      )}
                      <div className="card-footer-action">
                        <span className="view-details-prompt">Click card for CAD specs & media →</span>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}

            {activeTab === 'Education' && DATA.education.map(edu => (
              <div key={edu.id} className="project-card">
                <div className="card-left">
                  <div className="card-header">
                    <span className="title">{edu.degree}</span>
                    <span className="date auto-margin">{edu.date}</span>
                  </div>
                  <span className="role">{edu.institution}</span>
                  {edu.location && <span className="location">{edu.location}</span>}
                  {edu.description && <DescriptionWithReadMore description={edu.description} maxItems={3} />}
                </div>
              </div>
            ))}

            {activeTab === 'Leadership & Certs' && (
              <>
                <h3 style={{marginBottom: "1rem", marginTop: "0.5rem"}}>Leadership & Responsibilities</h3>
                {DATA.leadership.map(item => (
                  <div key={item.id} className="project-card" style={{marginBottom: "1rem"}}>
                    <div className="card-left">
                      <div className="card-header">
                        <span className="title" style={{fontSize: "1.1rem"}}>{item.role}</span>
                        <span className="date auto-margin">{item.date}</span>
                      </div>
                      <span className="location" style={{marginBottom: item.description?.length ? "8px" : 0}}>{item.organization}</span>
                      {item.description && <DescriptionWithReadMore description={item.description} maxItems={2} />}
                    </div>
                  </div>
                ))}
                
                <h3 style={{marginBottom: "1rem", marginTop: "2rem"}}>Certifications</h3>
                <div className="project-card">
                  <div className="card-left">
                    <ul style={{paddingLeft: "20px", color: "var(--text-muted)", lineHeight: 1.8}}>
                      {DATA.certifications.map(cert => (
                        <li key={cert.id}>{cert.title}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Project Modal Overlay */}
      {selectedProject && (
        <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close Modal">
              <X size={18} />
            </button>
            <div className="card-header">
              <div>
                {selectedProject.category && <span className="category-badge" style={{marginBottom: '6px'}}>{selectedProject.category}</span>}
                <h2 className="title" style={{fontSize: "1.45rem", lineHeight: 1.3}}>{selectedProject.title}</h2>
              </div>
              <span className="date auto-margin">{selectedProject.date}</span>
            </div>
            
            <div className="description" style={{marginTop: "1.2rem"}}>
              <span className="modal-section-title">Technical Project Highlights & Engineering Metrics</span>
              <ul>
                {selectedProject.description.map((desc, i) => <li key={i}>{desc}</li>)}
              </ul>
            </div>
            
            {selectedProject.tags && (
              <div className="tags" style={{marginBottom: "1.2rem"}}>
                {selectedProject.tags.map(tag => <span key={tag}>{tag}</span>)}
              </div>
            )}

            {selectedProject.sourceFiles && selectedProject.sourceFiles.length > 0 && (
              <div className="modal-sources">
                <span className="modal-section-title">Verified CAD / CAE Source Files & Deliverables</span>
                <div className="source-tag-list">
                  {selectedProject.sourceFiles.map((sf, idx) => (
                    <span key={idx} className="source-tag">
                      <FileText size={12} /> {sf}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {selectedProject.images && selectedProject.images.length > 0 && (
              <div className="modal-images">
                {selectedProject.images.map((img, index) => (
                  <img key={index} src={img} alt={`${selectedProject.title} preview ${index + 1}`} loading="lazy" />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
