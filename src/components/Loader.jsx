import React from 'react';

/**
 * Loader Component
 * Displays a clean animated spinner and a helpful loading message.
 */
function Loader({ message = 'Loading students...' }) {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p className="loader-text">{message}</p>
    </div>
  );
}

export default Loader;
