import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

/**
 * Navbar Component
 * 
 * Provides navigation links across the entire application.
 * Uses NavLink from react-router-dom so active links receive the 'active' class automatically.
 */
function Navbar() {
  // State to manage mobile navigation menu open/closed state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper to toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  // Helper to close mobile menu when a navigation link is clicked
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="navbar-header">
      <nav className="navbar-container">
        {/* Brand / Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <span className="logo-icon">🎓</span>
          <span className="logo-text">Student<strong>Hub</strong></span>
        </Link>

        {/* Mobile Hamburger Toggle Button */}
        <button
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Navigation Links */}
        <div className={`navbar-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={closeMobileMenu}
          >
            🏠 Home
          </NavLink>

          <NavLink
            to="/students"
            end
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={closeMobileMenu}
          >
            👥 Students
          </NavLink>

          <NavLink
            to="/students/add"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={closeMobileMenu}
          >
            ➕ Add Student
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
