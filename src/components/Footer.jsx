import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer Component
 * 
 * Displayed at the bottom of all pages with quick links and project info.
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-icon">🎓</span>
            <span className="logo-text">Student<strong>Hub</strong></span>
          </div>
          <p className="footer-desc">
            A clean, beginner-friendly Student Management System built with React, React Router, Axios, and JSON Server.
          </p>
        </div>

        <div className="footer-links-group">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home Dashboard</Link></li>
            <li><Link to="/students">All Students</Link></li>
            <li><Link to="/students/add">Register Student</Link></li>
          </ul>
        </div>

        <div className="footer-info">
          <h4>System Status</h4>
          <p className="status-badge-inline">
            <span className="status-dot-active"></span> JSON Server Active (Port 3000)
          </p>
          <p className="footer-note">Single Page Application • React 19</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {currentYear} StudentHub. Designed for React Practice & Learning.</p>
      </div>
    </footer>
  );
}

export default Footer;
