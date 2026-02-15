import React, { useState, useEffect } from 'react';
import { Linkedin, Github, ScrollText} from 'lucide-react';
import emailjs from '@emailjs/browser';

import './App.css';

import backgroundImage from './components/images/USC-Village.jpeg';
import publicn from './components/images/publications.png';

import githubLogo from './components/images/github-logo.png';
import linkedinLogo from './components/images/linkedin-logo.png';
import locPin from './components/images/location-pin.png';

import profileImage from './components/images/rhea-profile - Copy.jpeg';
/*import awsLogo from './components/images/aws-logo.png';
import cLogo from './components/images/c-logo.png';*/
import cenecLogo from './components/images/cenec-logo.png';
import cssLogo from './components/images/css-logo.png';
import flaskLogo from './components/images/flask-logo.png';
/*import gitLogo from './components/images/git-logo.png';*/
import hadoopLogo from './components/images/hadoop-logo.png';
import htmlLogo from './components/images/html-5.png';
/*import javaLogo from './components/images/java-logo.png';*/
import javascriptLogo from './components/images/javascript-logo.png';
import kerasLogo from './components/images/keras-logo.png';
import kpitLogo from './components/images/kpit-logo.png';
import jupyterLogo from './components/images/logos-jupyter.png';
import matplotlibLogo from './components/images/matplotlib-logo.png';
import mysqlLogo from './components/images/mysql-logo.png';
/*import nodejsLogo from './components/images/nodejs-logo.png';*/
import numpyLogo from './components/images/numpy-logo.png';
import pandasLogo from './components/images/pandas-logo.png';
import pysparkLogo from './components/images/pyspark-logo.png';
import pythonLogo from './components/images/python-logo.png';
import pytorchLogo from './components/images/pytorch-logo.png';

import rheaAbout from './components/images/Linkedin-Profile-Picture - Copy.png';
import reactLogo from './components/images/react-logo.png';
import scikitLogo from './components/images/scikitlearn-logo.png';
import streamlitLogo from './components/images/streamlit-logo.png';
import tableauLogo from './components/images/tableau-logo.png';
import tensorflowLogo from './components/images/tensorflow-logo.png';
import vscodeLogo from './components/images/vscode.png';

import WavingHandGif from './components/gifs/waving.gif';
import capstone from './components/images/capstone.png';
import wordle from './components/images/wordle.png';

/*const resumePDF = '/resume/Rhea_Pandita_Resume.pdf'*/

const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({
    from_name: '',
    reply_to: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    // Initialize EmailJS with your public key from environment variable
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'publication', 'resume','contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume/Rhea_Pandita_Resume.pdf';
    link.download = 'Rhea_Pandita_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS configuration is missing');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.from_name,
          email: formData.reply_to,
          message: formData.message,
          to_name: 'Rhea Pandita'
        },
        publicKey
      );
      
      console.log('SUCCESS!', result.text);
      setSubmitStatus('success');
      // Reset form
      setFormData({
        from_name: '',
        reply_to: '',
        message: ''
      });
    } catch (error) {
      console.log('FAILED...', error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const skills = [
    { name: 'Python', url: 'https://www.python.org', icon: pythonLogo},
    /*{ name: 'C', url: 'https://en.wikipedia.org/wiki/C_(programming_language)', icon: cLogo },
    { name: 'Java', url: 'https://www.java.com', icon: javaLogo },*/
    { name: 'HTML', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML', icon: htmlLogo },
    { name: 'CSS', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS', icon: cssLogo },
    { name: 'JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', icon: javascriptLogo },
    { name: 'MySQL', url: 'https://www.mysql.com', icon: mysqlLogo },
    { name: 'React', url: 'https://react.dev', icon: reactLogo },
    /*{ name: 'Node.js', url: 'https://nodejs.org', icon: nodejsLogo },*/
    { name: 'Numpy', url: 'https://numpy.org', icon: numpyLogo },
    { name: 'Pandas', url: 'https://pandas.pydata.org', icon: pandasLogo },
    { name: 'Matplotlib', url: 'https://matplotlib.org', icon: matplotlibLogo },
    { name: 'Keras', url: 'https://keras.io', icon: kerasLogo },
    { name: 'Pytorch', url: 'https://pytorch.org', icon: pytorchLogo },
    { name: 'Scikit-learn', url: 'https://scikit-learn.org', icon: scikitLogo },
    { name: 'Tensorflow', url: 'https://www.tensorflow.org', icon: tensorflowLogo },
    { name: 'Flask', url: 'https://flask.palletsprojects.com', icon: flaskLogo },
    { name: 'Streamlit', url: 'https://streamlit.io', icon: streamlitLogo },
    { name: 'PySpark', url: 'https://spark.apache.org/docs/latest/api/python/', icon: pysparkLogo },
    { name: 'Hadoop', url: 'https://hadoop.apache.org', icon: hadoopLogo },
    { name: 'Tableau', url: 'https://www.tableau.com', icon: tableauLogo },
    /*{ name: 'Git', url: 'https://git-scm.com', icon: gitLogo },*/
    /*{ name: 'AWS', url: 'https://aws.amazon.com', icon: awsLogo },*/
    { name: 'VSCode', url: 'https://code.visualstudio.com', icon: vscodeLogo },
    { name: 'Jupyter Notebook', url: 'https://jupyter.org', icon: jupyterLogo },
  ];

  const projects = [
    {
      title: 'AI-Assisted Personal Finance Management System',
      description: 'A lightweight, 𝗽𝗿𝗶𝘃𝗮𝗰𝘆-𝗳𝗼𝗰𝘂𝘀𝗲𝗱 financial management tool with intelligent features to help you make better financial decisions without requiring external account integration. ',
      image: capstone,
      github: 'https://github.com/shrutishrinivasan/capstone-project',
      techStack: [
        { name: 'Python', logo: pythonLogo },
        { name: 'Streamlit', logo: streamlitLogo },
        { name: 'HTML', logo: htmlLogo },
        { name: 'CSS', logo: cssLogo },
        { name: 'MySQL', logo: mysqlLogo },
        { name: 'Tensorflow', logo: tensorflowLogo },
        { name: 'Numpy', logo: numpyLogo },
        { name: 'Keras', logo: kerasLogo },
        { name: 'Pandas', logo: pandasLogo },
        { name: 'PyTorch', logo: pytorchLogo },
        { name: 'scikit-learn', logo: scikitLogo },
        { name: 'Matplotlib', logo: matplotlibLogo }
      ]
    },
    {
      title: 'Wordle with Hints',
      description: 'This project is inspired by two games - Wordle and Pimantle. The user must guess the word within 7 tries with 3 hints. We used word and sentence embeddings to create associations between words, their meanings and other words for the hints. NOTE: I am working on updating this codebase.' ,
      image: wordle,
      github: 'https://github.com/RP-1106/NLP-Wordle-Code',
      techStack: [
        { name: 'Python', logo: pythonLogo },
        { name: 'Streamlit', logo: streamlitLogo },
        { name: 'Numpy', logo: numpyLogo },
        { name: 'Pandas', logo: pandasLogo },
        { name: 'scikit-learn', logo: scikitLogo }
      ]
    }
  ];

  const heroStyle = {
    backgroundImage: `url(${backgroundImage})`
  };

  const experiences = [
    {
      role: 'Graduate Research Assistant',
      company: 'USC Center for the Neuroscience of Embodied Cognition (CeNEC, A-Z Lab)',
      logo: cenecLogo,
      startDate: 'Aug 2025',
      endDate: 'Present',
      bullets: [
        'Addressing the challenge of evaluating LLMs on causal and predictive reasoning over human-action videos.',
        'Planning a pipeline to benchmark LLMs on these causal and predictive reasoning tasks',
      ],
      link: 'https://dornsife.usc.edu/cenec/content/'
    },
    {
      role: 'Trainee',
      company: 'KPIT Technologies',
      logo: kpitLogo,
      startDate: 'June 2024',
      endDate: 'Aug 2024',
      bullets: [
        'Parsed IGES and STEP CAD files using Python, extracting structured geometric parameters for downstream analysis',
        'Developed Python algorithms to classify & map 2D shapes to 3D counterparts',
      ]
    },
    {
      role: 'Trainee',
      company: 'KPIT Technologies',
      logo: kpitLogo,
      startDate: 'May 2023',
      endDate: 'Aug 2023',
      bullets: [
        'Co-authored and presented a paper titled "Accelerating Automotive Design".',
        'Delivered a proof-of-concept generative AI workflow demonstrating potential to accelerate automotive design cycles from months to weeks.',
        'Implemented Stable Diffusion text-to-image pipeline for car design, cutting sketch-to-3D from months to weeks.',
        'Built image-to-3D mesh reconstruction workflow, outputting .obj models for automotive prototyping.'
      ]
    }
  ];

  const publication = [
    {
      image: publicn,
      Paper: 'Accelerating Automotive Design: Harnessing AI Models for Efficient 3D Design and Development of Automobile Systems and Subsystems',
      Authors: 'Tirupathi Rao Althi, Vikram Kothamachu, Rhea Pandita',
      Conference: '2023 IEEE International Transportation Electrification Conference (ITEC-India), Chennai, India, 2023',
      Link: 'https://ieeexplore.ieee.org/document/10471378',
    }
  ];

  return (
    <div className="portfolio">
      <nav className="navbar">
        <div className="nav-container">
          <div className="social-links">
            <a href="https://www.linkedin.com/in/rhea-pandita/" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Linkedin size={24} />
            </a>
            <a href="https://github.com/RP-1106/" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Github size={24} />
            </a>
          </div>
          
          <div className="nav-links">
            {['home', 'about', 'skills', 'projects', 'experience', 'publication','contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`nav-link ${activeSection === section ? 'active' : ''}`}
              >
                {section}
              </button>
            ))}
            <button
              onClick={handleResumeDownload}
              className="nav-link"
            >
              resume
            </button>
          </div>
        </div>
      </nav>

      <section id="home" className="section hero-section hero-with-background" style={heroStyle}>
        <div className="hero-content">
          <div className="profile-image-container">
            <img
              src={profileImage}
              alt="Profile"
              className="profile-image"
            />
          </div>
          <h1 className="hero-name">Rhea Pandita</h1>
          <h3>MSCS@University of Southern California|Graduate Research Assistant working on MLLMs | research-oriented ML/AI</h3>
          <div className="hero-quote">
            "Turning data into decisions"
          </div>
        </div>
      </section>

      <section id="about" className="section about-section">
        <div className="about-container">
          <div className="about-image-container">
            <img
              src={rheaAbout}
              alt="About"
              className="about-image"
            />
          </div>
          <div className="about-content">
            <h2 className="section-title">Hey There!<img src={WavingHandGif} alt="waving hand" className="wave-emoji" /> </h2>
            <p className="about-text">
              I’m a Master’s student in Computer Science who wants to build reliable and interpretable AI systems.
              I'm interested in research opportunities where I learn more about and focus on understanding and  <u>improving the reasoning behaviour of LLMs</u> through
              empirical evaluation, robustness testing, and scalable benchmarking.
            </p>
            <br />
            <p className="about-text">
              As a Graduate Research Assistant at the USC CeNEC Lab, I benchmark LLMs on causal and predictive reasoning tasks over human-action videos to study their current limitations.
            </p>
            <br />
            <p className="about-text">
              <b>Interests:</b> <u>Machine Learning, NLP, LLM evaluation, and data-driven AI systems.</u>
            </p>
            <br />
            <p className="about-text">
              Outside of academics, I enjoy painting and traveling.
            </p>
            <br />
            <div className="education">
              <p className="about-text"><b>Education : </b></p>
              <p className="about-text"><b>MS Computer Science : University of Southern California (2025–Present)</b></p>
              <p className="about-text">B.Tech AI & Data Science : Shiv Nadar University Chennai (2021–2025)</p>
            </div >
          </div>
        </div>
      </section>

      <section id="skills" className="section skills-section">
        <div className="container">
          <h2 className="section-title center">Tech Stack</h2>
          <div className="skills-grid">
            {skills.map((skill, idx) => (
              <a
                key={idx}
                href={skill.url}
                target="_blank"
                rel="noopener noreferrer"
                className="skill-card"
              >
                <div className="skill-icon"><img src={skill.icon} alt={skill.name} className="skill-logo" /></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="section projects-section">
        <div className="container">
          <h2 className="section-title center">Highlighted Projects</h2>
          <div className="projects-grid">
            {projects.map((project, idx) => (
              <div key={idx} className="project-card">
                <img src={project.image} alt={project.title} className="project-image" />
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  
                  {project.techStack && (
                    <div className="tech-stack">
                      {project.techStack.map((tech, techIdx) => (
                        <img
                          key={techIdx}
                          src={tech.logo}
                          alt={tech.name}
                          title={tech.name}
                          className="tech-icon"
                        />
                      ))}
                    </div>
                  )}
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link"><Github size={24} />View on Github</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="section experience-section">
        <div className="container">
          <h2 className="section-title center">Experience</h2>
          <div className="experience-grid">
            {experiences.map((exp, idx) => (
              <div key={idx} className="experience-card">
                <h3 className="experience-role">{exp.role}</h3>
                <div className="experience-company">
                  <img src={exp.logo} alt={exp.company} className="company-logo" />
                  <span className="company-name">{exp.company}</span>
                </div>
                <div className="experience-dates">
                  {exp.startDate} - {exp.endDate}
                </div>
                <ul className="experience-bullets">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="publication" className="section publications-section">
        <div className="container">
          <h2 className="section-title center">Publication</h2>
          <div className="publications-grid">
            {publication.map((pub, idx) => (
              <div key={idx} className="publication-card">
                <img src={pub.image} alt={pub.Paper} className="publication-image" />
                <div className="publication-content">
                  <h3 className="publication-title">{pub.Paper}</h3>
                  <p className="publication-description">{pub.Authors}</p>
                  <a href={pub.Link} target="_blank" rel="noopener noreferrer" className="publication-link"><ScrollText size={24} /><span>View Publication</span></a>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*<section id="resume" className="section resume-section">
        <div className="container">
          <h2 className="section-title center">Resume</h2>
          <div className="resume-container">
            <div className="resume-viewer">
              <iframe
                src={resumePDF}
                title="Resume PDF"
                className="resume-pdf"
              />
            </div>
            <div className="resume-download">
              <a 
                href={resumePDF} 
                download="Rhea_Pandita_Resume.pdf"
                className="download-btn"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>*/}

      <section id="contact" className="section contact-section">
        <div className="container">
          <h2 className="section-title center">Contact</h2>
          <div className="contact-layout">
            <div className="contact-boxes-left">
              <div className="contact-box">
                <div className="contact-box-icon">
                  <img 
                    src={linkedinLogo} 
                    alt="LinkedIn" 
                    style={{ width: '100%', height: 'auto', maxWidth: '120px' }} 
                  />
                </div>
                <div className="contact-box-content">
                  <h3 className="contact-box-title">LinkedIn</h3>
                  <a href="https://linkedin.com/in/rhea-pandita" target="_blank" rel="noopener noreferrer" className="contact-box-link">
                    linkedin.com/in/rhea-pandita
                  </a>
                </div>
              </div>

              <div className="contact-box">
                <div className="contact-box-icon">
                  <img 
                    src={githubLogo}  
                    alt="GitHub" 
                    style={{ width: '100%', height: 'auto', maxWidth: '120px' }} 
                  />
                </div>
                <div className="contact-box-content">
                  <h3 className="contact-box-title">GitHub</h3>
                  <a href="https://github.com/RP-1106" target="_blank" rel="noopener noreferrer" className="contact-box-link">
                    github.com/RP-1106
                  </a>
                </div>
              </div>

              <div className="contact-box">
                <div className="contact-box-icon">
                  <img 
                    src={locPin} 
                    alt="Location" 
                    style={{ width: '100%', height: 'auto', maxWidth: '120px' }} 
                  />
                </div>
                <div className="contact-box-content">
                  <h3 className="contact-box-title">Location</h3>
                  <span className="contact-box-text">Los Angeles, CA</span>
                </div>
              </div>
            </div>

            <div className="contact-form-container">
              <div className="contact-form">
                <input 
                  type="text" 
                  name="from_name"
                  className="contact-input" 
                  placeholder="Your Name" 
                  value={formData.from_name}
                  onChange={handleChange}
                  required 
                />
                <input 
                  type="email" 
                  name="reply_to"
                  className="contact-input" 
                  placeholder="Your Email" 
                  value={formData.reply_to}
                  onChange={handleChange}
                  required 
                />
                <textarea 
                  name="message"
                  className="contact-textarea" 
                  placeholder="Your Message" 
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                
                {submitStatus === 'success' && (
                  <div style={{ 
                    color: '#10b981', 
                    marginBottom: '1rem', 
                    padding: '0.75rem',
                    backgroundColor: '#d1fae5',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    textAlign: 'center'
                  }}>
                    ✓ Message sent successfully!
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div style={{ 
                    color: '#ef4444', 
                    marginBottom: '1rem',
                    padding: '0.75rem',
                    backgroundColor: '#fee2e2',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    textAlign: 'center'
                  }}>
                    ✗ Failed to send message. Please try again.
                  </div>
                )}
                
                <button 
                  onClick={handleSubmit}
                  className="contact-submit-btn"
                  disabled={isSubmitting || !formData.from_name || !formData.reply_to || !formData.message}
                  style={{
                    opacity: (isSubmitting || !formData.from_name || !formData.reply_to || !formData.message) ? 0.6 : 1,
                    cursor: (isSubmitting || !formData.from_name || !formData.reply_to || !formData.message) ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio; 
