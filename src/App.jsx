import React, { useState, useEffect } from 'react';
import { DATA } from './data';
import { Sun, Moon, Linkedin, Github, Mail, Download } from 'lucide-react';

function App() {
  const [theme, setTheme] = useState('dark');
  const [activeTab, setActiveTab] = useState('Experience');

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
            <a href="#" className="btn btn-outline" download>Resume PDF</a>
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
                {tab}
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
                  <div className="description">
                    <ul>
                      {exp.description.map((desc, i) => <li key={i}>{desc}</li>)}
                    </ul>
                  </div>
                  {exp.tags && (
                    <div className="tags">
                      {exp.tags.map(tag => <span key={tag}>{tag}</span>)}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {activeTab === 'Projects' && DATA.projects.map(proj => (
              <div key={proj.id} className="project-card">
                <div className="card-left">
                  <div className="card-header">
                    <span className="title">{proj.title}</span>
                    <span className="date auto-margin">{proj.date}</span>
                  </div>
                  <div className="description">
                    <ul>
                      {proj.description.map((desc, i) => <li key={i}>{desc}</li>)}
                    </ul>
                  </div>
                  {proj.tags && (
                    <div className="tags">
                      {proj.tags.map(tag => <span key={tag}>{tag}</span>)}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {activeTab === 'Education' && DATA.education.map(edu => (
              <div key={edu.id} className="project-card">
                <div className="card-left">
                  <div className="card-header">
                    <span className="title">{edu.degree}</span>
                    <span className="date auto-margin">{edu.date}</span>
                  </div>
                  <span className="role">{edu.institution}</span>
                  {edu.location && <span className="location">{edu.location}</span>}
                </div>
              </div>
            ))}

            {activeTab === 'Leadership & Certs' && (
              <>
                <h3 style={{marginBottom: "1rem", marginTop: "0.5rem"}}>Leadership</h3>
                {DATA.leadership.map(item => (
                  <div key={item.id} className="project-card" style={{marginBottom: "1rem"}}>
                    <div className="card-left">
                      <div className="card-header">
                        <span className="title" style={{fontSize: "1.1rem"}}>{item.role}</span>
                        <span className="date auto-margin">{item.date}</span>
                      </div>
                      <span className="location" style={{marginBottom: 0}}>{item.organization}</span>
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
    </div>
  );
}

export default App;
