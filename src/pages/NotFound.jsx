import React from 'react';
import { Link } from 'react-router-dom';

/**
 * NotFound Page (404)
 * 
 * Route: * (Catches any unmatched URL routes)
 */
function NotFound() {
  return (
    <div className="page-container">
      <div className="notfound-card">
        <div className="notfound-code">404</div>
        <h1 className="notfound-title">Page Not Found</h1>
        <p className="notfound-text">
          The page or student resource you are looking for might have been removed, renamed, or is temporarily unavailable.
        </p>
        <div className="notfound-actions">
          <Link to="/" className="btn btn-primary btn-lg">
            🏠 Return to Dashboard
          </Link>
          <Link to="/students" className="btn btn-outline btn-lg">
            👥 Browse Students Directory
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
