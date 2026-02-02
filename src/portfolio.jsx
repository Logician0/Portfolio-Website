import React, { useState, useEffect } from 'react';
import { Camera, Code, Film, Play, Pause, Volume2, Maximize, X, ChevronLeft, ChevronRight, Moon, Sun, Menu, Mail, Instagram, Youtube, Linkedin, Twitter, ArrowRight, ArrowUp, Check, ZoomIn } from 'lucide-react';

// Service Page Component
const ServicePage = ({ isOpen, onClose, service, onCategoryClick }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const serviceCategories = {
    design: [
      { id: 'posts', title: 'Posts', description: 'Engaging social media posts', gradient: 'linear-gradient(135deg, #1a1a1a 0%, #333333 100%)' },
      { id: 'thumbnails', title: 'Thumbnails', description: 'Eye-catching video thumbnails', gradient: 'linear-gradient(135deg, #000000 0%, #2c2c2c 100%)' }
    ],
    video: [
      { id: 'shorts', title: 'Shorts & Reels', description: 'Vertical format videos', gradient: 'linear-gradient(135deg, #111111 0%, #444444 100%)' },
      { id: 'promos', title: 'Promos', description: 'Product & brand videos', gradient: 'linear-gradient(135deg, #1a1a1a 0%, #404040 100%)' },
      { id: 'podcasts', title: 'Podcasts', description: 'Episode editing & production', gradient: 'linear-gradient(135deg, #000000 0%, #333333 100%)' },
      { id: 'ai', title: 'AI Videos', description: 'AI-generated content', gradient: 'linear-gradient(135deg, #1c1c1c 0%, #383838 100%)' },
      { id: 'cinematic', title: 'Cinematic', description: 'High-end cinematic pieces', gradient: 'linear-gradient(135deg, #0a0a0a 0%, #2a2a2a 100%)' },
      { id: 'travel', title: 'Travel Videos', description: 'Destination vlogs', gradient: 'linear-gradient(135deg, #111111 0%, #2d2d2d 100%)' }
    ],
    web: [
      { id: 'ecommerce', title: 'E-commerce', description: 'Online stores & platforms', gradient: 'linear-gradient(135deg, #1a1a1a 0%, #333333 100%)' },
      { id: 'saas', title: 'SaaS', description: 'Web applications & dashboards', gradient: 'linear-gradient(135deg, #000000 0%, #222222 100%)' },
      { id: 'portfolio', title: 'Portfolio Sites', description: 'Personal & creative portfolios', gradient: 'linear-gradient(135deg, #1c1c1c 0%, #4a4a4a 100%)' },
      { id: 'agency', title: 'Agency Websites', description: 'Corporate & business sites', gradient: 'linear-gradient(135deg, #0f0f0f 0%, #3a3a3a 100%)' }
    ]
  };

  const categories = serviceCategories[service] || [];
  const serviceTitles = {
    design: 'Posts & Thumbnails',
    video: 'Video Editing',
    web: 'Website Development'
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="service-page-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X size={24} />
        </button>

        <h2 className="service-page-title">{serviceTitles[service]}</h2>
        <p className="service-page-subtitle">Choose a category to explore</p>

        <div className="category-cards-grid">
          {categories.map((category, idx) => (
            <div 
              key={category.id}
              className="category-card"
              style={{ 
                background: category.gradient,
                animationDelay: `${idx * 0.1}s`
              }}
              onClick={() => onCategoryClick(category.id)}
            >
              <div className="category-card-overlay"></div>
              <div className="category-card-content">
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <div className="category-card-arrow">
                  <ArrowRight size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Gallery Modal Component
const GalleryModal = ({ isOpen, onClose, images, title }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="gallery-modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X size={24} />
        </button>
        <h2 className="modal-title">{title}</h2>
        
        <div className="gallery-grid">
          {images.map((img, idx) => (
            <div 
              key={idx} 
              className="gallery-item"
              onClick={() => setSelectedImage(img)}
            >
              <div className="gallery-image" style={{ background: img.gradient }}>
                <div className="gallery-overlay">
                  <ZoomIn size={32} />
                  <span>{img.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="lightbox-overlay" onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}>
          <button className="modal-close" onClick={() => setSelectedImage(null)} aria-label="Close" style={{zIndex: 3002}}>
            <X size={32} />
          </button>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <div className="lightbox-image" style={{ background: selectedImage.gradient }}>
              <h3>{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Video Modal Component
const VideoModal = ({ isOpen, onClose, videos, category }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsPlaying(false);
  }, [currentIndex, isOpen]);

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight') nextVideo();
      if (e.key === 'ArrowLeft') prevVideo();
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault(); 
        togglePlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  const currentVideo = videos[currentIndex];

  return (
    <div className="modal-overlay video-modal-overlay" onClick={onClose}>
      <div className="video-modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X size={24} />
        </button>
        
        <div className="video-player-section">
          <div className="video-player-container">
            {isPlaying && currentVideo.youtubeId ? (
              <div className="video-iframe-wrapper">
                <iframe 
                  src={`https://www.youtube.com/embed/${currentVideo.youtubeId}?autoplay=1&modestbranding=1&rel=0`} 
                  title={currentVideo.title}
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                  className="youtube-iframe"
                ></iframe>
              </div>
            ) : (
              <div 
                className="video-player" 
                style={{ background: currentVideo.gradient }}
                onClick={togglePlay}
              >
                <div className={`play-button-overlay ${isPlaying ? 'hidden' : ''}`}>
                  <div className="play-circle">
                    <Play size={40} className="play-icon-main" fill="currentColor" />
                  </div>
                </div>
                
                <div className="video-controls" onClick={(e) => e.stopPropagation()}>
                  <button className="control-btn" onClick={togglePlay}>
                    {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                  </button>
                  
                  <div className="progress-bar-container">
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                  
                  <div className="right-controls">
                    <button className="control-btn"><Volume2 size={20} /></button>
                    <button className="control-btn"><Maximize size={20} /></button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="video-details-container">
            <div className="video-info">
              <h3 className="video-title">{currentVideo.title}</h3>
              <p className="video-category">{category}</p>
            </div>

            <div className="video-navigation">
              <button onClick={prevVideo} className="nav-btn" aria-label="Previous">
                <ChevronLeft size={24} />
              </button>
              <span className="video-counter">
                {currentIndex + 1} / {videos.length}
              </span>
              <button onClick={nextVideo} className="nav-btn" aria-label="Next">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>

        <div className="video-thumbnails-container">
          <div className="video-thumbnails">
            {videos.map((video, idx) => (
              <div
                key={idx}
                className={`video-thumb ${idx === currentIndex ? 'active' : ''}`}
                style={{ background: video.gradient }}
                onClick={() => setCurrentIndex(idx)}
              >
                <div className="thumb-overlay">
                   {idx === currentIndex && isPlaying ? <Pause size={12} fill="white"/> : <Play size={12} fill="white"/>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Portfolio Component
export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeServicePage, setActiveServicePage] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [activeVideoCategory, setActiveVideoCategory] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const postsImages = [
    { title: 'Brand Identity', gradient: 'linear-gradient(135deg, #111 0%, #333 100%)' },
    { title: 'Social Campaign', gradient: 'linear-gradient(135deg, #000 0%, #222 100%)' },
    { title: 'Product Launch', gradient: 'linear-gradient(135deg, #1a1a1a 0%, #404040 100%)' },
    { title: 'Event Graphics', gradient: 'linear-gradient(135deg, #050505 0%, #1f1f1f 100%)' },
    { title: 'Digital Marketing', gradient: 'linear-gradient(135deg, #222 0%, #444 100%)' },
    { title: 'UI Design', gradient: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)' }
  ];

  const thumbnailImages = [
    { title: 'YouTube Thumbnail', gradient: 'linear-gradient(135deg, #111 0%, #333 100%)' },
    { title: 'Video Cover', gradient: 'linear-gradient(135deg, #000 0%, #222 100%)' },
    { title: 'Podcast Art', gradient: 'linear-gradient(135deg, #1a1a1a 0%, #444 100%)' },
    { title: 'Stream Graphics', gradient: 'linear-gradient(135deg, #050505 0%, #2a2a2a 100%)' }
  ];

  const videoCategories = {
    shorts: [
      { title: 'Filmmaking Ep1', youtubeId: 'Eh1w-Vv2ShA', gradient: 'linear-gradient(135deg, #111 0%, #333 100%)' },
      { title: 'Filmmaking Ep2', youtubeId: 'B3oxUCV6zPg', gradient: 'linear-gradient(135deg, #000 0%, #222 100%)' },
      { title: 'Filmmaking Ep3', youtubeId: 'lN2rqP5-wuc', gradient: 'linear-gradient(135deg, #1a1a1a 0%, #404040 100%)' },
       { title: 'Filmmaking Ep3', youtubeId: 'lN2rqP5-wuc', gradient: 'linear-gradient(135deg, #1a1a1a 0%, #404040 100%)' }
    ],
    promos: [
      { title: 'Jar App By Sahil Gambhir', youtubeId: 'hFGV4zHmXxY', gradient: 'linear-gradient(135deg, #050505 0%, #1f1f1f 100%)' },
      { title: 'Ghar Soap', youtubeId: 'sojAvbUGQew', gradient: 'linear-gradient(135deg, #222 0%, #444 100%)' },
      { title: 'Plix', youtubeId: '_CFn8GLjyzA', gradient: 'linear-gradient(135deg, #222 0%, #444 100%)' },
      { title: 'Plix', youtubeId: '0Ph6MpGKq8I', gradient: 'linear-gradient(135deg, #222 0%, #444 100%)' },
      { title: 'LightLife', youtubeId: 'wyz9Ok6gDyA', gradient: 'linear-gradient(135deg, #222 0%, #444 100%)' }
    ],
    podcasts: [
      { title: 'Podcast Episode 1', youtubeId: 'dQw4w9WgXcQ', gradient: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)' },
      { title: 'Interview Series', youtubeId: 'dQw4w9WgXcQ', gradient: 'linear-gradient(135deg, #111 0%, #333 100%)' }
    ],
    ai: [
      { title: 'AI Generated #1', youtubeId: 'dQw4w9WgXcQ', gradient: 'linear-gradient(135deg, #000 0%, #222 100%)' },
      { title: 'AI Visualization', youtubeId: 'dQw4w9WgXcQ', gradient: 'linear-gradient(135deg, #1a1a1a 0%, #444 100%)' }
    ],
    cinematic: [
      { title: 'Cinematic Piece', youtubeId: 'dQw4w9WgXcQ', gradient: 'linear-gradient(135deg, #050505 0%, #2a2a2a 100%)' },
      { title: 'Short Film', youtubeId: 'dQw4w9WgXcQ', gradient: 'linear-gradient(135deg, #222 0%, #444 100%)' }
    ],
    travel: [
      { title: 'Travel Vlog', youtubeId: 'dQw4w9WgXcQ', gradient: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)' },
      { title: 'Destination Guide', youtubeId: 'dQw4w9WgXcQ', gradient: 'linear-gradient(135deg, #111 0%, #333 100%)' }
    ]
  };

  const tools = [
    'Photoshop', 'Premiere Pro', 'After Effects', 'Figma', 
    'Webflow', 'React', 'Next.js', 'Node.js'
  ];

  const testimonials = [
    { name: 'Sarah Chen', role: 'CEO, TechStart', text: 'Absolutely transformed our brand. The attention to detail is unmatched.', rating: 5 },
    { name: 'Marcus Williams', role: 'Creative Director', text: 'A true creative visionary. Exceeded every expectation.', rating: 5 },
    { name: 'Emily Rodriguez', role: 'Founder, GrowthCo', text: 'The best investment we made. Results speak for themselves.', rating: 5 }
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`portfolio ${darkMode ? 'dark' : ''}`}>
      
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-logo" onClick={scrollToTop} style={{cursor: 'pointer'}}>
            {/* REPLACE THIS URL WITH YOUR PNG PATH */}
            <img src="/logo.png" alt="Logo" className="logo-img" />
            <span className="logo-main">Logician Creatives</span>
          </div>
          
          <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#testimonials" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
            <a href="#work" onClick={() => setMobileMenuOpen(false)}>Work</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          </div>

          <div className="nav-actions">
            <button 
              className="theme-toggle" 
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button 
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title animate-on-scroll">
            Turn Views Into <span className="growth-text">Growth</span>, <br/>Not Just Content.
          </h1>
          
          <p className="hero-subtitle animate-on-scroll">
            Helping creators and businesses turn attention into clicks, conversions and loyal audiance.
          </p>

          <div className="hero-cta animate-on-scroll">
            <a href="#services" className="btn btn-primary">
              View Work
              <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn btn-secondary">
              Hire Me
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section services-section">
        <div className="container">
          <h2 className="section-title animate-on-scroll">Services</h2>

          <div className="services-grid">
            <div 
              className="service-card animate-on-scroll" 
              onClick={() => setActiveServicePage('design')}
            >
              <div className="service-icon">
                <Camera size={28} />
              </div>
              <h3>Posts & Thumbnails</h3>
              <p>Eye-catching visuals that stop the scroll and demand attention</p>
              <div className="service-card-cta">
                <span>Explore Gallery</span>
                <ArrowRight size={16} />
              </div>
            </div>

            <div 
              className="service-card animate-on-scroll" 
              onClick={() => setActiveServicePage('video')}
            >
              <div className="service-icon">
                <Film size={28} />
              </div>
              <h3>Video Editing</h3>
              <p>Cinematic storytelling that captivates and converts audiences</p>
              <div className="service-card-cta">
                <span>Watch Showreels</span>
                <ArrowRight size={16} />
              </div>
            </div>

            <div 
              className="service-card animate-on-scroll" 
              onClick={() => setActiveServicePage('web')}
            >
              <div className="service-icon">
                <Code size={28} />
              </div>
              <h3>Website Development</h3>
              <p>Lightning-fast, conversion-optimized websites that scale</p>
              <div className="service-card-cta">
                <span>View Projects</span>
                <ArrowRight size={16} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-image animate-on-scroll">
              <div className="profile-photo"></div>
            </div>

            <div className="about-content animate-on-scroll">
              <h2 className="section-title">About</h2>
              <p className="about-text">
                I'm a multi-disciplinary creative director with 8+ years of experience 
                transforming bold visions into award-winning digital experiences.
              </p>
              <p className="about-text">
                My work has been featured on Awwwards, recognized by industry leaders, 
                and trusted by brands that demand excellence.
              </p>

              <div className="skills-highlight">
                <div className="skill-item">
                  <span className="skill-number">150+</span>
                  <span className="skill-label">Projects</span>
                </div>
                <div className="skill-item">
                  <span className="skill-number">50+</span>
                  <span className="skill-label">Clients</span>
                </div>
                <div className="skill-item">
                  <span className="skill-number">12</span>
                  <span className="skill-label">Awards</span>
                </div>
              </div>

              <a href="#contact" className="btn btn-primary">
                Let's Build Something
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="work" className="section workflow-section">
        <div className="container">
          <h2 className="section-title animate-on-scroll">Process</h2>
          
          <div className="workflow-timeline">
            {['Discovery', 'Strategy', 'Design', 'Production', 'Delivery'].map((step, idx) => (
              <div 
                key={idx} 
                className="workflow-step animate-on-scroll"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="step-number">{idx + 1}</div>
                <h3>{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="section testimonials-section">
        <div className="container">
          <h2 className="section-title animate-on-scroll">Testimonials</h2>
          
          <div className="testimonials-carousel">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={idx} 
                className="testimonial-card animate-on-scroll"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="stars">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="author-name">{testimonial.name}</div>
                    <div className="author-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="section tools-section">
        <div className="container">
          <h2 className="section-title animate-on-scroll">Tools</h2>
          
          <div className="tools-grid">
            {tools.map((tool, idx) => (
              <div 
                key={idx} 
                className="tool-item animate-on-scroll"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <span>{tool}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="container">
          <h2 className="section-title animate-on-scroll">Get In Touch</h2>
          
          <div className="contact-grid">
            <form className="contact-form animate-on-scroll" onSubmit={handleFormSubmit}>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Email Address" required />
              <select required>
                <option value="">Select Service</option>
                <option value="design">Design</option>
                <option value="video">Video Editing</option>
                <option value="web">Website Development</option>
                <option value="all">All Services</option>
              </select>
              <textarea placeholder="Tell me about your project..." rows="4" required></textarea>
              
              <button type="submit" className="btn btn-primary">
                {formSubmitted ? (
                  <>
                    <Check size={18} />
                    Sent!
                  </>
                ) : (
                  <>
                    Send Message
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="contact-info animate-on-scroll">
              <div className="contact-item">
                <Mail size={20} />
                <div>
                  <h4>Email</h4>
                  <a href="mailto:hello@creative.studio">hello@creative.studio</a>
                </div>
              </div>

              <div className="social-links">
                <a href="#" className="social-link" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
                <a href="#" className="social-link" aria-label="YouTube">
                  <Youtube size={20} />
                </a>
                <a href="#" className="social-link" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="social-link" aria-label="Twitter">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© 2026 Logician Creatives. All rights reserved.</p>
        </div>
      </footer>

      {/* Scroll to Top */}
      <button 
        className="scroll-to-top" 
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>

      {/* Modals */}
      <ServicePage 
        isOpen={!!activeServicePage}
        onClose={() => setActiveServicePage(null)}
        service={activeServicePage}
        onCategoryClick={(categoryId) => {
          // MODIFIED: Do NOT set service page to null here.
          // setActiveServicePage(null); 
          if (categoryId === 'posts' || categoryId === 'thumbnails') {
            setActiveModal(categoryId);
          } else if (['ecommerce', 'saas', 'portfolio', 'agency'].includes(categoryId)) {
            setActiveModal('websites');
          } else {
            setActiveVideoCategory(categoryId);
          }
        }}
      />

      <GalleryModal 
        isOpen={activeModal === 'posts'}
        onClose={() => setActiveModal(null)}
        images={postsImages}
        title="Posts Gallery"
      />

      <GalleryModal 
        isOpen={activeModal === 'thumbnails'}
        onClose={() => setActiveModal(null)}
        images={thumbnailImages}
        title="Thumbnails Gallery"
      />

      {activeVideoCategory && (
        <VideoModal 
          isOpen={!!activeVideoCategory}
          onClose={() => setActiveVideoCategory(null)}
          videos={videoCategories[activeVideoCategory]}
          category={activeVideoCategory.charAt(0).toUpperCase() + activeVideoCategory.slice(1)}
        />
      )}

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;700&display=swap');

        :global(html), :global(body), :global(#root) {
          width: 100% !important;
          max-width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow-x: hidden !important;
          display: block !important;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        .portfolio {
          --bg-primary: #f8fafc;
          --bg-secondary: #ffffff;
          --text-primary: #0f172a;
          --text-secondary: #475569;
          --border-color: rgba(15, 23, 42, 0.08);
          --primary-accent: #0f172a;
          
          background: var(--bg-primary);
          color: var(--text-primary);
          font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          line-height: 1.6;
          width: 100vw;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .portfolio.dark {
          --bg-primary: #000000;
          --bg-secondary: #121212;
          --text-primary: #ffffff;
          --text-secondary: #a0a0a0;
          --border-color: rgba(255, 255, 255, 0.1);
          --primary-accent: #ffffff;
        }

        .nav {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          padding: 1.25rem 2rem;
          background: rgba(248, 250, 252, 0.85);
          backdrop-filter: blur(12px);
          z-index: 1000;
          border-bottom: 1px solid var(--border-color);
          transition: background 0.3s ease;
        }

        .dark .nav {
          background: rgba(0, 0, 0, 0.85);
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .logo-img {
          height: 40px; /* Bigger logo size */
          width: auto;
          object-fit: contain;
        }

        .logo-main {
          font-size: 1.25rem;
          font-weight: 700;
          font-family: 'Playfair Display', serif;
          letter-spacing: -0.02em;
        }

        .nav-links {
          display: flex;
          gap: 2.5rem;
        }

        .nav-links a {
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: color 0.3s ease;
        }

        .nav-links a:hover {
          color: var(--text-primary);
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .theme-toggle {
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          padding: 0.6rem;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .theme-toggle:hover {
          background: var(--bg-secondary);
          transform: rotate(15deg);
        }

        .mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
        }

        .hero {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 8rem 2rem 4rem;
          background: var(--bg-primary);
        }

        .hero-content {
          max-width: 900px;
        }

        .hero-title {
          font-size: clamp(3rem, 7vw, 5.5rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 2rem;
          font-family: 'Playfair Display', serif;
          letter-spacing: -0.03em;
        }

        .growth-text {
          background: linear-gradient(to right, #3B82F6, #06B6D4);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          display: inline-block;
          cursor: default;
          transition: all 0.3s ease;
          background-size: 200% auto;
        }

        .growth-text:hover {
          background: linear-gradient(to right, #F97316, #EF4444);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          transform: scale(1.05) translateY(-2px);
        }

        .hero-subtitle {
          font-size: clamp(1.125rem, 2vw, 1.35rem);
          color: var(--text-secondary);
          margin-bottom: 3rem;
          max-width: 650px;
          margin-left: auto;
          margin-right: auto;
          font-weight: 400;
          line-height: 1.6;
        }

        .hero-cta {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          padding: 1rem 2rem;
          border-radius: 100px;
          text-decoration: none;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
          cursor: pointer;
          font-size: 1rem;
        }

        .btn-primary {
          background: var(--text-primary);
          color: var(--bg-primary);
        }

        .btn-primary:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .btn-secondary {
          background: transparent;
          color: var(--text-primary);
          border: 1px solid var(--border-color);
        }

        .btn-secondary:hover {
          background: var(--bg-secondary);
          border-color: var(--text-primary);
        }

        .section {
          width: 100%;
          padding: 6rem 2rem;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-title {
          font-size: clamp(2.5rem, 5vw, 3rem);
          font-weight: 700;
          margin-bottom: 4rem;
          font-family: 'Playfair Display', serif;
          text-align: center;
          letter-spacing: -0.02em;
        }

        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-on-scroll.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          max-width: 1100px;
          margin: 0 auto;
        }

        .service-card {
          background: var(--bg-secondary);
          padding: 3rem 2rem;
          border: 1px solid var(--border-color);
          border-radius: 24px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
          border-color: var(--text-primary);
        }

        .service-icon {
          width: 64px;
          height: 64px;
          background: var(--bg-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          color: var(--text-primary);
          transition: all 0.3s ease;
        }

        .service-card:hover .service-icon {
          background: var(--text-primary);
          color: var(--bg-primary);
          transform: scale(1.1);
        }

        .service-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        .service-card p {
          color: var(--text-secondary);
          margin-bottom: 2rem;
          font-size: 1rem;
          line-height: 1.6;
        }

        .service-card-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-primary);
          font-weight: 600;
          font-size: 0.9rem;
          opacity: 0.8;
          transition: opacity 0.3s;
        }
        
        .service-card:hover .service-card-cta {
          opacity: 1;
        }

        .about-section {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 5rem;
          align-items: center;
        }

        .profile-photo {
          width: 100%;
          padding-top: 110%;
          background-image: url('/my-photo.jpg'); 
          background-size: cover;
          background-position: center;
          position: relative;
          border-radius: 24px;
        }

        .about-text {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          line-height: 1.8;
          font-size: 1.125rem;
        }

        .skills-highlight {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin: 3rem 0;
          padding: 2rem 0;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }

        .skill-item {
          text-align: center;
        }

        .skill-number {
          display: block;
          font-size: 3rem;
          font-weight: 700;
          font-family: 'Playfair Display', serif;
          margin-bottom: 0.5rem;
          line-height: 1;
        }

        .skill-label {
          display: block;
          color: var(--text-secondary);
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 600;
        }

        .workflow-timeline {
          display: grid;
          grid-template-columns: repeat(5, 1fr); /* Forced to 5 columns */
          gap: 2.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }

        .workflow-step {
          text-align: center;
        }

        .step-number {
          width: 60px;
          height: 60px;
          background: var(--bg-secondary);
          color: var(--text-primary);
          border: 1px solid var(--border-color);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 auto 1.5rem;
          font-family: 'Playfair Display', serif;
          transition: all 0.3s ease;
        }
        
        .workflow-step:hover .step-number {
            background: var(--text-primary);
            color: var(--bg-primary);
            transform: scale(1.1);
        }

        .workflow-step h3 {
          font-size: 1.125rem;
          font-weight: 600;
        }

        .testimonials-carousel {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .testimonial-card {
          background: var(--bg-secondary);
          padding: 2.5rem;
          border: 1px solid var(--border-color);
          border-radius: 24px;
        }

        .stars {
          color: #F59E0B;
          font-size: 1.125rem;
          margin-bottom: 1.5rem;
          letter-spacing: 2px;
        }

        .testimonial-text {
          font-size: 1.125rem;
          margin-bottom: 2rem;
          line-height: 1.7;
          font-style: italic;
          font-family: 'Playfair Display', serif;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .author-avatar {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #111 0%, #333 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: white;
          font-size: 1rem;
        }

        .author-name {
          font-weight: 700;
          font-size: 1rem;
        }

        .author-role {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .tools-section {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }

        .tools-grid {
          display: flex; /* Centered layout */
          flex-wrap: wrap;
          justify-content: center;
          gap: 1.5rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .tool-item {
          padding: 1.5rem 1rem;
          text-align: center;
          font-weight: 600;
          font-size: 0.95rem;
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
          border-radius: 12px;
          background: var(--bg-primary);
          min-width: 140px;
        }

        .tool-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
          border-color: var(--text-primary);
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 4rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .contact-form input,
        .contact-form select,
        .contact-form textarea {
          padding: 1rem 1.25rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          font-size: 1rem;
          font-family: inherit;
          border-radius: 12px;
          transition: border-color 0.3s;
        }

        .contact-form input:focus,
        .contact-form select:focus,
        .contact-form textarea:focus {
          outline: none;
          border-color: var(--text-primary);
        }

        .contact-form textarea {
          resize: vertical;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          padding: 2rem;
          background: var(--bg-secondary);
          border-radius: 24px;
          border: 1px solid var(--border-color);
          height: fit-content;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
        }

        .contact-item h4 {
          margin-bottom: 0.25rem;
          font-size: 1rem;
          font-weight: 700;
        }

        .contact-item a {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 1rem;
        }

        .contact-item a:hover {
          color: var(--text-primary);
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-link {
          width: 48px;
          height: 48px;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          background: var(--text-primary);
          color: var(--bg-primary);
          transform: translateY(-4px) rotate(8deg);
        }

        .footer {
          padding: 3rem 2rem;
          text-align: center;
          border-top: 1px solid var(--border-color);
          width: 100%;
        }

        .footer p {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        .scroll-to-top {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 56px;
          height: 56px;
          background: var(--text-primary);
          border: none;
          border-radius: 50%;
          color: var(--bg-primary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 999;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }

        .scroll-to-top:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.2);
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 2rem;
          overflow-y: auto;
        }

        .modal-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .modal-close:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: rotate(90deg);
        }

        .service-page-content {
          background: var(--bg-primary);
          max-width: 1100px;
          width: 100%;
          max-height: 85vh;
          overflow-y: auto;
          position: relative;
          padding: 5rem 4rem;
          border-radius: 32px;
          box-shadow: 0 40px 80px rgba(0,0,0,0.2);
        }

        .service-page-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
          font-family: 'Playfair Display', serif;
          text-align: center;
        }

        .service-page-subtitle {
          text-align: center;
          color: var(--text-secondary);
          font-size: 1.125rem;
          margin-bottom: 4rem;
        }

        .category-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
        }

        .category-card {
          position: relative;
          padding: 2.5rem 2rem;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          min-height: 220px;
          display: flex;
          align-items: flex-end;
          border-radius: 24px;
        }

        .category-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .category-card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, transparent 20%, rgba(0, 0, 0, 0.7) 100%);
          z-index: 0;
        }

        .category-card-content {
          position: relative;
          z-index: 1;
          color: white;
          width: 100%;
        }

        .category-card h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .category-card p {
          font-size: 0.95rem;
          opacity: 0.9;
          margin-bottom: 1.5rem;
        }

        .category-card-arrow {
          width: 40px;
          height: 40px;
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(4px);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.4s ease;
        }

        .category-card:hover .category-card-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* Gallery Modal Polish */
        .gallery-modal-content {
          background: var(--bg-primary);
          max-width: 1200px;
          width: 100%;
          max-height: 85vh;
          overflow-y: auto;
          position: relative;
          padding: 4rem 3rem;
          border-radius: 32px;
        }

        .modal-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 2.5rem;
          font-family: 'Playfair Display', serif;
          text-align: center;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .gallery-item {
          position: relative;
          padding-top: 100%;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s ease;
          border-radius: 16px;
        }

        .gallery-item:hover {
          transform: scale(1.02);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .gallery-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transition: transform 0.6s ease;
        }
        
        .gallery-item:hover .gallery-image {
            transform: scale(1.1);
        }

        .gallery-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          opacity: 0;
          transition: opacity 0.3s ease;
          color: white;
          font-weight: 600;
        }

        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }

        .lightbox-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0, 0, 0, 0.98);
          backdrop-filter: blur(20px);
          z-index: 3001;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .lightbox-content {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
        }

        .lightbox-image {
          max-width: 90vw;
          max-height: 90vh;
          width: 100%;
          aspect-ratio: 16/9;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
        }

        .lightbox-image h3 {
          color: white;
          font-size: 2rem;
          font-weight: 600;
        }

        /* Video Modal Fix & Polish */
        .video-modal-overlay {
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(10px);
          padding: 1rem;
          z-index: 2010; /* FIX: Added higher z-index to overlay */
        }

        .video-modal-content {
          max-width: 1000px;
          width: 95vw; /* FIX: Responsive width */
          max-height: 90vh; /* FIX: Prevent vertical overflow */
          position: relative;
          background: var(--bg-secondary);
          border-radius: 24px;
          overflow: hidden; /* Contains children */
          display: flex;
          flex-direction: column;
          box-shadow: 0 50px 100px -20px rgba(0,0,0,0.5);
        }
        
        /* Inner scroll container for landscape mobile */
        .video-player-section {
            overflow-y: auto;
            flex: 1;
        }

        .video-player-container {
          background: black;
          width: 100%;
        }

        /* YouTube Iframe Wrapper */
        .video-iframe-wrapper {
          width: 100%;
          aspect-ratio: 16/9;
          position: relative;
        }

        .youtube-iframe {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }

        .video-player {
          width: 100%;
          aspect-ratio: 16/9;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative; 
          cursor: pointer;
        }

        .play-button-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.2);
          transition: opacity 0.3s ease;
          z-index: 10;
        }
        
        .play-button-overlay.hidden {
          opacity: 0;
          pointer-events: none;
        }

        .play-circle {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255,255,255,0.3);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        .video-player:hover .play-circle {
          transform: scale(1.1);
          background: rgba(255,255,255,0.2);
        }

        .play-icon-main {
          color: white;
          margin-left: 6px; 
        }
        
        /* Video Controls Bar */
        .video-controls {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 1.5rem;
          background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
          display: flex;
          align-items: center;
          gap: 1.5rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .video-player:hover .video-controls,
        .play-button-overlay.hidden + .video-controls { 
          opacity: 1;
        }

        .control-btn {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;
          opacity: 0.9;
        }
        
        .control-btn:hover {
          transform: scale(1.1);
          opacity: 1;
        }

        .progress-bar-container {
          flex: 1;
          height: 20px;
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .progress-bar-bg {
          width: 100%;
          height: 4px;
          background: rgba(255,255,255,0.2);
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: white;
          border-radius: 2px;
          box-shadow: 0 0 10px rgba(255,255,255,0.5);
        }

        .right-controls {
          display: flex;
          gap: 1rem;
        }
        
        .video-details-container {
            padding: 1.5rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid var(--border-color);
        }

        .video-info {
          text-align: left;
        }

        .video-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .video-category {
          color: var(--text-secondary);
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
        }

        .video-navigation {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 0;
        }

        .nav-btn {
          width: 48px;
          height: 48px;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 50%;
          color: var(--text-primary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .nav-btn:hover {
          background: var(--text-primary);
          color: var(--bg-primary);
        }

        .video-counter {
          color: var(--text-secondary);
          font-weight: 600;
          font-variant-numeric: tabular-nums;
        }
        
        .video-thumbnails-container {
            background: var(--bg-secondary);
            padding: 1.5rem;
            border-top: 1px solid var(--border-color);
        }

        .video-thumbnails {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
        }

        .video-thumb {
          min-width: 160px;
          aspect-ratio: 16/9;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0.6;
          transition: all 0.3s ease;
          position: relative;
          border-radius: 8px;
          overflow: hidden;
        }

        .video-thumb:hover {
            opacity: 1;
            transform: translateY(-2px);
        }

        .video-thumb.active {
          opacity: 1;
          box-shadow: 0 0 0 2px var(--text-primary);
        }

        .thumb-overlay {
          background: rgba(0,0,0,0.5);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(4px);
        }

        @media (max-width: 968px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          
          .hero-title {
             font-size: 4rem;
          }

          .contact-grid {
            grid-template-columns: 1fr;
          }

          .skills-highlight {
            grid-template-columns: repeat(3, 1fr);
          }

          .category-cards-grid {
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          }
          
          .video-details-container {
              flex-direction: column;
              text-align: center;
              gap: 1.5rem;
          }
          
          .video-info {
              text-align: center;
          }
          
          /* Medium screen adjustment for process */
          .workflow-timeline {
             grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
          
          .hero-title {
             font-size: 3rem;
          }

          .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: var(--bg-primary);
            padding: 2rem;
            border-bottom: 1px solid var(--border-color);
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          }

          .mobile-menu-toggle {
            display: block;
          }

          .services-grid {
            grid-template-columns: 1fr;
          }

          /* Stack process steps on mobile */
          .workflow-timeline {
            grid-template-columns: 1fr;
          }

          .skills-highlight {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .gallery-grid {
            grid-template-columns: 1fr;
          }

          .category-cards-grid {
            grid-template-columns: 1fr;
          }

          .service-page-content,
          .gallery-modal-content {
            padding: 3rem 1.5rem;
            border-radius: 20px;
          }

          .modal-title,
          .service-page-title {
            font-size: 2rem;
          }
          
          .video-modal-content {
              width: 100vw;
              height: 100vh;
              max-height: 100vh;
              border-radius: 0;
          }
          
          .logo-img {
            height: 50px;
          }
        }
      `}</style>
    </div>
  );
}