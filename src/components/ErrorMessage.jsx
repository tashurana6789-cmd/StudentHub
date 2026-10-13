import React from 'react';

/**
 * ErrorMessage Component
 * 
 * Displays an error banner with a friendly message and an optional "Try Again" retry button.
 * 
 * Props:
 * - message (string): The error text to display
 * - onRetry (function): Optional callback function to re-attempt the failed operation
 */
function ErrorMessage({ message = 'An unexpected error occurred.', onRetry }) {
  return (
    <div className="error-card">
      <div className="error-icon">⚠️</div>
      <div className="error-body">
        <h4 className="error-title">Oops! Something went wrong</h4>
        <p className="error-text">{message}</p>
      </div>
      {onRetry && (
        <button className="btn btn-secondary btn-sm error-retry-btn" onClick={onRetry}>
          🔄 Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
