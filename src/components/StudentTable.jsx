import React from 'react';
import { Link } from 'react-router-dom';

/**
 * StudentTable Component
 * 
 * Displays student records in a structured tabular view.
 * 
 * Props:
 * - students (array): Array of student objects
 * - onDelete (function): Callback invoked when the Delete button is clicked
 */
function StudentTable({ students, onDelete }) {
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
    <div className="table-responsive">
      <table className="student-table">
        <thead>
          <tr>
            <th>#ID</th>
            <th>Student Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>City</th>
            <th>Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="cell-id">#{student.id}</td>
              <td className="cell-name">
                <strong>{student.name}</strong>
              </td>
              <td className="cell-email">{student.email}</td>
              <td className="cell-course">
                <span className="course-tag">{student.course}</span>
              </td>
              <td className="cell-city">{student.city || '—'}</td>
              <td>
                <span className={`status-badge ${getStatusClass(student.status)}`}>
                  {student.status || 'Active'}
                </span>
              </td>
              <td className="cell-actions text-center">
                <div className="table-action-btns">
                  <Link
                    to={`/students/${student.id}`}
                    className="btn btn-outline btn-xs"
                    title="View Details"
                  >
                    👁️ View
                  </Link>
                  <Link
                    to={`/students/edit/${student.id}`}
                    className="btn btn-primary btn-xs"
                    title="Edit Record"
                  >
                    ✏️ Edit
                  </Link>
                  <button
                    type="button"
                    className="btn btn-danger btn-xs"
                    onClick={() => onDelete(student.id, student.name)}
                    title="Delete Record"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
