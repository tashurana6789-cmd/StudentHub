import React from 'react';
import { Link } from 'react-router-dom';

/**
 * StudentCard Component
 * 
 * Displays an individual student's summary in a card (Grid View).
 * 
 * Props:
 * - student (object): The student record containing id, name, email, phone, course, city, status, etc.
 * - onDelete (function): Callback function called when the user clicks the Delete button
 */
function StudentCard({ student, onDelete }) {
  // Extract initials for the avatar badge (e.g. "Aarav Sharma" -> "AS")
  const getInitials = (name) => {
    if (!name) return 'ST';
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Helper to format status CSS class
  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'badge-active';
      case 'graduated':
        return 'badge-graduated';
      case 'inactive':
        return 'badge-inactive';
      case 'suspended':
        return 'badge-suspended';
      default:
        return 'badge-default';
    }
  };

  return (
    <div className="student-card">
      <div className="card-top-bar">
        <div className="avatar-circle">
          {getInitials(student.name)}
        </div>
        <span className={`status-badge ${getStatusClass(student.status)}`}>
          {student.status || 'Active'}
        </span>
      </div>

      <div className="card-details">
        <h3 className="student-name">{student.name}</h3>
        <p className="student-course">📚 {student.course}</p>
        
        <div className="student-meta-list">
          <div className="meta-item">
            <span className="meta-icon">✉️</span>
            <span className="meta-text">{student.email}</span>
          </div>
          {student.phone && (
            <div className="meta-item">
              <span className="meta-icon">📞</span>
              <span className="meta-text">{student.phone}</span>
            </div>
          )}
          {student.city && (
            <div className="meta-item">
              <span className="meta-icon">📍</span>
              <span className="meta-text">{student.city}</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="card-actions">
        <Link
          to={`/students/${student.id}`}
          className="btn btn-outline btn-sm"
          title="View Student Details"
        >
          👁️ View
        </Link>
        <Link
          to={`/students/edit/${student.id}`}
          className="btn btn-primary btn-sm"
          title="Edit Student Information"
        >
          ✏️ Edit
        </Link>
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(student.id, student.name)}
          title="Delete Student Record"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default StudentCard;
